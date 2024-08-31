import Box from 'components/Box'
import { Icon } from 'components/Icon'
import { Text } from 'components/Title'
import { PropsWithChildren } from 'react'
import { ColorProps } from 'styled-system'

export type SearchRecapItemCriteriaProps<T = unknown> = {
  criteria?: T
}

type SearchRecapItemProps = {
  title: string
  icon?: Icon
} & ColorProps
export function SearchRecapItem({
  title,
  icon: Icon,
  color,
  children,
}: PropsWithChildren<SearchRecapItemProps>) {
  if (!children) {
    return undefined
  }

  return (
    <Box as="p" display="inline-flex" alignItems="center" gap="1">
      {Icon ? (
        color ? (
          <Icon size="1" color={color} title={title} />
        ) : (
          <Icon size="1" title={title} />
        )
      ) : (
        <Text as="span" fontWeight="bold">{`${title}:`}</Text>
      )}
      {children}
    </Box>
  )
}
