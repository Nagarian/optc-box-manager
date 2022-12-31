import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import {
  Analysis,
  AnalysisType,
  CharacterFound,
  SquareSize,
} from 'services/image-cv-worker'
import { useOptcDb } from './useOptcDb'
import { GameVersion, useUserSettings } from './useUserSettings'

export type ImageAnalyzer = {
  isInitialized: boolean
  isAnalysisInProgress: boolean
  state?: string
  analyses: Analysis[]
  currentAnalysis?: Analysis
  currentVideoRef?: RefObject<HTMLVideoElement>
  allFound: CharacterFound[]

  initialize: () => Promise<void>
  process: (
    type: AnalysisType,
    files: FileList | File[] | null,
  ) => Promise<void>
  reset: () => void
  removeFound: (found: CharacterFound) => void
  removeAnalysis: (analysisId: string) => void
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
  const currentVideoRef = useRef<HTMLVideoElement>(null)
  const currentVideoFrameOnProcessing = useRef<ImageData>()
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
          setState('Analyzis of image done')
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
        case 'VIDEO_PAUSE': {
          currentVideoRef.current?.pause()
          break
        }
        case 'VIDEO_RESUME': {
          currentVideoRef.current?.play()
          setCurrentAnalysis(c => {
            if (!c?.video) {
              return c
            }

            return { ...c, squares: [] }
          })
          break
        }
        case 'FRAME_PROCESSED':
          if (data.isGoodFrame) {
            const analysis: Analysis = {
              id: `${new Date().getTime()}`,
              type: 'box',
              image: currentVideoFrameOnProcessing.current!,
              done: false,
              founds: [],
              squares: [],
            }
            setAnalyses(aa => [...aa, analysis])
          }
          currentVideoFrameOnProcessing.current = undefined
          break
        default:
          break
      }
    }
    worker.onerror = ({ message }) => {
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
      analysis.type === 'box-video'
        ? 'Video analysis in progress - Searching good frame to process'
        : `Images analysis in progress (${remainingAnalysis} remaining) - Searching squares`,
    )

    if (analysis.type !== 'box-video') {
      workerRef.current?.postMessage({
        type: 'PROCESS_IMAGE',
        characters: charactersRef.current,
        analysis,
      })

      return
    }

    if (!analysis.video) {
      return
    }

    workerRef.current?.postMessage({
      type: 'INIT_VIDEO',
      characters: charactersRef.current,
      analysis: { ...analysis, video: undefined },
    })

    const canvas = document.createElement('canvas')
    canvas.height = analysis.video.videoHeight
    canvas.width = analysis.video.videoWidth
    const context = canvas.getContext('2d', { willReadFrequently: true })!
    if (!currentVideoRef.current) {
      return
    }

    currentVideoRef.current.src = analysis.video.src
    currentVideoRef.current.load()

    const video = currentVideoRef.current
    const FPS = 30

    function processFrame () {
      if (video.paused || video.ended) {
        return
      }

      const begin = Date.now()
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
      const frame = context.getImageData(
        0,
        0,
        video.videoWidth,
        video.videoHeight,
      )
      setCurrentAnalysis(c => c && { ...c, image: frame })

      if (!currentVideoFrameOnProcessing.current) {
        workerRef.current?.postMessage({
          type: 'PROCESS_VIDEO',
          frame,
        })

        currentVideoFrameOnProcessing.current = frame
      }

      const delay = 1000 / FPS - (Date.now() - begin)
      setTimeout(processFrame, delay)
    }

    video.addEventListener('ended', e => {
      setCurrentAnalysis(c => c && { ...c, done: true })
    })
    video.addEventListener('play', processFrame)
    video.addEventListener('canplaythrough', e => {
      video.playbackRate = 0.8
      video.play()
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
    currentVideoRef,
    allFound: analyses
      .map(a => (a.id === currentAnalysis?.id ? currentAnalysis : a))
      .flatMap(a => a.founds),
    initialize,
    process: async (type, files) => {
      if (!files?.length) return

      if (type === 'box-video') {
        const videos = await Promise.all([...files].map(loadUserVideo))

        const toAnalyse = videos.map<Analysis>((video, i) => ({
          id: `${new Date().getTime()}-${i}`,
          type,
          image: new ImageData(video.videoWidth, video.videoHeight, {
            colorSpace: 'srgb',
          }),
          video,
          done: false,
          founds: [],
          squares: [],
        }))

        setAnalyses(a => [...a, ...toAnalyse])
      } else {
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
      }
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
    removeAnalysis: analysisId => {
      if (currentAnalysis?.id === analysisId && !currentAnalysis?.done) {
        return
      }

      setAnalyses(aa => aa.filter(a => a.id !== analysisId))
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

async function loadUserVideo (file: File): Promise<HTMLVideoElement> {
  return new Promise<HTMLVideoElement>((resolve, reject) => {
    const video = document.createElement('video')
    video.src = URL.createObjectURL(file)
    video.load()
    video.controls = false
    video.muted = true

    video.addEventListener('canplay', e => {
      resolve(video)
    })
  })
}
