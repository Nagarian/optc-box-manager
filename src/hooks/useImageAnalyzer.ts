import { useCallback, useEffect, useRef, useState } from 'react'
import { CharacterFound, SquareSize } from 'services/image-cv-worker'
import { GameVersion, useUserSettings } from './useUserSettings'

export type ImageAnalyzer = {
  isInitialized: boolean
  isAnalyzisInProgress: boolean
  state?: string
  found: CharacterFound[]
  squares: SquareSize[]
  currentImage?: ImageData
  initialize: () => Promise<void>
  processTavern: (files: File[]) => Promise<void>
  reset: () => void
  removeFound: (found: CharacterFound) => void
}
export function useImageAnalyzer (): ImageAnalyzer {
  const {
    userSetting: { gameVersion },
  } = useUserSettings()
  const workerRef = useRef<Worker>()
  const charactersRef = useRef<ImageData>()
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [isAnalyzisInProgress, setIsAnalyzisInProgress] =
    useState<boolean>(false)
  const [state, setState] = useState<string>()

  const [imagesToImport, setImagesToImport] = useState<ImageData[]>([])
  const [currentImage, setCurrentImage] = useState<ImageData>()
  const currentImageRef = useRef<ImageData>()
  const [found, setFound] = useState<CharacterFound[]>([])
  const [squares, setSquares] = useState<SquareSize[]>([])

  const initialize = useCallback(async () => {
    const worker = new Worker(
      new URL('services/image-cv-worker', import.meta.url),
    )

    worker.onmessage = ({ data }) => {
      switch (data.type) {
        case 'READY':
          setIsInitialized(true)
          setState('Ready')
          break
        case 'PROCESS_TAVERN_END':
        case 'PROCESS_BOX_END':
          if (!currentImageRef.current) break
          setImagesToImport(([firstImg, ...imgs]) => imgs)
          setIsAnalyzisInProgress(false)
          setState('Analyzing images done')
          break
        case 'SQUARE_DETECTED':
          if (!currentImageRef.current) break
          setSquares(s => [...s, data.square as SquareSize])
          break
        case 'CHARACTER_FOUND':
          if (!currentImageRef.current) break
          setFound(s => [...s, data.found as CharacterFound])
          break
        case 'ERROR_OCCURED':
          setState(`Sorry an error occured: ${data.error.message}`)
          break
        default:
          break
      }
    }

    const imageData = await loadCharacterImage(gameVersion)
    charactersRef.current = imageData

    worker.postMessage({ type: 'INIT' })
    setState('Initialization in progress')

    workerRef.current = worker
  }, [gameVersion])

  useEffect(() => {
    currentImageRef.current = currentImage
  }, [currentImage])

  useEffect(() => {
    if (!isInitialized || !imagesToImport.length || isAnalyzisInProgress) {
      return
    }

    setIsAnalyzisInProgress(true)
    setState(
      `Images analysis in progress (${imagesToImport.length} remaining) - Searching squares`,
    )
    setSquares([])
    setCurrentImage(imagesToImport[0])

    workerRef.current?.postMessage({
      type: 'PROCESS_TAVERN',
      // type: 'PROCESS_BOX',
      characters: charactersRef.current,
      image: imagesToImport[0],
    })
  }, [imagesToImport, isAnalyzisInProgress, isInitialized])

  useEffect(() => {
    const realFound = found.filter(
      f => !!squares.find(s => s.id === f.squareId),
    )
    if (isAnalyzisInProgress && squares.length && realFound.length) {
      setState(
        `Images analysis in progress (${imagesToImport.length} remaining) - Search of matching characters (${realFound.length} / ${squares.length})`,
      )
    }
  }, [found, imagesToImport.length, isAnalyzisInProgress, squares])

  useEffect(() => {
    return () => {
      if (!workerRef.current) return

      workerRef.current.terminate()
      workerRef.current = undefined
    }
  }, [])

  return {
    isInitialized,
    isAnalyzisInProgress,
    state,
    currentImage,
    found,
    squares,
    initialize,
    processTavern: async files => {
      const images = await Promise.all(files.map(loadUserImage))
      setImagesToImport(imgs => [...imgs, ...images])
    },
    reset: () => {
      setFound([])
      setSquares([])
      setState('Select new images')
      setCurrentImage(undefined)
      setImagesToImport([])
      setIsAnalyzisInProgress(false)
    },
    removeFound: (found) => {
      setFound(f => f.filter(ff => ff.squareId !== found.squareId))
    },
  }
}

async function loadCharacterImage (
  gameVersion: GameVersion,
): Promise<ImageData> {
  const url =
    gameVersion === 'global'
      ? `${process.env.PUBLIC_URL}/characters/global-fixed-10x9.png`
      : `${process.env.PUBLIC_URL}/characters/japan-10x9.png`
  const res = await fetch(url, { mode: 'cors' })
  const imgBlob = await res.blob()
  const img = await createImageBitmap(imgBlob, {
    premultiplyAlpha: 'none',
    colorSpaceConversion: 'none',
  })

  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx!.drawImage(img, 0, 0, img.width, img.height)
  return ctx!.getImageData(0, 0, img.width, img.height)
}

async function loadUserImage (file: File): Promise<ImageData> {
  return new Promise<ImageData>((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const baseImage = new Image()
    baseImage.src = URL.createObjectURL(file)
    baseImage.onload = function () {
      canvas.width = baseImage.width
      canvas.height = baseImage.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(baseImage, 0, 0)
      resolve(ctx.getImageData(0, 0, baseImage.width, baseImage.height))
    }
  })
}
