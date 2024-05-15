import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'
import Button from 'components/Button'
import {
  AscendingIcon,
  ClearIcon,
  DescendingIcon,
  SettingsIcon,
} from 'components/Icon'
import Popup from 'components/Popup'
import { Text } from 'components/Title'
import { SearchSortCriteria, SearchSortInputProps } from 'models/search'
import { FunctionComponent, useState } from 'react'
import { SearchSortBuilderProps } from '..'

const Panel = styled.div`
  display: flex;
  align-items: center;
  padding: ${themeGet('space.1')};
  flex-wrap: wrap;
  justify-content: flex-end;
  flex: 0 0 auto;

  :nth-of-type(odd) {
    background-color: ${themeGet('colors.primary')};
    color: ${themeGet('colors.primaryText')};
  }

  > * {
    margin: ${themeGet('space.1')};
  }
`

export type SearchSortItemProps<T = unknown> = {
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
  sortBuilder: { label, optionInput, optionedLabel },
  onUpdate,
  onDelete,
}: SearchSortItemProps) {
  const [showSetting, setShowSetting] = useState<boolean>(false)
  const { options } = criteria
  return (
    <>
      <Panel>
        <Text flex="1" fontSize="2" display="inline-flex" alignItems="center">
          <>
            {label}
            {options && optionedLabel && (
              <>
                {' - '}
                {optionedLabel(options)}
              </>
            )}
          </>
        </Text>

        {optionInput && (
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
          icon={ClearIcon}
          onClick={() => onDelete(criteria)}
        />
      </Panel>

      {optionInput && showSetting && (
        <OptionPopup
          onCancel={() => setShowSetting(false)}
          options={criteria.options}
          optionInput={optionInput}
          onValidate={options => {
            onUpdate(criteria, {
              ...criteria,
              options,
            })
            setShowSetting(false)
          }}
        />
      )}
    </>
  )
}

type OptionPopupProps<T = unknown> = {
  options: T
  optionInput: FunctionComponent<SearchSortInputProps<T>>
  onCancel: () => void
  onValidate: (options?: T) => void
}

function OptionPopup<T> ({
  onCancel,
  onValidate,
  options,
  optionInput: OptionComponent,
}: OptionPopupProps<T>) {
  const [opts, setOptions] = useState<T | undefined>(options)

  return (
    <Popup
      title="Sort Options"
      onCancel={onCancel}
      onValidate={() => onValidate(opts)}
      customAction={
        <Button onClick={() => onValidate(undefined)} variant="danger">
          Clear
        </Button>
      }
    >
      <OptionComponent options={opts} onChange={setOptions} />
    </Popup>
  )
}
