import { themeGet } from '@styled-system/theme-get'
import React, { InputHTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  width: 0;
  height: 0;

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
    filter: drop-shadow(0 0 1rem ${themeGet('grey')});
  }
`

export type ImageInputProps = InputHTMLAttributes<HTMLInputElement> & {
  type: 'checkbox' | 'radio'
  children: ReactNode
}
export default function ImageInput ({
  type,
  children,
  ...rest
}: ImageInputProps) {
  return (
    <Label>
      <Input type={type} {...rest} />
      {children}
    </Label>
  )
}