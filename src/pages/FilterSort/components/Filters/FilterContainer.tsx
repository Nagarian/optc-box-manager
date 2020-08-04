import Box from 'components/Box'
import Button from 'components/Button'
import { SubTitle } from 'components/Title'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

type FilterContainerProps = {
  title: string
  children: ReactNode
  disableReset: boolean
  onReset: () => void
}

export default function FilterContainer ({
  title,
  children,
  disableReset,
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
        <SubTitle textAlign="left">{title}</SubTitle>
        <Button
          onClick={onReset}
          disabled={disableReset}
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

export const FilterContainerPanel = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 45rem;
`
