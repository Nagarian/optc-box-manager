import { Box } from 'components/Box'
import { ExpansionPanel } from 'components/ExpansionPanel'
import { ChoiceInput } from 'components/forms/ChoiceInput'
import { ArrowIcon } from 'components/Icon'
import { Text } from 'components/Title'
import { useThemeMode } from 'hooks/useThemeMode'

export function ThemeChooser() {
  const { themeMode, setThemeMode } = useThemeMode()

  return (
    <ExpansionPanel title="Theme" icon={ArrowIcon}>
      <Text my="2">Choose the theme you want to use</Text>
      <Box my="2" display="flex" placeContent="space-around">
        <ChoiceInput
          type="radio"
          name="themeMode"
          checked={themeMode === 'auto'}
          onChange={e => setThemeMode('auto')}
        >
          {'Auto (defined by system)'}
        </ChoiceInput>
        <ChoiceInput
          type="radio"
          name="themeMode"
          checked={themeMode === 'light'}
          onChange={e => setThemeMode('light')}
        >
          {'Light ☀'}
        </ChoiceInput>
        <ChoiceInput
          type="radio"
          name="themeMode"
          checked={themeMode === 'dark'}
          onChange={e => setThemeMode('dark')}
        >
          {'Dark 🌙'}
        </ChoiceInput>
      </Box>
    </ExpansionPanel>
  )
}
