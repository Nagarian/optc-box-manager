/// <reference lib="webworker" />

import { ExtendedUnit } from 'models/units'

// eslint-disable-next-line no-undef
declare const self: DedicatedWorkerGlobalScope
declare const cv: any

export type SquareSize = {
  id: string
  analysisId: string
  height: number
  width: number
  x: number
  y: number
}

export type CharacterFound = {
  squareId: string
  id: number
  analysisId: string
  score: number
  unit?: ExtendedUnit
}

export type AnalysisType = 'tavern' | 'fpp' | 'box' | 'generic'

export type Analysis = {
  id: string
  type: AnalysisType
  image: ImageData
  squares: SquareSize[]
  founds: CharacterFound[]
  done: boolean
  error?: string
}

export type InitialSizeMatrix = {
  gameWidth: number
  gameHeight: number
  rows: number[]
  cols: number[]
  matrix?: number[][]
  characterSize: number
}

const extractionSize = {
  top: 28,
  left: 28,
  width: 62,
  height: 56,
  originalSize: 112,
  croppedWidth: 10,
  croppedHeight: 0,
}
extractionSize.croppedHeight = Math.floor(
  (extractionSize.croppedWidth * extractionSize.height) / extractionSize.width,
)

const size = {
  maxId: 5068,

  gridHorizontal: 100,
  gridVertical: 0,
  width: extractionSize.croppedWidth,
  height: extractionSize.croppedHeight,
  maxWidth: 0,
  maxHeight: 0,

  tavernRatio: 0.158,
  boxRatio: 0.175,
}
size.gridVertical = Math.ceil(size.maxId / size.gridHorizontal)
size.maxWidth = size.gridHorizontal * size.width
size.maxHeight = size.gridVertical * size.height

const tavernSizeMatrix: InitialSizeMatrix = {
  gameWidth: 1080,
  gameHeight: 1620,
  rows: [372, 606, 887],
  cols: [76, 265, 454, 643, 832],
  matrix: [
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
  ],
  characterSize: 172,
}

const fppSizeMatrix: InitialSizeMatrix = {
  gameWidth: 1080,
  gameHeight: 1620,
  rows: [583, 776],
  cols: [74, 263, 452, 641, 830],
  characterSize: 172,
}

function loadOpenCv (waitTimeMs = 30000, stepTimeMs = 100): Promise<void> {
  self.importScripts(`${process.env.PUBLIC_URL}/opencv-4.6.0.js`)
  return new Promise((resolve, reject) => {
    if (cv.Mat) {
      resolve()
      return
    }

    let timeSpentMs = 0
    const interval = setInterval(() => {
      const limitReached = timeSpentMs > waitTimeMs
      if (cv.Mat || limitReached) {
        clearInterval(interval)
        limitReached ? reject(new Error('Loading OpenCV timeout')) : resolve()
      } else {
        timeSpentMs += stepTimeMs
      }
    }, stepTimeMs)
  })
}

onmessage = ({ data }) => {
  // console.log('worker received message', data)
  switch (data.type) {
    case 'INIT':
      loadOpenCv().then(
        () => self.postMessage({ type: 'READY' }),
        error => {
          throw error
        },
      )
      break
    case 'PROCESS_IMAGE': {
      const { image, type, id } = data.analysis as Analysis
      const charactersMat = cv.matFromImageData(data.characters)
      const src = cv.matFromImageData(image)
      let squares = []
      switch (type) {
        case 'tavern':
          squares = detectMatrixSquare(src, id, tavernSizeMatrix)
          break
        case 'fpp':
          squares = detectMatrixSquare(src, id, fppSizeMatrix)
          break
        case 'box':
          squares = detectBoxSquare(src, id)
          break
        case 'generic':
          squares = detectGenericSquare(src, id)
          break
      }

      findCharacterIds(charactersMat, src, squares, 0.8)
      src.delete()
      charactersMat.delete()
      self.postMessage({
        type: 'PROCESS_IMAGE_END',
        analysisId: data.analysis?.id,
      })
      break
    }

    default:
      break
  }
}

function detectGenericSquare (src: any, analysisId: string): SquareSize[] {
  const copy = src.clone()

  // we filter image to keep only yellow one
  const colorMask = src.clone()
  const low = new cv.Mat(src.rows, src.cols, src.type(), [150, 150, 0, 255])
  const high = new cv.Mat(src.rows, src.cols, src.type(), [255, 255, 255, 255])
  const minimalSize = src.cols * 0.15
  cv.inRange(src, low, high, colorMask)
  cv.filter2D(
    colorMask,
    copy,
    cv.CV_8U,
    cv.Mat.eye(3, 3, cv.CV_32FC1),
    new cv.Point(-1, -1),
    0,
    cv.BORDER_DEFAULT,
  )
  colorMask.delete()
  low.delete()
  high.delete()

  // cv.cvtColor(copy, copy, cv.COLOR_RGBA2GRAY, 0);
  cv.Canny(copy, copy, 50, 200, 3)

  const contours = new cv.MatVector()
  const hierarchy = new cv.Mat()

  cv.findContours(
    copy,
    contours,
    hierarchy,
    cv.RETR_LIST,
    cv.CHAIN_APPROX_SIMPLE,
  )
  hierarchy.delete()

  const squaresToExtract: SquareSize[] = []
  for (let i = 0; i < contours.size(); ++i) {
    const cnt = contours.get(i)
    const rect = cv.boundingRect(cnt)
    const aspectRatio = rect.width / rect.height

    // we keep only square
    if (aspectRatio < 0.95 || aspectRatio > 1.05) continue
    if (rect.width < minimalSize - 5 || rect.height < minimalSize - 5) {
      continue
    }

    // if (rect.width > minimalSize + 5 || rect.height > minimalSize + 5) {
    //   continue
    // }

    const squareDetected = resizeSquare({
      id: squaresToExtract.length.toString(),
      analysisId,
      x: rect.x,
      width: rect.width,
      y: rect.y,
      height: rect.width,
    })

    // we skipped doublons
    if (
      squaresToExtract.find(
        ({ height, width, x, y }) =>
          height === squareDetected.height &&
          width === squareDetected.width &&
          x === squareDetected.x &&
          y === squareDetected.y,
      )
    ) {
      continue
    }

    squaresToExtract.push(squareDetected)

    self.postMessage({
      type: 'SQUARE_DETECTED',
      square: { ...squareDetected, ...rect },
    })
  }

  copy.delete()
  return squaresToExtract.reverse()
}

function detectMatrixSquare (
  src: any,
  analysisId: string,
  initialSize: InitialSizeMatrix,
): SquareSize[] {
  const oldGray = new cv.Mat()
  cv.cvtColor(src, oldGray, cv.COLOR_RGBA2GRAY)

  const not = new cv.Mat()
  cv.bitwise_not(oldGray, not)
  cv.Canny(not, not, 80, 120)

  // const not = oldGray.clone()
  // cv.threshold(oldGray, not, 100, 200, cv.THRESH_BINARY)
  // cv.Canny(not, not, 90, 120)

  const lines = new cv.Mat()
  cv.HoughLinesP(not, lines, 1, Math.PI / 2, 2, 30, 1)
  let topBound = src.rows
  for (let i = 0; i < lines.rows; ++i) {
    const [x1, y1, x2, y2] = [
      lines.data32S[i * 4],
      lines.data32S[i * 4 + 1],
      lines.data32S[i * 4 + 2],
      lines.data32S[i * 4 + 3],
    ]

    if (x2 - x1 < src.cols * 0.95) continue
    if (y1 !== y2) continue
    if (y1 > topBound) continue

    topBound = y1
  }

  oldGray.delete()
  not.delete()
  lines.delete()

  const ratio = src.cols / initialSize.gameWidth
  const characterWith = initialSize.characterSize * ratio
  const squares: SquareSize[] = []
  for (const [ri, row] of initialSize.rows.entries()) {
    for (const [ci, col] of initialSize.cols.entries()) {
      if (initialSize.matrix && !initialSize.matrix[ri][ci]) continue

      const square: SquareSize = {
        id: squares.length.toString(),
        analysisId,
        y: topBound + row * ratio,
        x: col * ratio,
        height: characterWith,
        width: characterWith,
      }

      const resized = resizeSquare(square)
      square.id = resized.id
      squares.push(resized)

      self.postMessage({
        type: 'SQUARE_DETECTED',
        square,
      })
    }
  }

  return squares
}

function detectBoxSquare (src: any, analysisId: string): SquareSize[] {
  const whiteMask = src.clone()
  let low = new cv.Mat(src.rows, src.cols, src.type(), [240, 240, 240, 255])
  let high = new cv.Mat(src.rows, src.cols, src.type(), [255, 255, 255, 255])
  cv.inRange(src, low, high, whiteMask)
  low.delete()
  high.delete()

  const yellowMask = src.clone()
  low = new cv.Mat(src.rows, src.cols, src.type(), [150, 150, 0, 255])
  high = new cv.Mat(src.rows, src.cols, src.type(), [255, 255, 255, 255])
  cv.inRange(src, low, high, yellowMask)
  low.delete()
  high.delete()

  const bitOr = new cv.Mat()
  cv.bitwise_or(whiteMask, yellowMask, bitOr)
  whiteMask.delete()
  yellowMask.delete()

  const bitwised = new cv.Mat()
  cv.bitwise_and(src, src, bitwised, bitOr)
  bitOr.delete()

  const lines = new cv.Mat()
  cv.cvtColor(bitwised, bitwised, cv.COLOR_RGBA2GRAY)
  cv.Canny(bitwised, bitwised, 50, 255)
  cv.HoughLinesP(bitwised, lines, 0.1, Math.PI / 10.0, 150, 5, 4)
  bitwised.delete()

  const horizontals: number[] = []
  const verticals: number[] = []

  for (let i = 0; i < lines.rows; ++i) {
    const [x1, y1, x2, y2] = [
      lines.data32S[i * 4],
      lines.data32S[i * 4 + 1],
      lines.data32S[i * 4 + 2],
      lines.data32S[i * 4 + 3],
    ]

    const horizontal = Math.abs(x2 - x1)
    const vertical = Math.abs(y2 - y1)
    const minimalLength = src.cols * 0.05

    if (horizontal === 0 && vertical > minimalLength) {
      verticals.push(x1)
    }

    if (vertical === 0 && horizontal > minimalLength) {
      horizontals.push(y1)
    }
  }

  lines.delete()

  const characterWidth = src.cols * size.boxRatio
  horizontals.sort((h1, h2) => (h1 > h2 ? 1 : h1 === h2 ? 0 : -1))
  verticals.sort((h1, h2) => (h1 > h2 ? 1 : h1 === h2 ? 0 : -1))

  const minH = horizontals.find(h1 =>
    horizontals.find(h2 => characterWidth === h2 - h1),
  )
  const minV = verticals.find(v1 =>
    verticals.find(v2 => characterWidth === v2 - v1),
  )

  if (!minH || !minV) return []

  const squaresToExtract: SquareSize[] = []
  for (let yI = 0; yI < 5; yI++) {
    const y = minH + characterWidth * yI

    for (let xI = 0; xI < 5; xI++) {
      const x = minV + characterWidth * xI

      const extractionSquare = resizeSquare({
        id: squaresToExtract.length.toString(),
        analysisId,
        x,
        width: characterWidth,
        y,
        height: characterWidth,
      })

      self.postMessage({
        type: 'SQUARE_DETECTED',
        square: {
          id: extractionSquare.id,
          analysisId,
          x,
          y,
          width: characterWidth - 8,
          height: characterWidth - 8,
        },
      })

      squaresToExtract.push(extractionSquare)
    }
  }

  return squaresToExtract
}

function resizeSquare ({ analysisId, id, x, y, width }: SquareSize): SquareSize {
  const extractionSquare: SquareSize = {
    id: `${new Date().getTime()}-${id}`,
    analysisId,
    x:
      x +
      Math.floor((extractionSize.left * width) / extractionSize.originalSize),
    width: Math.floor(
      (extractionSize.width * width) / extractionSize.originalSize,
    ),
    y:
      y +
      Math.floor((extractionSize.top * width) / extractionSize.originalSize),
    height: Math.floor(
      (extractionSize.height * width) / extractionSize.originalSize,
    ),
  }

  return extractionSquare
}

function findCharacterIds (
  charactersMat: any,
  src: any,
  squares: SquareSize[],
  minConfidence: number,
) {
  try {
    console.time('Finding all matching')

    for (const squareToSearch of squares) {
      const found = findMatching(charactersMat, src, squareToSearch)

      // we add constant to be sure to being into right image
      const id =
        (Math.ceil((found.loc.y + 5) / size.height) - 1) * size.gridHorizontal +
        Math.ceil((found.loc.x + 5) / size.width)

      if (found.val < minConfidence) {
        continue
      }

      const characterFound: CharacterFound = {
        id,
        squareId: squareToSearch.id,
        analysisId: squareToSearch.analysisId,
        score: found.val,
      }

      self.postMessage({ type: 'CHARACTER_FOUND', found: characterFound })
    }
  } finally {
    console.timeEnd('Finding all matching')
  }
}

function findMatching (
  charactersMat: any,
  src: any,
  squareToSearch: SquareSize,
) {
  try {
    console.time('Finding matching')
    const mask = new cv.Mat()
    const imageRoi = src.roi(squareToSearch)
    cv.resize(
      imageRoi,
      imageRoi,
      new cv.Size(size.width, size.height),
      0,
      0,
      cv.INTER_AREA,
    )
    const dst = new cv.Mat()
    cv.matchTemplate(charactersMat, imageRoi, dst, cv.TM_CCOEFF_NORMED, mask)
    const result = cv.minMaxLoc(dst, mask)
    imageRoi.delete()
    dst.delete()
    mask.delete()

    return {
      val: result.maxVal,
      loc: {
        x: result.maxLoc.x,
        y: result.maxLoc.y,
      },
    }
  } finally {
    console.timeEnd('Finding matching')
  }
}
