import styled from '@emotion/styled'
import Box from 'components/Box'
import Button from 'components/Button'
import { TextInput } from 'components/forms/TextInput'
import { ConfirmIcon } from 'components/Icon'
import Popup from 'components/Popup'
import { SubTitle } from 'components/Title'
import { useStoredSearches } from 'hooks/useStoredSearches'
import { Search } from 'models/search'
import { useState } from 'react'
import { space, SpaceProps } from 'styled-system'
import { SearchCollectionItem } from './components/SearchCollectionItem'

export type SaveSearchProps = {
  saveKey?: string
  search: Search
  onClose: () => void
  onSearchSelected: (search: Search) => void
}
export default function SaveSearch ({
  saveKey,
  search,
  onClose,
  onSearchSelected,
}: SaveSearchProps) {
  const { searches, add, remove, setAsReseter, reseters, reseter, update } =
    useStoredSearches(saveKey)
  const [searchName, setSearchName] = useState<string>('')

  const onNameValidation = () => {
    add(searchName, search)
    setSearchName('')
  }

  return (
    <Popup title="Search collections" onClose={onClose} minHeightRequired>
      <SubTitle>Save your current search</SubTitle>
      <Box display="flex">
        <TextInput
          type="text"
          flex="1"
          placeholder="Search name (i.e. : Cotton Candy not maxed, ...)"
          value={searchName}
          onChange={e => setSearchName(e.target.value)}
          onFocus={e => e.target.select()}
          onKeyDown={e => e.key === 'Enter' && onNameValidation()}
        />
        <Button onClick={onNameValidation} icon={ConfirmIcon} />
      </Box>

      <Hr marginY="3" />
      <SubTitle marginBottom="2">Load your saved searches</SubTitle>

      <Box display="flex" flexDirection="column" overflowY="auto">
        {[...searches]
          .sort((s1, s2) => s1.name.localeCompare(s2.name))
          .map(s => (
            <SearchCollectionItem
              key={s.id}
              search={s}
              applySearch={s => onSearchSelected(s.search)}
              allowDelete={!reseters.includes(s.id)}
              isCurrentReseter={reseter?.id === s.id}
              remove={remove}
              showReseter={!!saveKey}
              setAsReseter={s => saveKey && setAsReseter(saveKey, s)}
              onUpdate={update}
            />
          ))}
      </Box>
    </Popup>
  )
}

const Hr = styled('hr')<SpaceProps>(space)
