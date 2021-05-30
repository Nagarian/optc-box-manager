import styled from '@emotion/styled'
import { ImageInputProps } from './ImageInput'

export default function ChoiceInput ({
  children,
  ...rest
}: ImageInputProps) {
  return (
    <Label>
      <input {...rest} />
      <span>
        {children}
      </span>
    </Label>
  )
}

const Label = styled.label`
  margin: 0.2rem;

  input {
    margin-right: 0.4rem;
  }
`
