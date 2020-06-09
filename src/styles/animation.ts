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
