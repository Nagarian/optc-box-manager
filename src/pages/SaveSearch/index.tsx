import Popup from 'components/Popup'
import React, { useState } from 'react'
import { Search } from 'models/search'
import { useStoredSearches } from 'hooks/useStoredSearches'
import { SubTitle } from 'components/Title'
import Button from 'components/Button'
import Box from 'components/Box'
import {
  ConfirmIcon,
} from 'components/Icon'
import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { space, SpaceProps } from 'styled-system'
import { SearchCollectionItem } from './components/SearchCollectionItem'

export type SaveSearchProps = {
  search: Search
  onClose: () => void
  onSearchSelected: (search: Search) => void
}
export default function SaveSearch ({
  search,
  onClose,
  onSearchSelected,
}: SaveSearchProps) {
  const { searches, add, remove, setAsReseter, reseter } = useStoredSearches()
  const [searchName, setSearchName] = useState<string>('')

  const onNameValidation = () => {
    add(searchName, search)
    setSearchName('')
  }

  return (
    <Popup title="Search collections" onClose={onClose} minHeightRequired>
      <SubTitle>Save your current search</SubTitle>
      <Box display="flex">
        <Input
          type="text"
          placeholder="Search name (i.e. : Cotton Candy not maxed, ...)"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          onFocus={e => e.target.select()}
          onKeyPress={e => e.key === 'Enter' && onNameValidation()}
        />
        <Button onClick={onNameValidation} icon={ConfirmIcon} />
      </Box>

      <Hr marginY="3" />
      <SubTitle marginBottom="2">Load your saved searches</SubTitle>

      <Box display="flex" flexDirection="column" overflowY="auto">
        {searches.map(s => (
          <SearchCollectionItem
            key={s.id}
            search={s}
            applySearch={s => onSearchSelected(s.search)}
            isCurrentReseter={s.id === reseter?.id}
            remove={remove}
            setAsReseter={setAsReseter}
          />
        ))}
      </Box>
    </Popup>
  )
}

const Input = styled.input`
  padding: ${themeGet('space.1')};
  margin-right: ${themeGet('space.1')};
  font-size: ${themeGet('fontSizes.1')};
  border-bottom: solid ${themeGet('colors.grey')} ${themeGet('borderWidths.thin')};
  border-radius: 0;
  transition: border-color 250ms;
  flex: 1;

  :focus {
    border-color: ${themeGet('colors.primary')};
  }
`

const Hr = styled('hr')<SpaceProps>(space)
