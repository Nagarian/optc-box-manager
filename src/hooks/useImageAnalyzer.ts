import { useCallback, useEffect, useRef, useState } from 'react'
import { Analysis, AnalysisType, CharacterFound, SquareSize } from 'services/image-cv-worker'
import { useOptcDb } from './useOptcDb'
import { GameVersion, useUserSettings } from './useUserSettings'

export type ImageAnalyzer = {
  isInitialized: boolean
  isAnalysisInProgress: boolean
  state?: string
  analyses: Analysis[]
  currentAnalysis?: Analysis

  allFound: CharacterFound[]

  initialize: () => Promise<void>
  process: (type: AnalysisType, files: FileList | File[] | null) => Promise<void>
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
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [state, setState] = useState<string>()

  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [currentAnalysis, setCurrentAnalysis] = useState<Analysis>()
  const remainingAnalysis = analyses.filter(a => !a.done).length
  const hasAnalysisToProcess = remainingAnalysis > 0

  const { db } = useOptcDb()

  const initialize = useCallback(async () => {
    const worker = new Worker(
      new URL('services/image-cv-worker', import.meta.url),
    )

    worker.onmessage = ({ data }) => {
      // console.log('client received message', data)
      switch (data.type) {
        case 'READY':
          setIsInitialized(true)
          setState('Ready')
          break
        case 'PROCESS_IMAGE_END':
          setCurrentAnalysis(c => c && { ...c, done: true })
          setState('Analyzing images done')
          break
        case 'SQUARE_DETECTED':
          setCurrentAnalysis(
            c =>
              c && {
                ...c,
                squares: [...c.squares, data.square as SquareSize],
              },
          )
          break
        case 'CHARACTER_FOUND': {
          const found: CharacterFound = {
            ...data.found,
            unit: db.find(u => u.id === data.found.id),
          }
          setCurrentAnalysis(c => c && { ...c, founds: [...c.founds, found] })
          break
        }
        default:
          break
      }
    }
    worker.onerror = ({ message }) => {
      console.log(message)
      setCurrentAnalysis(c => c && { ...c, done: true, error: message })
      setState(`Sorry an error occured: ${message}`)
    }

    const imageData = await loadCharacterImage(gameVersion)
    charactersRef.current = imageData

    worker.postMessage({ type: 'INIT' })
    setState('Initialization in progress')

    workerRef.current = worker
  }, [db, gameVersion])

  // update analyses when one is finished
  useEffect(() => {
    if (currentAnalysis?.done) {
      setIsProcessing(false)
      setAnalyses(aa =>
        aa.map(a => (a.id === currentAnalysis.id ? currentAnalysis : a)),
      )
    }
  }, [currentAnalysis])

  // dequeue and start analysis when one is available or one is finished
  useEffect(() => {
    if (!isInitialized || !hasAnalysisToProcess || isProcessing) {
      return
    }

    const analysis = analyses.find(a => !a.done)
    if (!analysis) {
      return
    }

    setCurrentAnalysis(analysis)
    setIsProcessing(true)
    setState(
      `Images analysis in progress (${remainingAnalysis} remaining) - Searching squares`,
    )

    workerRef.current?.postMessage({
      type: 'PROCESS_IMAGE',
      characters: charactersRef.current,
      analysis,
    })
  }, [
    analyses,
    hasAnalysisToProcess,
    isInitialized,
    isProcessing,
    remainingAnalysis,
  ])

  // update state message when there is a modification
  useEffect(() => {
    if (hasAnalysisToProcess) {
      if (!currentAnalysis) {
        return
      }
      const { founds, squares } = currentAnalysis

      const realFound = founds.filter(
        f => !!squares.find(s => s.id === f.squareId),
      )

      if (squares.length && realFound.length) {
        setState(
          `Images analysis in progress (${remainingAnalysis} remaining) - Search of matching characters (${realFound.length} / ${squares.length})`,
        )
      }
    } else if (currentAnalysis?.error) {
      setState(`Sorry an error occured: ${currentAnalysis.error}`)
    } else {
      const squareCount = analyses.reduce((sum, c) => sum + c.squares.length, 0)
      const foundCount = analyses.reduce((sum, c) => sum + c.founds.length, 0)
      if (squareCount === foundCount) {
        setState('Analysis done - all characters has been recognized')
      } else {
        const invalidCount = analyses.reduce(
          (sum, c) => sum + c.founds.filter(f => !f.unit).length,
          0,
        )
        const invalid = invalidCount ? `(${invalidCount} not supported)` : ''
        setState(
          `Analysis done - ${foundCount} / ${squareCount} characters founds ${invalid}`,
        )
      }
    }
  }, [analyses, currentAnalysis, hasAnalysisToProcess, remainingAnalysis])

  // gracefully shutdown worker on unmount
  useEffect(() => {
    return () => {
      if (!workerRef.current) return

      workerRef.current.terminate()
      workerRef.current = undefined
    }
  }, [])

  return {
    isInitialized,
    isAnalysisInProgress: hasAnalysisToProcess || isProcessing,
    state,
    analyses,
    currentAnalysis,
    allFound: analyses
      .map(a => a.id === currentAnalysis?.id ? currentAnalysis : a)
      .flatMap(a => a.founds),
    initialize,
    process: async (type, files) => {
      if (!files?.length) return
      const images = await Promise.all([...files].map(loadUserImage))

      const toAnalyse = images.map<Analysis>((image, i) => ({
        id: `${new Date().getTime()}-${i}`,
        type,
        image,
        done: false,
        founds: [],
        squares: [],
      }))

      setAnalyses(a => [...a, ...toAnalyse])
    },
    reset: () => {
      setAnalyses([])
      setCurrentAnalysis(undefined)
      setState('Select new images')
      setIsProcessing(false)
    },
    removeFound: found => {
      let update = analyses.find(a => a.id === found.analysisId)!
      if (!update) {
        return
      }

      update = {
        ...update,
        founds: update.founds.filter(f => f.squareId !== found.squareId),
      }

      setAnalyses(aa => aa.map(a => (a.id === found.analysisId ? update : a)))

      if (!hasAnalysisToProcess) {
        setCurrentAnalysis(update)
      }
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
