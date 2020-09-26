import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import Button from 'components/Button'
import { CloseIcon } from 'components/Icon'
import {
  SearchFilterCriteria,
  SearchFilterCriteriaInputProps,
  UnitFilter,
} from 'models/search'
import React from 'react'
import styled from 'styled-components'
import { SpaceProps } from 'styled-system'
import { SlideInRight } from 'styles/animation'

export interface BySearchBoxCriteria extends SearchFilterCriteria {
  value: string
}

export const BySearchBoxFilter = (
  criteria: BySearchBoxCriteria,
): UnitFilter => {
  const searchValue = criteria.value.toLowerCase()

  if (searchValue.includes(',')) {
    const ids = searchValue
      .split(',')
      .map(v => parseInt(v))
      .filter(v => !isNaN(v))

    return unit => ids.includes(unit.id)
  }

  return unit =>
    unit.name.toLowerCase().includes(searchValue) ||
    unit.id.toString().startsWith(searchValue)
}

export function BySearchBoxInput ({
  criteria,
  onChange,
  ...rest
}: SearchFilterCriteriaInputProps<BySearchBoxCriteria> & SpaceProps) {
  const triggerChange = (value?: string) => {
    const cleaned = value ?? ''
    const payload = cleaned
      ? {
        value: cleaned,
      }
      : undefined

    onChange(payload)
  }

  return (
    <Box display="grid" m="2" gridTemplateColumns="1fr auto" {...rest}>
      <Input
        type="search"
        name="search-box"
        value={criteria?.value ?? ''}
        onChange={e => triggerChange(e.target.value)}
        onFocus={e => e.target.select()}
        placeholder="Character name or ID,ID,ID"
        {...rest}
        height="1"
      />
      {criteria?.value && (
        <ClearButton
          icon={CloseIcon}
          title="Clear Search"
          onClick={() => triggerChange()}
          size={0}
          marginLeft={1}
        />
      )}
    </Box>
  )
}

const Input = styled.input<SpaceProps>`
  padding: ${themeGet('space.1')};
  font-size: ${themeGet('fontSizes.1')};
  border-bottom: solid ${themeGet('colors.grey')} ${themeGet('borderWidths.thin')};
  border-radius: 0;
  transition: border-color 250ms;

  :focus {
    border-color: ${themeGet('colors.primary')};
  }
`

const ClearButton = styled(Button)`
  animation: ${SlideInRight} 250ms;
`
