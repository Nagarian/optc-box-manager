import Button from 'components/Button'
import { SubTitle } from 'components/Title'
import React, { ReactNode } from 'react'

type FilterContainerProps = {
  title: string
  children: ReactNode
  onReset: () => void
}

export default function FilterContainer ({
  title,
  children,
  onReset,
}: FilterContainerProps) {
  return (
    <div>
      <SubTitle>{title}</SubTitle>
      <Button onClick={onReset}>Reset</Button>
      {children}
    </div>
  )
}
