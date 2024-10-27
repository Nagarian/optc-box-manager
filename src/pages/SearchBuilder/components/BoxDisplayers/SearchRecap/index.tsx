import styled from '@emotion/styled'
import Box from 'components/Box'
import { PropsWithChildren } from 'react'
import { SearchFilterUnitsType, UnitFilterBuilder } from '../../Filters/Units'
import {
  SearchFilterUserUnitsType,
  UserUnitFilterBuilder,
} from '../../Filters/UserUnits'
import { SearchBoxDisplayerProps } from '..'
import { SearchSortBoxDisplayer } from './SearchSortBoxDisplayer'

export function SearchRecap({ search }: SearchBoxDisplayerProps) {
  if (!search) {
    return undefined
  }

  const {
    filters: { units, userUnits },
    sorts,
  } = search

  return (
    <Outer>
      <Inner>
        <Box display="flex" flexDirection="column" gap="2" padding="2">
          <Section title="Unit Filter">
            {units &&
              Object.entries(units).map(([key, crit]) => {
                const Component =
                  UnitFilterBuilder[key as SearchFilterUnitsType].boxDisplayer
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                return <Component key={key} criteria={crit as unknown as any} />
              })}
          </Section>
          <Section title="User Unit Filter">
            {userUnits &&
              Object.entries(userUnits).map(([key, crit]) => {
                const Component =
                  UserUnitFilterBuilder[key as SearchFilterUserUnitsType]
                    .boxDisplayer
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
                return <Component key={key} criteria={crit as unknown as any} />
              })}
          </Section>
          <Section title="Sort">
            {sorts.map((sort, i) => (
              <SearchSortBoxDisplayer
                key={sort.by + i.toString()}
                criteria={sort}
              />
            ))}
          </Section>
        </Box>
      </Inner>
    </Outer>
  )
}

const Inner = styled(Box)`
  transform: rotateX(180deg);
  height: 100%;
  width: 100%;
`

const Outer = styled(Inner)`
  resize: vertical;
  overflow-y: auto;
  min-height: ${p => p.theme.sizes[3]};
  max-height: 50vh;
`

type SectionProps = {
  title: string
}
function Section({ title, children }: PropsWithChildren<SectionProps>) {
  if (!children || (Array.isArray(children) && children.length == 0)) {
    return undefined
  }

  return (
    <>
      <Box as="p">{title}</Box>
      <Box
        display="flex"
        flexWrap="wrap"
        paddingLeft="2"
        rowGap="2"
        columnGap="3"
      >
        {children}
      </Box>
    </>
  )
}
