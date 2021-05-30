import { css, Global, useTheme } from '@emotion/react'

export function FontCss () {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        html {
          font-family: 'Open Sans', Arial, sans-serif;
          /* set base font-size to equiv "10px", which is adapted to rem unit */
          font-size: 62.5%;
          /* IE9-IE11 math fixing. See http://bit.ly/1g4X0bX */
          /* thanks to @guardian, @victorbritopro and @eQRoeil */
          /* add +0% so IE keep calc() method after build*/
          font-size: calc(1em * 0.625 + 0%);

          /* disallow text zooming on orientation change (non standard property) */
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }

        body {
          font-size: 1.2rem;
          color: ${theme.colors.text};
        }
      `}
    />
  )
}
