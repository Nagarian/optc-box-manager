/// <reference lib="webworker" />
import { CV, Mat } from '@techstark/opencv-js'
import { ImageAnalyzerSettings } from 'hooks/useUserSettings'
import { ExtendedUnit } from 'models/units'

declare const self: DedicatedWorkerGlobalScope & { cv: CV }
declare const cv: CV

export type MessageToWorker =
  | { type: 'INIT' }
  | {
      type: 'PROCESS_IMAGE'
      characters: ImageData
      analysis: Analysis
      settings?: ImageAnalyzerSettings
    }
  | { type: 'INIT_VIDEO'; characters: ImageData; analysis: Analysis }
  | { type: 'PROCESS_VIDEO'; frame: ImageData }

export type MessageFromWorker =
  | { type: 'READY' }
  | { type: 'PROCESS_IMAGE_END'; analysisId: string }
  | { type: 'SQUARE_DETECTED'; analysisId: string; square: SquareSize }
  | { type: 'CHARACTER_FOUND'; analysisId: string; found: CharacterFound }
  | {
      type: 'FRAME_PROCESSED'
      analysisId: string
      isGoodFrame: boolean
      msg?: string
    }

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

export type AnalysisType = 'tavern' | 'fpp' | 'box' | 'generic' | 'box-video'

export type Analysis = {
  id: string
  type: AnalysisType
  image: ImageData
  video?: HTMLVideoElement
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
export type BoxSizeMatrix = {
  gameWidth: number
  gameHeight: number
  roi: {
    x: number
    y: number
    width: number
    height: number
  }
  characterSize: number
  minH: number
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

const boxSizeMatrix: BoxSizeMatrix = {
  gameWidth: 1080,
  gameHeight: 1620,
  roi: { x: 40, y: 320, width: 945, height: 1040 },
  characterSize: -1,
  minH: -1,
}

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

async function loadOpenCv(waitTimeMs = 30000, stepTimeMs = 100): Promise<void> {
  // lib has been modified to remove default export
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const opencv = await import(
    /* @vite-ignore */ `${import.meta.env.BASE_URL}/opencv-4.8.0.js`
  )
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    self.cv = opencv.cv() as CV
    if (cv.Mat) {
      resolve()
      return
    }

    let timeSpentMs = 0
    const interval = setInterval(() => {
      const limitReached = timeSpentMs > waitTimeMs
      if (cv.Mat || limitReached) {
        clearInterval(interval)
        if (limitReached) {
          reject(new Error('Loading OpenCV timeout'))
        } else {
          resolve()
        }
      } else {
        timeSpentMs += stepTimeMs
      }
    }, stepTimeMs)
  })
}

onmessage = ({ data }: MessageEvent<MessageToWorker>) => {
  // console.log('worker received message', data)
  switch (data.type) {
    case 'INIT':
      loadOpenCv().then(
        () => self.postMessage({ type: 'READY' }),
        (error: unknown) => {
          throw error
        },
      )
      break
    case 'PROCESS_IMAGE': {
      const { image, type, id } = data.analysis
      const charactersMat = cv.matFromImageData(data.characters)
      const src = cv.matFromImageData(image)
      let squares: SquareSize[] = []
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

      findCharacterIds(
        charactersMat,
        id,
        src,
        squares,
        data.settings?.minConfidence ?? 0.8,
      )
      src.delete()
      charactersMat.delete()
      self.postMessage({
        type: 'PROCESS_IMAGE_END',
        analysisId: data.analysis?.id,
      })
      break
    }
    case 'INIT_VIDEO': {
      videoAnalyzer?.delete()
      const { id } = data.analysis
      const charactersMat = cv.matFromImageData(data.characters)
      videoAnalyzer = new VideoAnalyzer({
        analysisId: id,
        charactersMat,
      })
      break
    }
    case 'PROCESS_VIDEO': {
      const frame = cv.matFromImageData(data.frame)
      videoAnalyzer?.processFrame(frame)
      frame.delete()
      break
    }

    default:
      break
  }
}

function detectGenericSquare(src: Mat, analysisId: string): SquareSize[] {
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
    cv.CV_8U as number,
    cv.Mat.eye(3, 3, cv.CV_32FC1 as number),
    new cv.Point(-1, -1),
    0,
    cv.BORDER_DEFAULT as number,
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
    cv.RETR_LIST as number,
    cv.CHAIN_APPROX_SIMPLE as number,
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
      analysisId,
      square: {
        id: squareDetected.id,
        analysisId: squareDetected.analysisId,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      },
    })
  }

  copy.delete()
  return squaresToExtract.reverse()
}

function detectTopScreenV1(src: Mat): number {
  const oldGray = new cv.Mat()
  cv.cvtColor(src, oldGray, cv.COLOR_RGBA2GRAY as number)

  const not = new cv.Mat()
  cv.bitwise_not(oldGray, not)
  cv.Canny(not, not, 80, 120)

  // const not = oldGray.clone()
  // cv.threshold(oldGray, not, 100, 200, cv.THRESH_BINARY)
  // cv.Canny(not, not, 90, 120)
  const lines = new cv.Mat()
  cv.HoughLinesP(not, lines, 1, Math.PI / 2, 2, 30, 1)
  let topBound: number = src.rows
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
  return topBound
}

function detectTopScreenV2(src: Mat): number {
  const grayed = new cv.Mat()
  cv.cvtColor(src, grayed, cv.COLOR_RGBA2GRAY as number)
  cv.threshold(grayed, grayed, 100, 200, cv.THRESH_BINARY as number)
  cv.Canny(grayed, grayed, 90, 120)

  const lines = new cv.Mat()
  cv.HoughLinesP(grayed, lines, 1, Math.PI / 2, 2, 30, 1)
  grayed.delete()

  let topBound: number = src.rows
  for (let i = 0; i < lines.rows; ++i) {
    const [x1, y1, x2, y2] = [
      lines.data32S[i * 4],
      lines.data32S[i * 4 + 1],
      lines.data32S[i * 4 + 2],
      lines.data32S[i * 4 + 3],
    ]

    if (x2 - x1 < src.cols * 0.8) continue
    if (y1 !== y2) continue
    if (y1 > topBound) continue
    topBound = y1
  }

  lines.delete()
  return topBound > src.rows / 2 ? -1 : topBound
}

function detectFirstHorizontalLine(src: Mat): number {
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

  let bitwised = new cv.Mat()
  cv.bitwise_and(src, src, bitwised, bitOr)
  bitOr.delete()

  // Ensure bitwised is RGBA before converting to grayscale
  if (bitwised.empty()) {
    throw new Error('bitwised is empty before cvtColor')
  }
  if (bitwised.channels() === 1) {
    const tmp = new cv.Mat()
    cv.cvtColor(bitwised, tmp, cv.COLOR_GRAY2RGBA as number)
    bitwised.delete()
    bitwised = tmp
  }

  const lines = new cv.Mat()
  cv.cvtColor(bitwised, bitwised, cv.COLOR_RGBA2GRAY as number)
  cv.Canny(bitwised, bitwised, 50, 255)
  cv.HoughLinesP(bitwised, lines, 1, Math.PI / 2, 2, 30, 1)
  bitwised.delete()

  const horizontals: number[] = []

  for (let i = 0; i < lines.rows; ++i) {
    const [x1, y1, x2, y2] = [
      lines.data32S[i * 4],
      lines.data32S[i * 4 + 1],
      lines.data32S[i * 4 + 2],
      lines.data32S[i * 4 + 3],
    ]

    const horizontalLength = Math.abs(x2 - x1)
    const verticalLength = Math.abs(y2 - y1)
    const minimalLength = src.cols * 0.1

    if (verticalLength === 0 && horizontalLength > minimalLength) {
      horizontals.push(y1)
    }
  }
  lines.delete()

  const characterWidth = Math.round(src.cols / 5)
  horizontals.sort((h1, h2) => (h1 > h2 ? 1 : h1 === h2 ? 0 : -1))

  const minH = horizontals.find(h1 =>
    horizontals.find(h2 => characterWidth === h2 - h1),
  )

  return (minH ?? -1) % characterWidth
}

function detectMatrixSquare(
  src: Mat,
  analysisId: string,
  initialSize: InitialSizeMatrix,
): SquareSize[] {
  const topBound = detectTopScreenV1(src)
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
        analysisId,
        square,
      })
    }
  }

  return squares
}

function detectBoxRoiSizing(src: Mat): BoxSizeMatrix | undefined {
  const initialRoi = boxSizeMatrix.roi

  const topScreen = detectTopScreenV2(src)

  if (topScreen < 0) {
    return undefined
  }

  const ratio = src.cols / boxSizeMatrix.gameWidth
  return {
    ...boxSizeMatrix,
    roi: {
      x: initialRoi.x * ratio,
      y: topScreen + initialRoi.y * ratio,
      width: initialRoi.width * ratio,
      height: initialRoi.height * ratio,
    },
    characterSize: (initialRoi.width * ratio) / 5,
  }
}

function extractBoxSquareFromRoi(
  analysisId: string,
  boxSize: BoxSizeMatrix,
): SquareSize[] {
  const squaresToExtract: SquareSize[] = []
  const threshold =
    boxSize.roi.y + boxSize.roi.height - boxSize.characterSize * 0.6
  for (let yI = 0; yI < 5; yI++) {
    const y = boxSize.minH + boxSize.characterSize * yI

    for (let xI = 0; xI < 5; xI++) {
      const x = 0 + boxSize.characterSize * xI

      const square: SquareSize = {
        analysisId,
        id: `${yI}-${xI}`,
        x: boxSize.roi.x + x,
        width: boxSize.characterSize,
        y: boxSize.roi.y + y,
        height: boxSize.characterSize,
      }

      const extractionSquare: SquareSize = resizeSquare(square)
      square.id = extractionSquare.id

      if (square.y > threshold) {
        continue
      }

      squaresToExtract.push(extractionSquare)

      self.postMessage({
        type: 'SQUARE_DETECTED',
        square: {
          id: extractionSquare.id,
          analysisId,
          x: boxSize.roi.x + x,
          y: boxSize.roi.y + y,
          width: boxSize.characterSize - 8,
          height: boxSize.characterSize - 8,
        },
      })
    }
  }

  return squaresToExtract
}

function detectBoxSquare(src: Mat, analysisId: string): SquareSize[] {
  const roiSize = detectBoxRoiSizing(src)
  if (!roiSize) return []
  const roi = src.roi(roiSize.roi)
  const minH = detectFirstHorizontalLine(roi)
  roi.delete()
  if (minH < 0) return []
  roiSize.minH = minH
  return extractBoxSquareFromRoi(analysisId, roiSize)
}

function resizeSquare({ analysisId, id, x, y, width }: SquareSize): SquareSize {
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

function findCharacterIds(
  charactersMat: Mat,
  analysisId: string,
  src: Mat,
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

      self.postMessage({
        type: 'CHARACTER_FOUND',
        analysisId,
        found: characterFound,
      })
    }
  } finally {
    console.timeEnd('Finding all matching')
  }
}

function findMatching(
  charactersMat: Mat,
  src: Mat,
  squareToSearch: SquareSize,
) {
  try {
    console.time('Finding matching')
    const mask = new cv.Mat()

    // Bounds check
    const maxX = src.cols
    const maxY = src.rows
    let { x, y, width, height } = squareToSearch
    x = Math.max(0, Math.min(x, maxX - 1))
    y = Math.max(0, Math.min(y, maxY - 1))
    width = Math.max(1, Math.min(width, maxX - x))
    height = Math.max(1, Math.min(height, maxY - y))

    const roiRect = new cv.Rect(x, y, width, height)
    const imageRoi = src.roi(roiRect)
    cv.resize(
      imageRoi,
      imageRoi,
      new cv.Size(size.width, size.height),
      0,
      0,
      cv.INTER_AREA as number,
    )
    cv.cvtColor(imageRoi, imageRoi, cv.COLOR_RGBA2GRAY as number)
    // Also ensure charactersMat is grayscale
    let templateMat = new cv.Mat()
    if (charactersMat.channels() > 1) {
      cv.cvtColor(charactersMat, templateMat, cv.COLOR_RGBA2GRAY as number)
    } else {
      templateMat = charactersMat
    }
    const dst = new cv.Mat()
    cv.matchTemplate(
      templateMat,
      imageRoi,
      dst,
      cv.TM_CCOEFF_NORMED as number,
      mask,
    )
    const result = cv.minMaxLoc(dst, mask)
    imageRoi.delete()
    if (templateMat !== charactersMat) templateMat.delete()
    dst.delete()

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

type VideoAnalyzerOptions = { charactersMat: Mat; analysisId: string }
class VideoAnalyzer {
  private _frameRoiSize: { x: number; y: number; width: number; height: number }
  private _isInitialized: boolean

  private _lineCount: number
  private _nextLineCount: number
  private _currentMinH: number
  private _characterSize: number

  private _charactersMat: Mat
  private _analysisId: string

  constructor({ analysisId, charactersMat }: VideoAnalyzerOptions) {
    this._isInitialized = false
    this._frameRoiSize = { x: 40, y: 320, width: 945, height: 1040 }
    this._characterSize = 0

    this._charactersMat = charactersMat
    this._analysisId = analysisId

    this._lineCount = -1
    this._nextLineCount = 5
    this._currentMinH = 0
  }

  delete() {
    this._charactersMat?.delete()
  }

  processFrame(frame: Mat) {
    this.computeInitialVideoConstants(frame)
    if (!this._isInitialized) {
      this.signalEndOfImageProcess('not initialized')
      return
    }

    const roi = frame.roi(this._frameRoiSize)
    const roiRows = roi.rows
    const previousMinH = this._currentMinH
    this._currentMinH = this.detectFirstHorizontalLine(roi)
    roi.delete()

    if (this._currentMinH < previousMinH) {
      // first row hasn't changed so we stop processing
      this.signalEndOfImageProcess('first row hasnt moved')
      return
    }

    this._lineCount++

    if (this._lineCount < this._nextLineCount) {
      // the required number of line hasn't been scrolled so we stop processing
      this.signalEndOfImageProcess(
        `waiting for the next screen ${this._lineCount} ${this._nextLineCount}`,
      )
      return
    }

    this._nextLineCount = this.getNextLineCount(roiRows)
    this._lineCount = -1

    this.signalEndOfImageProcess('frame fully processed', true)
  }

  private signalEndOfImageProcess(msg?: string, isGoodFrame = false) {
    self.postMessage({
      type: 'FRAME_PROCESSED',
      analysisId: this._analysisId,
      isGoodFrame,
      msg,
    })
  }

  private computeInitialVideoConstants(src: Mat) {
    if (this._isInitialized) {
      return
    }

    const { roi, characterSize } = detectBoxRoiSizing(src) ?? {}
    if (!roi || !characterSize) return

    this._frameRoiSize = {
      x: roi.x,
      y: roi.y,
      height: roi.height,
      width: roi.width,
    }
    this._characterSize = characterSize
    this._isInitialized = true
  }

  private detectFirstHorizontalLine(src: Mat): number {
    return detectFirstHorizontalLine(src)
  }

  private getNextLineCount(srcRows: number): number {
    for (let yI = 0; yI < 5; yI++) {
      const y = this._currentMinH + this._characterSize * yI

      if (y + this._characterSize > srcRows) return yI
    }

    return 5
  }
}

let videoAnalyzer: VideoAnalyzer | null = null
