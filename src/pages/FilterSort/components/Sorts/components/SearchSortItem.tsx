import { themeGet } from '@styled-system/theme-get'
import Button from 'components/Button'
import {
  AscendingIcon,
  CancelIcon,
  DescendingIcon,
  SettingsIcon,
} from 'components/Icon'
import { Text } from 'components/Title'
import { SearchSortCriteria } from 'models/search'
import React, { useState } from 'react'
import styled from 'styled-components'
import Popup from 'components/Popup'
import { SearchSortBuilderProps } from '..'

const Panel = styled.div`
  display: flex;
  align-items: center;
  padding: ${themeGet('space.1')};
  flex-wrap: wrap;
  justify-content: flex-end;

  :nth-child(odd) {
    background-color: ${themeGet('colors.primary')};
    color: ${themeGet('colors.primaryText')};
  }

  > * {
    margin: ${themeGet('space.1')};
  }
`

export type SearchSortItemProps<T = unknown | undefined> = {
  criteria: SearchSortCriteria<T>
  sortBuilder: SearchSortBuilderProps<T>
  onUpdate: (
    oldCriteria: SearchSortCriteria,
    newCriteria: SearchSortCriteria,
  ) => void
  onDelete: (criteria: SearchSortCriteria) => void
}

export default function SearchSortItem ({
  criteria,
  sortBuilder: { label, optionInput: OptionComponent, optionedLabel },
  onUpdate,
  onDelete,
}: SearchSortItemProps) {
  const [showSetting, setShowSetting] = useState<boolean>(false)
  const [options, setOptions] = useState<any>(criteria.options)

  return (
    <>
      <Panel>
        <Text flex="1" fontSize="2" display="inline-flex" alignItems="center">
          {label}
          {options && optionedLabel && (
            <>
              {' - '}
              {optionedLabel(options)}
            </>
          )}
        </Text>

        {OptionComponent && (
          <Button
            title="Setting"
            icon={SettingsIcon}
            onClick={() => setShowSetting(true)}
          />
        )}

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

      {OptionComponent && showSetting && (
        <Popup
          title="Sort Options"
          onCancel={() => setShowSetting(false)}
          onValidate={() => {
            onUpdate(criteria, {
              ...criteria,
              options,
            })
            setShowSetting(false)
          }}
          customAction={
            <Button
              onClick={() => {
                setOptions(undefined)
                onUpdate(criteria, {
                  ...criteria,
                  options: undefined,
                })
                setShowSetting(false)
              }}
              variant="danger"
            >
              Clear
            </Button>
          }
        >
          <OptionComponent
            options={options}
            onChange={options => setOptions(options)}
          />
        </Popup>
      )}
    </>
  )
}
