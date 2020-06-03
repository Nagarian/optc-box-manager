import { themeGet } from '@styled-system/theme-get'
import Button from 'components/Button'
import { AscendingIcon, CancelIcon, DescendingIcon } from 'components/Icon'
import { Text } from 'components/Title'
import { SearchSortCriteria } from 'models/search'
import React from 'react'
import styled from 'styled-components'

const Panel = styled.div`
  display: flex;
  align-items: center;
  padding: ${themeGet('space.1')};

  :nth-child(odd) {
    background-color: ${themeGet('colors.primary')};
    color: ${themeGet('colors.primaryText')};
  }

  > * {
    margin: ${themeGet('space.1')};
  }
`

export default function SearchSortItem ({
  criteria,
  label,
  onUpdate,
  onDelete,
}: {
  criteria: SearchSortCriteria
  label: string
  onUpdate: (
    oldCriteria: SearchSortCriteria,
    newCriteria: SearchSortCriteria,
  ) => void
  onDelete: (criteria: SearchSortCriteria) => void
}) {
  return (
    <Panel>
      <Text flex="1" fontSize="2">
        {label}
      </Text>
      <Button
        title={
          criteria.order === 'desc'
            ? 'Descending (click to reverse)'
            : 'Ascending (click to reverse)'
        }
        icon={criteria.order === 'desc' ? DescendingIcon : AscendingIcon}
        onClick={() =>
          onUpdate(criteria, {
            by: criteria.by,
            order: criteria.order === 'asc' ? 'desc' : 'asc',
          })
        }
      />
      <Button
        title="Remove"
        icon={CancelIcon}
        onClick={() => onDelete(criteria)}
      />
    </Panel>
  )
}
