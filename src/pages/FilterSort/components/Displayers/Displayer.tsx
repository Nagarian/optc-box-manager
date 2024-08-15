import styled from '@emotion/styled'
import Box from 'components/Box'
import ChoiceInput from 'components/forms/ChoiceInput'
import { Fragment } from 'react/jsx-runtime'
import FilterContainer from '../Filters/FilterContainer'
import {
  SearchDisplayerBuilder,
  SearchDisplayerCriteria,
  UserUnitDisplayerTypeKeys,
} from '.'

export type DisplayerProps = {
  searchDisplayer?: SearchDisplayerCriteria
  onChange: (criteria?: SearchDisplayerCriteria) => void
}
export default function Displayer({
  searchDisplayer,
  onChange,
}: DisplayerProps) {
  const OptionComponent =
    searchDisplayer && SearchDisplayerBuilder[searchDisplayer.type].input

  return (
    <FilterContainer
      title="Unit displayer"
      disableReset={!searchDisplayer}
      onReset={() => onChange(undefined)}
    >
      <Panel
        display="flex"
        flexDirection="column"
        alignContent="flex-start"
        gap="2"
      >
        {UserUnitDisplayerTypeKeys.map(displayerType => (
          <Fragment key={displayerType}>
            <ChoiceInput
              type="radio"
              checked={searchDisplayer?.type === displayerType}
              name="displayer-type"
              onChange={() =>
                onChange({
                  type: displayerType,
                })
              }
            >
              {SearchDisplayerBuilder[displayerType].label}
            </ChoiceInput>

            {OptionComponent &&
              searchDisplayer &&
              searchDisplayer.type === displayerType && (
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
          </Fragment>
        ))}
      </Panel>
    </FilterContainer>
  )
}

const Panel = styled(Box)`
  > div {
    margin: ${p => p.theme.space[1]} ${p => p.theme.space[3]};
  }
`
