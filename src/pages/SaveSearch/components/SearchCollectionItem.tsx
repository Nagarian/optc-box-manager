import styled from '@emotion/styled'
import { Button } from 'components/Button'
import { TextInput } from 'components/forms/TextInput'
import {
  DeleteIcon,
  ResetApplyIcon,
  ResetRemoveIcon,
  SaveSearchIcon,
} from 'components/Icon'
import { Popup } from 'components/Popup'
import { Text } from 'components/Title'
import { SavedSearch } from 'hooks/useStoredSearches'
import { useEffect, useRef, useState } from 'react'

type SearchCollectionItemProps = {
  search: SavedSearch
  showReseter: boolean
  allowDelete: boolean
  isCurrentReseter: boolean
  onUpdate: (search: SavedSearch) => void
  setAsReseter: (search: SavedSearch | undefined) => void
  applySearch: (search: SavedSearch) => void
  remove: (search: SavedSearch) => void
}
export function SearchCollectionItem({
  search,
  showReseter,
  allowDelete,
  isCurrentReseter,
  onUpdate,
  setAsReseter,
  applySearch,
  remove,
}: SearchCollectionItemProps) {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [editTitle, setEditTitle] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validate = (name: string) => {
    if (name) {
      onUpdate({ ...search, name })
    }
    setEditTitle(false)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [editTitle])

  return (
    <>
      <Panel>
        {!editTitle && (
          <Text
            flex="1"
            fontSize={isCurrentReseter ? 2 : undefined}
            fontStyle={isCurrentReseter ? 'italic' : undefined}
            onClick={() => setEditTitle(true)}
          >
            {search.name}
          </Text>
        )}

        {editTitle && (
          <TextInput
            ref={inputRef}
            type="text"
            flex="1"
            placeholder="Search name (i.e. : Cotton Candy not maxed, ...)"
            defaultValue={search.name}
            onFocus={e => e.target.select()}
            onKeyDown={e =>
              e.key === 'Enter' && validate(e.currentTarget.value)
            }
            onBlur={e => validate(e.target.value)}
          />
        )}

        <Button
          icon={DeleteIcon}
          title="Delete"
          onClick={() => setShowConfirmation(true)}
          disabled={!allowDelete}
        />

        {showReseter && (
          <Button
            variant={isCurrentReseter ? 'secondary' : 'primary'}
            icon={isCurrentReseter ? ResetRemoveIcon : ResetApplyIcon}
            title={
              isCurrentReseter
                ? 'Remove from Custom Reset'
                : 'Set as Custom Reset'
            }
            onClick={() => setAsReseter(isCurrentReseter ? undefined : search)}
          />
        )}

        <Button
          icon={SaveSearchIcon}
          title="Apply"
          onClick={() => applySearch(search)}
        />
      </Panel>

      {showConfirmation && (
        <Popup
          title={`Are you sure to delete your Saved Search "${search.name}" ?`}
          onValidate={() => {
            setShowConfirmation(false)
            remove(search)
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </>
  )
}

const Panel = styled.div`
  display: flex;
  align-items: center;
  padding: ${p => p.theme.space[1]};

  :nth-of-type(odd) {
    background-color: ${p => p.theme.colors.primary};
    color: ${p => p.theme.colors.primaryText};
  }

  > * {
    margin: ${p => p.theme.space[1]};
  }
`
