import styled from '@emotion/styled'
import { Box } from 'components/Box'
import { AscendingIcon, DescendingIcon } from 'components/Icon'
import { SearchSortBuilder, SearchSortCriteria } from '../../Sorts'

type SearchSortBoxDisplayerProps = {
  criteria: SearchSortCriteria
}
export function SearchSortBoxDisplayer({
  criteria,
}: SearchSortBoxDisplayerProps) {
  const lbl = SearchSortBuilder[criteria.by].label
  const Option =
    criteria.options &&
    SearchSortBuilder[criteria.by].optionedLabel?.(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
      criteria.options as unknown as any,
    )
  const Direction = criteria.order === 'asc' ? AscendingIcon : DescendingIcon

  return (
    <Displ
      as="p"
      display="inline-flex"
      flexWrap="wrap"
      columnGap="1"
      alignItems="center"
    >
      <Box as="span">{lbl}</Box>
      <Box as="span">{Option}</Box>
      <Direction size="0" />
    </Displ>
  )
}

const Displ = styled(Box)`
  &:not(:last-child):after {
    content: '>';
    padding-left: ${p => p.theme.space[1]};
  }
`
