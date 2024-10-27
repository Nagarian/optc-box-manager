import styled from '@emotion/styled'
import { Box } from 'components/Box'
import { ChoiceInput } from 'components/forms/ChoiceInput'
import { Fragment } from 'react/jsx-runtime'
import { FilterContainer } from '../Filters/FilterContainer'
import { SearchDisplayerBuilder, SearchDisplayerCriteria } from '.'

export type DisplayerProps = {
  searchDisplayer?: SearchDisplayerCriteria
  onChange: (criteria?: SearchDisplayerCriteria) => void
}
export function Displayer({ searchDisplayer, onChange }: DisplayerProps) {
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
        {Object.values(SearchDisplayerBuilder).map(
          ({ key, label, input: OptionComponent }) => (
            <Fragment key={key}>
              <ChoiceInput
                type="radio"
                checked={searchDisplayer?.type === key}
                name="displayer-type"
                onChange={() =>
                  onChange({
                    type: key,
                  })
                }
              >
                {label}
              </ChoiceInput>

              {OptionComponent && searchDisplayer?.type === key && (
                <OptionComponent
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                  options={searchDisplayer.options as any}
                  onChange={options =>
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    onChange({
                      type: key,
                      options,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any)
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
