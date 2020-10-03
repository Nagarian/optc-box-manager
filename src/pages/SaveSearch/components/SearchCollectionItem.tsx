import React, { useState } from 'react'
import { SavedSearch } from 'hooks/useStoredSearches'
import { Text } from 'components/Title'
import Button from 'components/Button'
import {
  SaveSearchIcon,
  ResetApplyIcon,
  ResetRemoveIcon,
  DeleteIcon,
} from 'components/Icon'
import styled from 'styled-components'
import { themeGet } from '@styled-system/theme-get'
import Popup from 'components/Popup'

type SearchCollectionItemProps = {
  search: SavedSearch
  isCurrentReseter: boolean
  setAsReseter: (search: SavedSearch | undefined) => void
  applySearch: (search: SavedSearch) => void
  remove: (search: SavedSearch) => void
}
export function SearchCollectionItem ({
  search,
  isCurrentReseter,
  setAsReseter,
  applySearch,
  remove,
}: SearchCollectionItemProps) {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  return (
    <>
      <Panel>
        <Text flex="1">{search.name}</Text>

        <Button
          icon={DeleteIcon}
          title="Delete"
          onClick={() => setShowConfirmation(true)}
          disabled={isCurrentReseter}
        />
        <Button
          icon={isCurrentReseter ? ResetRemoveIcon : ResetApplyIcon}
          title={
            isCurrentReseter
              ? 'Remove from Custom Reset'
              : 'Set as Custom Reset'
          }
          onClick={() =>
            setAsReseter(isCurrentReseter ? undefined : search)
          }
        />
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
  padding: ${themeGet('space.1')};

  :nth-child(odd) {
    background-color: ${themeGet('colors.primary')};
    color: ${themeGet('colors.primaryText')};
  }

  > * {
    margin: ${themeGet('space.1')};
  }
`
