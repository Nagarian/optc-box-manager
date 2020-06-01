import React, { InputHTMLAttributes, ReactNode } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  display: none;

  + * {
    transition: filter 150ms;
    filter: grayscale(1);
  }

  :checked + * {
    filter: none;
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
    <label>
      <Input type={type} {...rest} />
      {children}
    </label>
  )
}
