/// <reference lib="webworker" />

// eslint-disable-next-line no-undef
declare const self: DedicatedWorkerGlobalScope
declare const cv: any

export type SquareSize = {
  id: string
  height: number
  width: number
  x: number
  y: number
}

export type CharacterFound = {
  squareId: string
  id: number
  score: number
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
}
size.gridVertical = Math.ceil(size.maxId / size.gridHorizontal)
size.maxWidth = size.gridHorizontal * size.width
size.maxHeight = size.gridVertical * size.height

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

onmessage = async ({ data }) => {
  try {
    switch (data.type) {
      case 'INIT':
        await loadOpenCv()
        self.postMessage({ type: 'READY' })
        break
      case 'PROCESS_TAVERN': {
        const charactersMat = cv.matFromImageData(data.characters)
        const src = cv.matFromImageData(data.image)
        const squares = detectTavernSquare(src)
        findCharacterIds(charactersMat, src, squares)
        src.delete()
        charactersMat.delete()
        self.postMessage({ type: 'PROCESS_TAVERN_END' })
        break
      }
      default:
        break
    }
  } catch (error) {
    self.postMessage({ type: 'ERROR_OCCURED', error })
  }
}

// export async function loadCharacterImage (): Promise<ImageData> {
//   const url = `${process.env.PUBLIC_URL}/characters/global-fixed-${extractionSize.croppedWidth}x${extractionSize.croppedHeight}.png`
//   const res = await fetch(url, { mode: 'cors' })
//   const imgBlob = await res.blob()
//   const img = await createImageBitmap(imgBlob, {
//     premultiplyAlpha: 'none',
//     colorSpaceConversion: 'none',
//   })

//   const canvas = document.createElement('canvas')
//   canvas.width = img.width
//   canvas.height = img.height
//   const ctx = canvas.getContext('2d')
//   ctx!.drawImage(img, 0, 0, img.width, img.height)
//   return ctx!.getImageData(0, 0, img.width, img.height)
// }

// async function loadCharactersMat () {
//   const url = `./img/cropped/global-fixed-${extractionSize.croppedWidth}x${extractionSize.croppedHeight}.png`
//   const res = await fetch(url, { mode: 'cors' })
//   const imgBlob = await res.blob()
//   const img = await createImageBitmap(imgBlob, {
//     premultiplyAlpha: 'none',
//     colorSpaceConversion: 'none',
//   })

//   const test = new OffscreenCanvas(img.width, img.height)
//   const ctx = test.getContext('2d')
//   ctx.drawImage(img, 0, 0, img.width, img.height)
//   const imageData = ctx.getImageData(0, 0, img.width, img.height)
//   return cv.matFromImageData(imageData)
// }

function detectTavernSquare (src: any) {
  const copy = src.clone()

  // we filter image to keep only yellow one
  const colorMask = src.clone()
  const low = new cv.Mat(src.rows, src.cols, src.type(), [150, 150, 0, 255])
  const high = new cv.Mat(src.rows, src.cols, src.type(), [255, 255, 255, 255])
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
    if (rect.width < 155 || rect.height < 155) continue

    // if (rect.width > 165 || rect.height > 165) continue;

    const extractedSquare = {
      x:
        rect.x +
        Math.floor(
          (extractionSize.left * rect.width) / extractionSize.originalSize,
        ),
      width: Math.floor(
        (extractionSize.width * rect.width) / extractionSize.originalSize,
      ),
      y:
        rect.y +
        Math.floor(
          (extractionSize.top * rect.width) / extractionSize.originalSize,
        ),
      height: Math.floor(
        (extractionSize.height * rect.width) / extractionSize.originalSize,
      ),
    }

    // we skipped doublons
    if (
      squaresToExtract.find(
        ({ height, width, x, y }) =>
          height === extractedSquare.height &&
          width === extractedSquare.width &&
          x === extractedSquare.x &&
          y === extractedSquare.y,
      )
    ) {
      continue
    }

    const squareDetected: SquareSize = {
      ...extractedSquare,
      id: `${new Date().getTime()}-${squaresToExtract.length}`,
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

function findCharacterIds (charactersMat: any, src: any, squares: SquareSize[]) {
  const mask = new cv.Mat()

  console.time('Finding all matching')

  for (const squareToSearch of squares) {
    console.time('Finding matching')

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

    const found = {
      val: result.maxVal,
      loc: {
        x: result.maxLoc.x,
        y: result.maxLoc.y,
      },
    }

    imageRoi.delete()
    dst.delete()

    console.timeEnd('Finding matching')

    // we add constant to be sure to being into right image
    const id =
      (Math.ceil((found.loc.y + 5) / size.height) - 1) * size.gridHorizontal +
      Math.ceil((found.loc.x + 5) / size.width)

    if (found.val < 0.8) {
      continue
    }

    const characterFound: CharacterFound = {
      id,
      squareId: squareToSearch.id,
      score: found.val,
    }

    self.postMessage({ type: 'CHARACTER_FOUND', found: characterFound })
  }

  console.timeEnd('Finding all matching')
  mask.delete()
}
