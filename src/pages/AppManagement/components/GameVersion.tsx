import { useTheme } from '@emotion/react'
import { Box } from 'components/Box'
import { ExpansionPanel } from 'components/ExpansionPanel'
import { ChoiceInput } from 'components/forms/ChoiceInput'
import { RangeInput } from 'components/forms/RangeInput'
import { ArrowIcon, SettingsSvg } from 'components/Icon'
import { Text } from 'components/Title'
import { useUserSettings } from 'hooks/useUserSettings'
import { InputLabel } from 'pages/Detail/components'

export function GameVersion() {
  const { userSetting, setUserSetting } = useUserSettings()
  const theme = useTheme()

  return (
    <ExpansionPanel title="Game version / Image Analyzer" icon={ArrowIcon}>
      <Text my="2">
        Choose the game version you want to use. It will be used by Image
        Analyzer
      </Text>
      <Box my="2" display="flex" placeContent="space-around">
        <ChoiceInput
          type="radio"
          name="gameVersion"
          checked={userSetting.gameVersion === 'global'}
          onChange={e =>
            setUserSetting({
              ...userSetting,
              gameVersion: 'global',
            })
          }
        >
          Global
        </ChoiceInput>
        <ChoiceInput
          type="radio"
          name="gameVersion"
          checked={userSetting.gameVersion === 'japan'}
          onChange={e =>
            setUserSetting({
              ...userSetting,
              gameVersion: 'japan',
            })
          }
        >
          Japan
        </ChoiceInput>
      </Box>

      <Box
        my="2"
        gap="2"
        // display="flex"
        placeContent="space-around"
        display="grid"
        gridAutoFlow=""
      >
        <Text>
          Image Analyzer use a recognition system based on OpenCV. You can
          adjust the minimum confidence level for character recognition. By
          default, it is set to 80%. If you want to increase the recognition
          accuracy, you can increase this value, but it may result in some
          characters not being recognized. If you want to recognize all
          characters, you can decrease this value but it may lead to
          misrecognition.
        </Text>
        <InputLabel
          value={userSetting.imageAnalyzer.minConfidence * 100}
          max={100}
          name="Confidence level"
        >
          <RangeInput
            name="imageAnalyzer.minConfidence"
            min={0}
            max={100}
            value={userSetting.imageAnalyzer.minConfidence * 100}
            thumbSvg={SettingsSvg}
            range={{
              color: theme.colors.primaryText,
            }}
            onChange={e =>
              setUserSetting({
                ...userSetting,
                imageAnalyzer: {
                  ...userSetting.imageAnalyzer,
                  minConfidence: Number(e.target.value) / 100,
                },
              })
            }
          />
        </InputLabel>
      </Box>
    </ExpansionPanel>
  )
}
