import Popup from 'components/Popup'
import React, { useState } from 'react'
import { Search } from 'models/search'
import { useStoredSearches } from 'hooks/useStoredSearches'
import { SubTitle, Text } from 'components/Title'
import Button from 'components/Button'
import Box from 'components/Box'
import { ConfirmIcon, SaveSearchIcon, CancelIcon } from 'components/Icon'
import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import { space, SpaceProps } from 'styled-system'

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
  const { searches, add, remove } = useStoredSearches('userSearches')
  const [searchName, setSearchName] = useState<string>('')

  const onNameValidation = () => {
    add({
      name: searchName,
      search: search,
    })
    setSearchName('')
  }

  return (
    <Popup title="Search collections" onClose={onClose}>
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

      <Box
        display="flex"
        flexDirection="column"
        overflowY="auto"
        minHeight="30vh"
      >
        {searches.map(s => (
          <Panel>
            <Text flex="1">{s.name}</Text>
            <Button
              icon={CancelIcon}
              title="Delete"
              onClick={() => remove(s)}
            />
            <Button
              icon={SaveSearchIcon}
              title="Apply"
              onClick={() => onSearchSelected(s.search)}
            />
          </Panel>
        ))}
      </Box>
    </Popup>
  )
}

const Input = styled.input`
  padding: ${themeGet('space.1')};
  margin-right: ${themeGet('space.1')};
  font-size: ${themeGet('fontSizes.1')};
  border-bottom: solid ${themeGet('colors.grey')} thin;
  border-radius: 0;
  transition: border-color 250ms;
  flex: 1;

  :focus {
    border-color: ${themeGet('colors.primary')};
  }
`

const Panel = styled.div`
  display: flex;
  align-items: center;
  padding: ${themeGet('space.1')};

  :nth-child(odd) {
    background-color: ${themeGet('colors.primary')};
    color: ${themeGet('colors.primaryText')};
  }

  > * {
    margin: ${themeGet('space.1')};
  }
`

const Hr = styled('hr')<SpaceProps>(space)