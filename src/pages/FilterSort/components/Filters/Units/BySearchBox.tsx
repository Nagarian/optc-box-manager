import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import Button from 'components/Button'
import { CloseIcon } from 'components/Icon'
import {
  SearchFilterCriteria,
  SearchFilterCriteriaInputProps,
} from 'models/search'
import { ExtendedUnit } from 'models/units'
import React from 'react'
import styled from 'styled-components'
import { SpaceProps } from 'styled-system'
import { SlideInRight } from 'styles/animation'

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
    <Box display="grid" m="2" gridTemplateColumns="1fr auto" {...rest}>
      <Input
        type="search"
        name="search-box"
        value={criteria?.value ?? ''}
        onChange={e => triggerChange(e.target.value)}
        placeholder="Character name or ID"
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
  border-bottom: solid ${themeGet('colors.grey')} thin;
  border-radius: 0;
  transition: border-color 250ms;

  :focus {
    border-color: ${themeGet('colors.primary')};
  }
`

const ClearButton = styled(Button)`
  animation: ${SlideInRight} 250ms;
`
