import Box from 'components/Box'
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
    <Box padding="2" borderTop="solid medium" borderTopColor="primary">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="2"
      >
        <SubTitle>{title}</SubTitle>
        <Button
          onClick={onReset}
          fontSize="1"
          borderWidth="medium"
          variant="secondary"
        >
          Clear
        </Button>
      </Box>
      {children}
    </Box>
  )
}
