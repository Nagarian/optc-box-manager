import { keyframes } from 'styled-components'

export const BounceIn = keyframes`
  0% {
    transform: scale3d(0.3, 0.3, 0.3);
  }

  33% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  66% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`

export const FadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

export const SlideInRight = keyframes`
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
`
