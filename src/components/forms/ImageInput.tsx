import styled from '@emotion/styled'
import { InputHTMLAttributes, ReactNode } from 'react'

const Input = styled.input`
  appearance: initial;
  width: 0;
  height: 0;
  position: absolute;
  left: -9999px;

  + * {
    transition: filter 150ms;
    filter: grayscale(1);
  }

  :checked + * {
    filter: none;
  }
`
const Label = styled.label`
  display: inline-flex;
  position: relative;

  :focus-within {
    filter: drop-shadow(0 0 1rem ${p => p.theme.colors.grey});
  }
`

export type ImageInputProps = InputHTMLAttributes<HTMLInputElement> & {
  type: 'checkbox' | 'radio'
  children: ReactNode
}
export function ImageInput({ type, children, ...rest }: ImageInputProps) {
  return (
    <Label>
      <Input type={type} {...rest} />
      {children}
    </Label>
  )
}
