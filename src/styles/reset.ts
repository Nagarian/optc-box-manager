import { themeGet } from '@styled-system/theme-get'
import { createGlobalStyle } from 'styled-components'

export const ResetCss = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: inherit;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section, main {
  display: block;
}

html {
  box-sizing: border-box;
  overscroll-behavior: none;
}
*, *:before, *:after {
  box-sizing: inherit;
}

body {
  overscroll-behavior: none;
  line-height: normal;
  min-width: ${themeGet('breakpoints.minimalRequired')};
  background-color: ${themeGet('colors.background')};
}

ul {
  list-style: none;
}

strong, b {
  font-weight: bold;
}

em, i {
  font-style: italic;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

a {
  color: ${themeGet('colors.secondaryText')};
}

hr {
  width: 100%;
  height: 0.2rem;
  background: ${themeGet('colors.greys.1')};
  border-radius: .7rem;
  border: none;
}

::-webkit-scrollbar {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  border: .2rem solid transparent;
  background-clip: padding-box;

  border-radius: 1.5rem;
  background-color: ${themeGet('colors.popupBackground')}26;

  &:hover {
    background-color: ${themeGet('colors.popupBackground')}4D;
  }
}

::-ms-clear {
  display:none;
}
`
