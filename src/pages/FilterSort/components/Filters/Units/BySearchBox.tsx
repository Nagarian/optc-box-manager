import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import { SearchFilterCriteria, SearchFilterCriteriaInputProps } from 'models/search'
import { ExtendedUnit } from 'models/units'
import React from 'react'
import styled from 'styled-components'
import { SpaceProps } from 'styled-system'

export interface BySearchBoxCriteria extends SearchFilterCriteria {
  value: string
}

export const BySearchBoxFilter = (criteria: BySearchBoxCriteria) => (
  unit: ExtendedUnit,
) =>
  unit.name.toLowerCase().includes(criteria.value.toLowerCase()) ||
  unit.id.toString().startsWith(criteria.value)

export function BySearchBoxInput ({
  criteria,
  onChange,
  ...rest
}: SearchFilterCriteriaInputProps<BySearchBoxCriteria> & SpaceProps) {
  const triggerChange = (value?: string) => {
    const cleaned = (value ?? '').trim()
    const payload = cleaned
      ? {
        value: cleaned,
      }
      : undefined

    onChange(payload)
  }

  return (
    <Box display="flex" flexDirection="column" m="2" {...rest}>
      <Input
        type="search"
        name="search-box"
        value={criteria?.value ?? ''}
        onChange={e => triggerChange(e.target.value)}
        placeholder="Character name or ID"
        {...rest}
      />
    </Box>
  )
}

const Input = styled.input<SpaceProps>`
  padding: ${themeGet('space.1')};
  font-size: ${themeGet('fontSizes.1')};
  border-bottom: solid ${themeGet('colors.grey')} thin;
  border-radius: 0;
  transition: border-color 250ms;

  :focus {
    border-color: ${themeGet('colors.primary')};
  }
`
