import Box from 'components/Box'
import Progression from 'components/Progression'
import { SubTitle } from 'components/Title'
import React, { ReactNode } from 'react'
import DescriptionHighlighter from 'components/DescriptionHighlighter'

type InputLabelProps = {
  value: number
  max: number
  name: ReactNode
  descriptions?: string[] | ReactNode[]
  children?: ReactNode
}

export function InputLabel ({
  name,
  descriptions,
  value,
  max,
  children,
}: InputLabelProps) {
  return (
    <Box display="flex" flexDirection="column">
      <Box my="2">
        <SubTitle fontSize="1" marginBottom="2">
          <DescriptionHighlighter value={name} /> (
          <Progression value={value} max={max} variant="spaced" />)
        </SubTitle>

        {descriptions && (
          <div>
            {descriptions.length > 1 && <strong>max: </strong>}
            <DescriptionHighlighter
              value={descriptions[descriptions.length - 1]}
            />
          </div>
        )}

        {descriptions && descriptions.length > 1 && value > 0 && value < max && (
          <div>
            <strong>Level {value}: </strong>
            <DescriptionHighlighter value={descriptions[value - 1]} />
          </div>
        )}
      </Box>
      {children}
    </Box>
  )
}
