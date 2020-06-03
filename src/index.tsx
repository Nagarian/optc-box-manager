import PWA from 'components/PWA'
import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import App from './App'
import DefaultStyles from './styles'
import theme from './styles/theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <DefaultStyles />
      <App />
      <PWA />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
