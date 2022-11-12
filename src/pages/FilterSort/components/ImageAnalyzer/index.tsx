import Box from 'components/Box'
import Button from 'components/Button'
import CharacterBox from 'components/CharacterBox'
import { ImageAnalyzerIcon } from 'components/Icon'
import Popup from 'components/Popup'
import { SubTitle } from 'components/Title'
import { useImageAnalyzer } from 'hooks/useImageAnalyzer'
import { useOptcDb } from 'hooks/useOptcDb'
import { ExtendedUnit } from 'models/units'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { CharacterFound } from 'services/image-cv-worker'

export type ImageAnalyzerProps = {
  onCharacterSelected?: (ids: number[]) => void
}
export function ImageAnalyzer ({ onCharacterSelected }: ImageAnalyzerProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [oldAnalyses, setOldAnalyses] = useState<ImageData[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLCanvasElement>(null)
  const importRef = useRef<HTMLInputElement>(null)
  const selectionPanelRef = useRef<HTMLDivElement>(null)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const {
    initialize,
    isInitialized,
    isAnalyzisInProgress,
    processTavern,
    state,
    squares,
    found,
    currentImage,
    reset,
    removeFound,
  } = useImageAnalyzer()
  const { db } = useOptcDb()
  const selectedCharacters = found
    .map<[CharacterFound, ExtendedUnit]>(f => [f, db.find(char => char.id === f.id)!])
    .filter(([f, char]) => !!char)

  const initOrImport = async () => {
    if (!isInitialized) {
      setIsLoading(true)
      await initialize()
    }

    setShowPopup(true)

    if (!importRef.current) {
      return
    }

    importRef.current.value = ''
    importRef.current.click()
  }

  const imp = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return
    const context = canvasRef.current?.getContext('2d')
    if (!context) return

    processTavern([...e.target.files])
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')

    if (!ctx) return

    if (!currentImage) return

    canvasRef.current.width = currentImage.width
    canvasRef.current.height = currentImage.height
    ctx.putImageData(currentImage, 0, 0)

    if (squares.length || !isAnalyzisInProgress) {
      ctx.rect(0, 0, currentImage.width, currentImage.height)
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

      const founded = found.find(f => f.squareId === square.id)
      if (founded) {
        ctx.strokeStyle = selectedCharacters.find(([f, sc]) => f.id === founded.id)
          ? 'green'
          : 'orange'
        ctx.lineWidth = 5
        ctx.stroke(rectangle)
      } else if (!isAnalyzisInProgress) {
        ctx.strokeStyle = 'red'
        ctx.lineWidth = 5
        ctx.stroke(rectangle)
      }
    }
  }, [squares, found, isAnalyzisInProgress, currentImage, selectedCharacters])

  useEffect(() => {
    if (isAnalyzisInProgress || !canvasRef.current) {
      return
    }

    const ctx = canvasRef.current.getContext('2d')
    const data = ctx!.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    )
    setOldAnalyses(old => [...old, data])
  }, [isAnalyzisInProgress])

  useEffect(() => {
    if (!canvasContainerRef.current || !canvasRef.current || !squares.length) {
      return
    }

    const yMin = Math.min(...squares.map(s => s.y))
    const yMax = Math.max(...squares.map(s => s.y)) + squares[0].height
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
  }, [squares])

  useEffect(() => {
    if (selectionPanelRef.current) {
      selectionPanelRef.current.scrollTo({
        left: selectionPanelRef.current.scrollWidth,
        behavior: 'smooth',
      })
    }
  }, [found])

  return (
    <>
      <input
        type="file"
        accept=".jpg"
        style={{ display: 'none' }}
        multiple
        ref={importRef}
        onChange={imp}
      />
      <Button
        m="1"
        fontSize="2"
        onClick={initOrImport}
        isLoading={isLoading && !isInitialized}
        icon={ImageAnalyzerIcon}
      />
      {showPopup && (
        <Popup
          title="Image Analyzer"
          onValidate={() => {
            setShowPopup(false)
            onCharacterSelected?.(found.map(f => f.id))
            setOldAnalyses([])
            reset()
          }}
          onCancel={() => {
            setShowPopup(false)
            setOldAnalyses([])
            reset()
          }}
          customAction={
            <Button
              m="1"
              fontSize="2"
              onClick={initOrImport}
              icon={ImageAnalyzerIcon}
              isLoading={isLoading && !isInitialized}
            />
          }
        >
          <Box
            display="grid"
            gridTemplateRows="auto 1fr auto"
            overflow="hidden"
          >
            <Box display="flex" overflowX="auto">
              {oldAnalyses.length > 1 &&
                oldAnalyses.map((old, i) => (
                  <Button
                    key={i}
                    m="2"
                    disabled={isAnalyzisInProgress}
                    onClick={() => {
                      if (!canvasRef.current) return
                      canvasRef.current.width = old.width
                      canvasRef.current.height = old.height
                      const ctx = canvasRef.current.getContext('2d')
                      ctx!.putImageData(old, 0, 0)
                    }}
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
              <canvas ref={canvasRef} />
            </Box>
            <SubTitle my="2">{state}</SubTitle>
            <Box display="flex" overflowX="auto" ref={selectionPanelRef}>
              {selectedCharacters.map(([f, unit], i) => (
                <CharacterBox
                  key={i}
                  unit={unit as ExtendedUnit}
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
