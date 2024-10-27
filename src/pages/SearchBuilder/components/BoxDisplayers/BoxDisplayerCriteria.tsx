import styled from '@emotion/styled'
import Box from 'components/Box'
import ChoiceInput from 'components/forms/ChoiceInput'
import { Fragment } from 'react/jsx-runtime'
import FilterContainer from '../Filters/FilterContainer'
import { SearchBoxDisplayerBuilder, SearchBoxDisplayerCriteria } from '.'

export type BoxDisplayerProps = {
  searchBoxDisplayer?: SearchBoxDisplayerCriteria
  onChange: (criteria?: SearchBoxDisplayerCriteria) => void
}
export function BoxDisplayerCriteria({
  searchBoxDisplayer,
  onChange,
}: BoxDisplayerProps) {
  return (
    <FilterContainer
      title="Box Displayer"
      disableReset={!searchBoxDisplayer}
      onReset={() => onChange(undefined)}
    >
      <Panel
        display="flex"
        flexDirection="column"
        alignContent="flex-start"
        gap="2"
      >
        {Object.values(SearchBoxDisplayerBuilder).map(
          ({ key, label, input: OptionComponent }) => (
            <Fragment key={key}>
              <ChoiceInput
                type="radio"
                checked={searchBoxDisplayer?.type === key}
                name="box-displayer-type"
                onChange={() =>
                  onChange({
                    type: key,
                  })
                }
              >
                {label}
              </ChoiceInput>

              {OptionComponent && searchBoxDisplayer?.type === key && (
                <OptionComponent
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                  options={searchBoxDisplayer.options as any}
                  onChange={options =>
                    onChange({
                      type: searchBoxDisplayer.type,
                      options,
                    })
                  }
                />
              )}
            </Fragment>
          ),
        )}
      </Panel>
    </FilterContainer>
  )
}

const Panel = styled(Box)`
  > div {
    margin: ${p => p.theme.space[1]} ${p => p.theme.space[3]};
  }
`
