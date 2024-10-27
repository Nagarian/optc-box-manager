import styled from '@emotion/styled'
import Button from 'components/Button'
import {
  AscendingIcon,
  ClearIcon,
  DescendingIcon,
  SettingsIcon,
} from 'components/Icon'
import Popup from 'components/Popup'
import { Text } from 'components/Title'
import { SearchOptionInputProps } from 'models/search'
import { FunctionComponent, useState } from 'react'
import { SearchSortBuilder, SearchSortCriteria } from '..'

export type SearchSortItemProps = {
  criteria: SearchSortCriteria
  onUpdate: (
    oldCriteria: SearchSortCriteria,
    newCriteria: SearchSortCriteria,
  ) => void
  onDelete: (criteria: SearchSortCriteria) => void
}

export default function SearchSortItem({
  criteria,
  onUpdate,
  onDelete,
}: SearchSortItemProps) {
  const {
    label,
    input: optionInput,
    optionedLabel,
  } = SearchSortBuilder[criteria.by]
  const [showSetting, setShowSetting] = useState<boolean>(false)
  const { options } = criteria
  return (
    <>
      <Panel>
        <Text flex="1" fontSize="2" display="inline-flex" alignItems="center">
          {label}
          {options && optionedLabel && (
            <>
              {' - '}
              {optionedLabel(options as unknown as undefined)}
            </>
          )}
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          optionInput={optionInput as any}
          onValidate={options => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            onUpdate(criteria, {
              ...criteria,
              options,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any)
            setShowSetting(false)
          }}
        />
      )}
    </>
  )
}

const Panel = styled.div`
  display: flex;
  align-items: center;
  padding: ${p => p.theme.space[1]};
  flex-wrap: wrap;
  justify-content: flex-end;
  flex: 0 0 auto;

  :nth-of-type(odd) {
    background-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.primaryText};
  }

  > * {
    margin: ${p => p.theme.space[1]};
  }
`

type OptionPopupProps<T> = {
  options: T
  optionInput: FunctionComponent<SearchOptionInputProps<T>>
  onCancel: () => void
  onValidate: (options?: T) => void
}

function OptionPopup<T>({
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
