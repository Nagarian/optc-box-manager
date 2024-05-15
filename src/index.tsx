import { ThemeProvider } from '@emotion/react'
import { OptcDbProvider } from 'hooks/useOptcDb'
import { useThemeMode } from 'hooks/useThemeMode'
import { UserSettingsProvider } from 'hooks/useUserSettings'
import DevMode from 'pages/DevMode'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import DefaultStyles from './styles'
import { darkTheme, lightTheme } from './styles/theme'

const container = createRoot(document.getElementById('root')!)

container.render(
  <StrictMode>
    <UserSettingsProvider>
      <OptcDbProvider>
        <AppWrapper />
      </OptcDbProvider>
    </UserSettingsProvider>
  </StrictMode>,
)

function AppWrapper () {
  const { currentTheme } = useThemeMode()

  return (
    <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
      <DefaultStyles />
      <DevMode>
        <App />
      </DevMode>
    </ThemeProvider>
  )
}
