import Box from 'components/Box'
import Button from 'components/Button'
import Popup from 'components/Popup'
import { Search, SearchSortCriteria } from 'models/search'
import { SearchFilterUnits } from 'pages/FilterSort/components/Filters/Units'
import { SearchFilterUserUnits } from 'pages/FilterSort/components/Filters/UserUnits'
import React, { useState } from 'react'
import { SearchDisplayerCriteria } from './components/Displayers'
import Displayer from './components/Displayers/Displayer'
import UnitFilters from './components/Filters/UnitFilters'
import UserUnitFilters from './components/Filters/UserUnitFilters'
import Sort from './components/Sorts/Sort'
import { SaveSearchIcon } from 'components/Icon'
import SaveSearch from 'pages/SaveSearch'

type DisplayedPanel = 'unit-filter' | 'userunit-filter' | 'sort' | 'displayer'

type FilterSortProps = {
  onCancel: () => void
  onSubmit: (search: Search) => void
  search: Search
  unitOnly?: boolean
}
export default function FilterSort ({
  search,
  unitOnly = false,
  onCancel,
  onSubmit,
}: FilterSortProps) {
  const [unitFilter, setUnitFilter] = useState<SearchFilterUnits>(
    search.filters.units || {},
  )
  const [userUnitFilter, setUserUnitFilter] = useState<SearchFilterUserUnits>(
    search.filters.userUnits || {},
  )
  const [sorts, setSorts] = useState<SearchSortCriteria[]>(search.sorts || [])
  const [displayer, setDisplayer] = useState<
    SearchDisplayerCriteria | undefined
  >(search.displayer)
  const [displayed, setDisplayed] = useState<DisplayedPanel>('unit-filter')

  const [showSaveSearch, setShowSaveSearch] = useState<boolean>(false)

  const computeNewSearch = () => ({
    filters: {
      units: unitFilter,
      userUnits: userUnitFilter,
    },
    sorts,
    displayer,
  })

  const buttonStyle = {
    fontSize: '1',
    px: '2',
    py: '1',
    mx: '1',
  }

  return (
    <Popup
      onCancel={onCancel}
      onValidate={() => onSubmit(computeNewSearch())}
      customAction={
        <>
          <Button
            onClick={() => {
              setUnitFilter({})
              setUserUnitFilter({})
              setSorts([])
              setDisplayer(undefined)
            }}
            variant="danger"
          >
            Clear all
          </Button>

          <Button
            onClick={() => setShowSaveSearch(true)}
            icon={SaveSearchIcon}
            title="Save/Load search"
          />
        </>
      }
      title={displayerTitle(displayed)}
    >
      {displayed === 'unit-filter' && (
        <UnitFilters unitFilter={unitFilter} onChange={setUnitFilter} />
      )}

      {displayed === 'userunit-filter' && (
        <UserUnitFilters
          userUnitFilter={userUnitFilter}
          onChange={setUserUnitFilter}
        />
      )}

      {displayed === 'sort' && (
        <Sort searchSort={sorts} unitOnly={unitOnly} onChange={setSorts} />
      )}

      {displayed === 'displayer' && (
        <Displayer searchDisplayer={displayer} onChange={setDisplayer} />
      )}

      <hr />
      <Box
        display="flex"
        justifyContent="space-evenly"
        padding="2"
        flex="0 0 auto"
      >
        <Button
          onClick={() => setDisplayed('unit-filter')}
          {...buttonStyle}
          disabled={displayed === 'unit-filter'}
        >
          Unit Filter
        </Button>

        {!unitOnly && (
          <Button
            onClick={() => setDisplayed('userunit-filter')}
            {...buttonStyle}
            disabled={displayed === 'userunit-filter'}
          >
            My Box Filter
          </Button>
        )}

        <Button
          onClick={() => setDisplayed('sort')}
          {...buttonStyle}
          disabled={displayed === 'sort'}
        >
          Sort
        </Button>

        {!unitOnly && (
          <Button
            onClick={() => setDisplayed('displayer')}
            {...buttonStyle}
            disabled={displayed === 'displayer'}
          >
            Info displayed
          </Button>
        )}
      </Box>
      {showSaveSearch && (
        <SaveSearch
          onClose={() => setShowSaveSearch(false)}
          search={computeNewSearch()}
          onSearchSelected={search => {
            setUnitFilter(search.filters.units || {})
            setUserUnitFilter(search.filters.userUnits || {})
            setSorts(search.sorts)
            setDisplayer(search.displayer)
            setShowSaveSearch(false)
          }}
        />
      )}
    </Popup>
  )
}

function displayerTitle (panel: DisplayedPanel) {
  switch (panel) {
    case 'displayer':
      return 'Info Displayed'
    case 'unit-filter':
      return 'Units Filters'
    case 'userunit-filter':
      return 'My Box Filters'
    case 'sort':
      return 'Sort'
    default:
      return undefined
  }
}
