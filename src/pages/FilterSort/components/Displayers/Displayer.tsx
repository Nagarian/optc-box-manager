import Box from 'components/Box'
import { Title } from 'components/Title'
import React from 'react'
import {
  SearchDisplayerBuilder,
  SearchDisplayerCriteria,
  UserUnitDisplayerTypeKeys,
} from '.'

export type DisplayerProps = {
  searchDisplayer?: SearchDisplayerCriteria
  onChange: (criteria?: SearchDisplayerCriteria) => void
}
export default function Displayer ({
  searchDisplayer,
  onChange,
}: DisplayerProps) {
  const OptionComponent =
    searchDisplayer && SearchDisplayerBuilder[searchDisplayer.type].input

  return (
    <Box display="flex" flexDirection="column">
      <Title>Info Displayed</Title>
      <hr />
      <label>
        <input
          type="radio"
          checked={!searchDisplayer}
          name="displayer-type"
          onChange={() => onChange(undefined)}
        />
        None
      </label>
      {UserUnitDisplayerTypeKeys.map(displayerType => (
        <label key={displayerType}>
          <input
            type="radio"
            checked={searchDisplayer?.type === displayerType ?? false}
            name="displayer-type"
            onChange={() =>
              onChange({
                type: displayerType,
              })
            }
          />
          {SearchDisplayerBuilder[displayerType].label}
        </label>
      ))}
      {OptionComponent && searchDisplayer && (
        <OptionComponent
          options={searchDisplayer.options}
          onChange={options =>
            onChange({
              type: searchDisplayer.type,
              options,
            })
          }
        />
      )}
    </Box>
  )
}
