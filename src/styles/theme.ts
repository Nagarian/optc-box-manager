const baseColors = {
  black: '#323232',
  white: '#FFF',
  grey: '#BFBFBF',
  greys: ['#CCCCCC', '#808080', '#8C8C8C', '#666666'],

  red: '#E96D63',
  green: '#7FCA9F',
  blue: '#85C1F5',

  brown: '#47362a',
  orange: '#efaf55',

  // yellow: '#F4BA70',
  // pink: '#DEA5A4',
  // purple: '#DA70D6',
  // darkpurple: '#7D3C98',
  // gold: '#B38F15',
  // darkblue: '#183578',
  // limegreen: '#32CD32',
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

const specificColors = {
  ccAtk: '#fe7871',
  ccHp: '#fcb20f',
  ccRcv: '#7ef6ad',
  support: '#12b791',
  rainbow: `linear-gradient(
    160deg,
    #fff77d 0%,
    #eb504d 25%,
    #a350de 33%,
    #fff77d 50%,
    #eb504d 67%,
    #a350de 75%,
    #fff77d 100%
  )`,
  rainbowPlus: `linear-gradient(
    155deg,
    #fa8072,
    #da70d6,
    #90ee90,
    #87cefa,
    #ffd700,

    #fa8072,
    #da70d6,
    #90ee90,
    #87cefa,
    #ffd700,

    #fa8072,
    #da70d6,
    #90ee90,
    #87cefa,
    #ffd700,

    #fa8072,
    #da70d6,
    #90ee90,
    #87cefa,
    #ffd700
  )`,
}

type FontSizes = number[] & {
  body?: number
  title?: number
  subtitle?: number
}

const fontSizes: FontSizes = [12, 14, 16, 20, 24, 32]
fontSizes.body = fontSizes[2]
fontSizes.title = fontSizes[5]
fontSizes.subtitle = fontSizes[4]

const fontWeights: number[] = [400, 600]

const space: any = [0, '.4rem', '.8rem', '1.6rem', '3.2rem', '6.4rem']
space.small = space[1]
space.medium = space[2]
space.large = space[3]

const sizes: any = [
  '1rem',
  '2rem',
  '4rem',
  '6rem',
  '8rem',
  '10rem',
  '12rem',
  '14rem',
]
sizes.minimalRequired = '320px'

const breakpoints: any = ['768px', '970px', '1024px']

export default {
  colors: {
    ...baseColors,
    primary: baseColors.brown,
    secondary: baseColors.white,
    background: baseColors.white,
    text: baseColors.black,
    primaryText: baseColors.orange,
    secondaryText: baseColors.orange,
    orb: orbColors,
    specific: specificColors,
  },
  fontSizes,
  fontWeights,
  space,
  sizes,

  breakpoints,
  mediaQueries: {
    tablet: `@media screen and (min-width: ${breakpoints[0]})`,
    desktop: `@media screen and (min-width: ${breakpoints[1]})`,
    largeDesktop: `@media screen and (min-width: ${breakpoints[2]})`,
  },
  zIndices: {
    highlight: 1,
    menu: 10,
    popin: 20,
  },
  shadows: {
    small: '0 1px 4px rgba(0, 0, 0, .125)',
    normal: '0px 4px 8px 0px rgba(0, 0, 0, 0.1)',
  },

  buttons: {
    primary: {
      backgroundColor: 'primary',
      color: 'primaryText',
      '&:hover:enabled': {
        filter: 'opacity(0.5)',
      },
      ':disabled': {
        backgroundColor: 'grey',
        color: 'greys.1',
      },
    },
    secondary: {
      backgroundColor: 'secondary',
      color: 'secondaryText',
    },
    link: {
      background: 'none',
      color: 'primaryText',
      border: 'none',
    },
    danger: {
      backgroundColor: 'red',
      color: 'white',
      borderColor: 'red',
    },
  },
}
