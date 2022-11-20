import styled from '@emotion/styled'
import Box from 'components/Box'
import Button from 'components/Button'
import CharacterBox from 'components/CharacterBox'
import { FileButtonInput } from 'components/forms/FileButtonInput'
import {
  CameraFppIcon,
  CameraTavernIcon,
  CameraTreasureIcon,
  Icon,
  ImageAnalyzerIcon,
} from 'components/Icon'
import Popup from 'components/Popup'
import { SubTitle } from 'components/Title'
import { useImageAnalyzer } from 'hooks/useImageAnalyzer'
import { useEffect, useRef, useState } from 'react'
import { Analysis, AnalysisType } from 'services/image-cv-worker'
import { display, DisplayProps } from 'styled-system'

export type ImageAnalyzerProps = {
  onCharacterSelected?: (ids: number[]) => void
}
export function ImageAnalyzer ({ onCharacterSelected }: ImageAnalyzerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLCanvasElement>(null)
  const selectionPanelRef = useRef<HTMLDivElement>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [currentlyDisplayed, setCurrentlyDisplayed] = useState<Analysis>()
  const {
    initialize,
    isInitialized,
    isAnalysisInProgress,
    process,
    state,
    analyses,
    allFound,
    currentAnalysis,
    reset,
    removeFound,
  } = useImageAnalyzer()

  useEffect(() => {
    // update display when analysis change
    setCurrentlyDisplayed(currentAnalysis)
  }, [currentAnalysis])

  useEffect(() => {
    // update layout
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) return

    if (!currentlyDisplayed) return

    const { image, squares, founds, done } = currentlyDisplayed
    canvasRef.current.width = image.width
    canvasRef.current.height = image.height
    ctx.putImageData(image, 0, 0)

    if (squares.length || done) {
      ctx.rect(0, 0, image.width, image.height)
      for (const square of squares) {
        ctx.moveTo(square.x, square.y)
        ctx.rect(square.x, square.y, square.width, square.height)
      }
      ctx.fillStyle = '#00000099'
      ctx.fill('evenodd')
    }

    for (const square of squares) {
      const rectangle = new Path2D()
      rectangle.rect(square.x, square.y, square.width, square.height)

      ctx.strokeStyle = 'white'
      ctx.lineWidth = 8
      ctx.stroke(rectangle)

      const founded = founds.find(f => f.squareId === square.id)
      if (founded) {
        ctx.strokeStyle = founded.unit ? 'green' : 'orange'
        ctx.lineWidth = 5
        ctx.stroke(rectangle)
      } else if (done) {
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 5
        ctx.stroke(rectangle)
      }
    }
  }, [currentlyDisplayed])

  useEffect(() => {
    // autoscroll in canvas feature
    if (
      !canvasContainerRef.current ||
      !canvasRef.current ||
      !currentlyDisplayed?.squares.length
    ) {
      return
    }

    const yMin = Math.min(...currentlyDisplayed.squares.map(s => s.y))
    const yMax =
      Math.max(...currentlyDisplayed.squares.map(s => s.y)) +
      currentlyDisplayed.squares[0].height
    const panelHeight = canvasContainerRef.current.clientHeight
    const canvasRatio =
      canvasRef.current.height / canvasRef.current.clientHeight
    const panelratio = canvasRef.current.clientHeight / canvasRef.current.height

    canvasContainerRef.current.scrollTo({
      top: Math.max(
        0,
        (yMin - (panelHeight * canvasRatio - (yMax - yMin)) / 2) * panelratio,
      ),
      behavior: 'smooth',
    })
  }, [currentlyDisplayed?.squares])

  useEffect(() => {
    // autoscroll when a found is added
    if (selectionPanelRef.current && isAnalysisInProgress) {
      selectionPanelRef.current.scrollTo({
        left: selectionPanelRef.current.scrollWidth,
        behavior: 'smooth',
      })
    }
  }, [currentAnalysis?.founds, isAnalysisInProgress])

  return (
    <>
      <Button
        m="1"
        fontSize="2"
        onClick={async () => {
          if (!isInitialized) {
            setIsLoading(true)
            await initialize()
          }

          setShowPopup(true)
        }}
        title="Import characters from screenshot"
        isLoading={isLoading && !isInitialized}
        icon={ImageAnalyzerIcon}
      />
      {showPopup && (
        <Popup
          title="Screenshot Analyzer"
          onValidate={() => {
            setShowPopup(false)
            onCharacterSelected?.(allFound.filter(f => !!f.unit).map(f => f.id))
            reset()
          }}
          onCancel={() => {
            setShowPopup(false)
            reset()
          }}
          customAction={
            <>
              {ImporterType.map(it => (
                <FileButtonInput
                  key={it.type}
                  accept=".jpg"
                  m="1"
                  fontSize="2"
                  title={it.title}
                  onFiles={files => process(it.type, files)}
                  icon={it.icon}
                />
              ))}
            </>
          }
        >
          <Box
            display="grid"
            gridTemplateRows="auto 1fr auto"
            overflow="hidden"
          >
            <Box display="flex" overflowX="auto">
              {analyses.length > 1 &&
                analyses.map((old, i) => (
                  <Button
                    key={i}
                    m="2"
                    disabled={old.id === currentlyDisplayed?.id}
                    onClick={() =>
                      !isAnalysisInProgress && setCurrentlyDisplayed(old)
                    }
                  >
                    {i + 1}
                  </Button>
                ))}
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignContent="center"
              overflowY="auto"
              ref={canvasContainerRef}
            >
              {!currentAnalysis && (
                <Box display="grid" gridTemplateColumns="1fr 1fr">
                  {ImporterType.map(it => (
                    <FileButtonInput
                      key={it.type}
                      accept=".jpg"
                      m="1"
                      fontSize="2"
                      size="4"
                      title={it.title}
                      iconVariant="vertical"
                      onFiles={files => process(it.type, files)}
                      icon={it.icon}
                    >
                      {it.title}
                    </FileButtonInput>
                  ))}
                </Box>
              )}
              <Canvas
                ref={canvasRef}
                display={currentAnalysis ? 'block' : 'none'}
              />
            </Box>
            <SubTitle my="2">{state}</SubTitle>
            <Box display="flex" overflowX="auto" ref={selectionPanelRef}>
              {allFound
                .filter(f => !!f.unit)
                .map((f, i) => (
                  <CharacterBox
                    key={i}
                    unit={f.unit!}
                    size={4}
                    onClick={() => removeFound(f)}
                  />
                ))}
            </Box>
          </Box>
        </Popup>
      )}
    </>
  )
}

const Canvas = styled.canvas<DisplayProps>(display)

const ImporterType: { type: AnalysisType; title: string; icon: Icon }[] = [
  {
    type: 'generic',
    title: 'Import screenshots - Generic Square',
    icon: ImageAnalyzerIcon,
  },
  { type: 'box', title: 'Import Box screenshots', icon: CameraTreasureIcon },
  {
    type: 'fpp',
    title: 'Import Friend Point Pull screenshots',
    icon: CameraFppIcon,
  },
  {
    type: 'tavern',
    title: 'Import Tavern screenshots',
    icon: CameraTavernIcon,
  },
]
