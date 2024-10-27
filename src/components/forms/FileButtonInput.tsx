import { Button, ButtonProps } from 'components/Button'
import { useRef } from 'react'

export type FileButtonInputProps = ButtonProps & {
  accept?: string
  multiple?: boolean
  onFiles: (files: File[]) => void
}
export function FileButtonInput({
  accept,
  multiple,
  onFiles,
  ...buttonProps
}: FileButtonInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        multiple={multiple}
        ref={inputRef}
        onChange={({ target: { files } }) => files && onFiles([...files])}
      />
      <Button
        {...buttonProps}
        onClick={() => {
          if (!inputRef.current) {
            return
          }

          inputRef.current.value = ''
          inputRef.current.click()
        }}
      />
    </>
  )
}
