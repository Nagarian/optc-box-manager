import PWA from 'components/PWA'
import { useThemeMode } from 'hooks/useThemeMode'
import { UserSettingsProvider } from 'hooks/useUserSettings'
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import App from './App'
import DefaultStyles from './styles'
import { darkTheme, lightTheme } from './styles/theme'

ReactDOM.render(
  <React.StrictMode>
    <UserSettingsProvider>
      <AppWrapper />
    </UserSettingsProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

function AppWrapper () {
  const { currentTheme } = useThemeMode()

  return (
    <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
      <DefaultStyles />
      <App />
      <PWA />
    </ThemeProvider>
  )
}
