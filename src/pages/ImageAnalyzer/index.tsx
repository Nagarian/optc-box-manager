import Box from 'components/Box'
import Button from 'components/Button'
import CharacterBox from 'components/CharacterBox'
import {
  FileButtonInput,
  FileButtonInputProps,
} from 'components/forms/FileButtonInput'
import {
  CameraFppIcon,
  CameraTavernIcon,
  CameraTreasureIcon,
  DeleteIcon,
  HideIcon,
  ImageAnalyzerIcon,
  ShowIcon,
  VideoTreasureIcon,
} from 'components/Icon'
import Popup from 'components/Popup'
import { SubTitle } from 'components/Title'
import { useImageAnalyzer } from 'hooks/useImageAnalyzer'
import { ExtendedUnit } from 'models/units'
import { useEffect, useRef, useState } from 'react'
import { Analysis, AnalysisType } from 'services/image-cv-worker'
import { CanvasRenderer } from './components/CanvasRenderer'

export type ImageAnalyzerProps = {
  onCharacterSelected?: (ids: number[]) => void
}
export function ImageAnalyzer({ onCharacterSelected }: ImageAnalyzerProps) {
  const characterSelectionPanelRef = useRef<HTMLDivElement>(null)
  const analysisSelectionPanelRef = useRef<HTMLButtonElement>(null)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [showFound, setShowFound] = useState<boolean>(true)
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
    currentVideoRef,
    reset,
    removeFound,
    removeAnalysis,
  } = useImageAnalyzer()

  useEffect(() => {
    // update display when analysis change
    setCurrentlyDisplayed(currentAnalysis)
  }, [currentAnalysis])

  useEffect(() => {
    // autoscroll when a found is added
    if (characterSelectionPanelRef.current && isAnalysisInProgress) {
      characterSelectionPanelRef.current.scrollTo({
        left: characterSelectionPanelRef.current.scrollWidth,
        behavior: 'smooth',
      })
    }
  }, [currentAnalysis?.founds, isAnalysisInProgress])

  useEffect(() => {
    // autoscroll when selected analysis change
    analysisSelectionPanelRef.current
      ?.querySelector(':disabled')
      ?.scrollIntoView({
        inline: 'center',
        behavior: 'smooth',
      })
  }, [currentlyDisplayed?.id])

  return (
    <>
      <Button
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
              {ImporterType.map(({ analysisType, ...it }) => (
                <FileButtonInput
                  key={analysisType}
                  onFiles={files => process(analysisType, files)}
                  {...it}
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
            <Box
              display="flex"
              overflowX="auto"
              ref={analysisSelectionPanelRef}
            >
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
            {!currentlyDisplayed && (
              <Box display="grid" gridTemplateColumns="1fr 1fr">
                {ImporterType.map(({ analysisType, ...it }) => (
                  <FileButtonInput
                    key={analysisType}
                    m="1"
                    fontSize="2"
                    size="4"
                    iconVariant="vertical"
                    onFiles={files => process(analysisType, files)}
                    {...it}
                  >
                    {it.title}
                  </FileButtonInput>
                ))}
              </Box>
            )}
            <CanvasRenderer
              analysis={currentlyDisplayed}
              showFound={showFound}
              onFoundClick={removeFound}
            />
            <video
              ref={currentVideoRef}
              controls
              muted
              style={{ display: 'none' }}
            />
            {currentlyDisplayed?.done && (
              <Box display="flex" justifyContent="space-around" m="2">
                <Button
                  fontSize="2"
                  icon={DeleteIcon}
                  onClick={() => {
                    const oldIndex = analyses.findIndex(
                      a => a.id === currentlyDisplayed.id,
                    )
                    const nextAnalysis =
                      analyses[oldIndex + 1] ?? analyses[oldIndex - 1]
                    removeAnalysis(currentlyDisplayed.id)
                    setCurrentlyDisplayed(nextAnalysis)
                  }}
                >
                  Delete analysis
                </Button>
                <Button
                  fontSize="2"
                  icon={showFound ? HideIcon : ShowIcon}
                  onClick={() => setShowFound(sf => !sf)}
                >
                  {showFound ? 'Hide founds' : 'Show founds'}
                </Button>
              </Box>
            )}
            <SubTitle my="2">{state}</SubTitle>
            <Box
              display="flex"
              overflowX="auto"
              ref={characterSelectionPanelRef}
            >
              {allFound
                .filter(f => !!f.unit)
                .map((f, i) => (
                  <CharacterBox
                    key={i}
                    unit={f.unit as ExtendedUnit}
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

const ImporterType: (Partial<FileButtonInputProps> & {
  analysisType: AnalysisType
})[] = [
  {
    analysisType: 'box-video',
    accept: '.mp4',
    title: '(Experimental) Import Box videos',
    icon: VideoTreasureIcon,
  },
  {
    analysisType: 'box',
    accept: '.jpg,.png',
    title: 'Import Box screenshots',
    icon: CameraTreasureIcon,
    multiple: true,
  },
  {
    analysisType: 'fpp',
    accept: '.jpg,.png',
    title: 'Import Friend Point Pull screenshots',
    icon: CameraFppIcon,
    multiple: true,
  },
  {
    analysisType: 'tavern',
    accept: '.jpg,.png',
    title: 'Import Tavern screenshots',
    icon: CameraTavernIcon,
    multiple: true,
  },
  {
    analysisType: 'generic',
    accept: '.jpg,.png',
    title: 'Import screenshots - Generic Square',
    icon: ImageAnalyzerIcon,
    multiple: true,
  },
]
