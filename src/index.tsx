import PWA from 'components/PWA'
import { OptcDbProvider } from 'hooks/useOptcDb'
import { useThemeMode } from 'hooks/useThemeMode'
import { UserSettingsProvider } from 'hooks/useUserSettings'
import DevMode from 'pages/DevMode'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import App from './App'
import DefaultStyles from './styles'
import { darkTheme, lightTheme } from './styles/theme'

ReactDOM.render(
  <StrictMode>
    <UserSettingsProvider>
      <OptcDbProvider>
        <AppWrapper />
      </OptcDbProvider>
    </UserSettingsProvider>
  </StrictMode>,
  document.getElementById('root'),
)

function AppWrapper () {
  const { currentTheme } = useThemeMode()

  return (
    <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
      <DefaultStyles />
      <DevMode>
        <App />
      </DevMode>
      <PWA />
    </ThemeProvider>
  )
}
