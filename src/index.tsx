import PWA from 'components/PWA'
import { UserSettingsProvider } from 'hooks/useUserSettings'
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import App from './App'
import DefaultStyles from './styles'
import theme from './styles/theme'

ReactDOM.render(
  <React.StrictMode>
    <UserSettingsProvider>
      <ThemeProvider theme={theme}>
        <DefaultStyles />
        <App />
        <PWA />
      </ThemeProvider>
    </UserSettingsProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
