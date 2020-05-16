const baseColors = {
  black: '#323232',
  white: '#FFF',
  grey: '#BFBFBF',
  greys: ['#CCCCCC', '#808080', '#8C8C8C', '#666666'],
  green: '#7FCA9F',
  blue: '#85C1F5',
  red: '#E96D63',
  purple: '#DA70D6',
  yellow: '#F4BA70',
  pink: '#DEA5A4',
  brown: '#993300',
  darkpurple: '#7D3C98',
  gold: '#B38F15',
  darkblue: '#183578',
  limegreen: '#32CD32',
}

const orbColors = {
  STR: 'salmon',
  QCK: 'lightskyblue',
  DEX: 'lightgreen',
  PSY: 'gold',
  INT: 'orchid',

  RCV: 'darkgoldenrod',
  TND: 'peru',
  BLOCK: 'darkslateblue',
  BOMB: 'maroon',
  WANO: 'firebrick',
  SEMLA: 'saddlebrown',
  RAINBOW: 'linear-gradient(90deg,#fa8072,#ffd700,#90ee90,#87cefa, #da70d6)',
  G: 'orange',
  EMPTY: '#777',
}

const fontSizes: any = [12, 14, 16, 20, 24, 32]
fontSizes.body = fontSizes[2]
fontSizes.title = fontSizes[5]
fontSizes.subtitle = fontSizes[4]

const space: any = [0, 4, 8, 16, 32]
space.small = space[1]
space.medium = space[2]
space.large = space[3]

const breakpoints: any = [768, 970, 1024]
breakpoints.minimalRequired = '320px'

export default {
  colors: {
    ...baseColors,
    primary: '',
    secondary: '',
    background: baseColors.white,
    text: baseColors.black,
    orbColors,
  },
  fontSizes,
  space,

  breakpoints,
  mediaQueries: {
    tablet: `@media screen and (min-width: ${breakpoints[0]}px)`,
    desktop: `@media screen and (min-width: ${breakpoints[1]}px)`,
    largeDesktop: `@media screen and (min-width: ${breakpoints[2]}px)`,
  },
  zIndices: {
    highlight: 1,
    menu: 10,
    popin: 20,
  },
}
