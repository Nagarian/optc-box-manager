import styled from '@emotion/styled'
import Box from 'components/Box'
import Button from 'components/Button'
import { ClearIcon } from 'components/Icon'
import { SubTitle } from 'components/Title'
import { ReactNode } from 'react'

type FilterContainerProps = {
  title: string
  children: ReactNode
  customAction?: ReactNode
  disableReset: boolean
  onReset: () => void
}

export default function FilterContainer({
  title,
  children,
  customAction,
  disableReset,
  onReset,
}: FilterContainerProps) {
  return (
    <Box padding="2" borderTop="solid" borderWidth="thin" borderTopColor="text">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="2"
      >
        <SubTitle textAlign="left" flex="1">
          {title}
        </SubTitle>
        {customAction}
        <Button
          onClick={onReset}
          disabled={disableReset}
          fontSize="1"
          variant="secondary"
          icon={ClearIcon}
          title="Clear"
          ml="2"
        />
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
