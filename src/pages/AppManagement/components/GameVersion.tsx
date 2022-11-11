import Box from 'components/Box'
import ExpansionPanel from 'components/ExpansionPanel'
import ChoiceInput from 'components/forms/ChoiceInput'
import { ArrowIcon } from 'components/Icon'
import { Text } from 'components/Title'
import { useUserSettings } from 'hooks/useUserSettings'

export function GameVersion () {
  const { userSetting, setUserSetting } = useUserSettings()

  return (
    <ExpansionPanel title="Game version" icon={ArrowIcon}>
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
    </ExpansionPanel>
  )
}
