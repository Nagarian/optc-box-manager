import { Box } from 'components/Box'
import { DescriptionHighlighter } from 'components/DescriptionHighlighter'
import { Progression } from 'components/Progression'
import { SubTitle } from 'components/Title'
import { ReactNode } from 'react'

type InputLabelProps = {
  value: number
  max: number
  name: ReactNode
  descriptions?: string[] | ReactNode[]
  children?: ReactNode
}

export function InputLabel({
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
              originalDiff={
                typeof descriptions[descriptions.length - 2] === 'string' &&
                (value === max || max === 2)
                  ? (descriptions[descriptions.length - 2] as string)
                  : undefined
              }
            />
          </div>
        )}

        {descriptions &&
          descriptions.length > 1 &&
          value > 0 &&
          value < max && (
            <Box mt="2">
              <strong>Level {value}: </strong>
              <DescriptionHighlighter
                value={descriptions[value - 1]}
                originalDiff={
                  typeof descriptions[value - 2] === 'string'
                    ? (descriptions[value - 2] as string)
                    : undefined
                }
              />
            </Box>
          )}
      </Box>
      {children}
    </Box>
  )
}
