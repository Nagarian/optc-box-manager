import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { ClearIcon, ResetIcon, SaveSearchIcon } from 'components/Icon'
import { Popup } from 'components/Popup'
import { EmptySearch } from 'hooks/useSearch'
import { useStoredSearches } from 'hooks/useStoredSearches'
import { Search } from 'models/search'
import { SaveSearch } from 'pages/SaveSearch'
import { useState } from 'react'
import { SearchBoxDisplayerCriteria } from './components/BoxDisplayers'
import { BoxDisplayerCriteria } from './components/BoxDisplayers/BoxDisplayerCriteria'
import { SearchDisplayerCriteria } from './components/Displayers'
import { Displayer } from './components/Displayers/Displayer'
import { UnitFilters } from './components/Filters/UnitFilters'
import { SearchFilterUnits } from './components/Filters/Units'
import { UserUnitFilters } from './components/Filters/UserUnitFilters'
import { SearchFilterUserUnits } from './components/Filters/UserUnits'
import { SearchSortCriteria } from './components/Sorts'
import { Sort } from './components/Sorts/Sort'
import { useSyncer } from './components/Syncer'

type DisplayedPanel = 'unit-filter' | 'userunit-filter' | 'sort' | 'displayer'

type SearchBuilderProps = {
  resetSaveKey?: string
  onCancel: () => void
  onSubmit: (search: Search) => void
  search: Search
  unitOnly?: boolean
}
export function SearchBuilder({
  resetSaveKey,
  search,
  unitOnly = false,
  onCancel,
  onSubmit,
}: SearchBuilderProps) {
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
  const [boxDisplayer, setBoxDisplayer] = useState<
    SearchBoxDisplayerCriteria | undefined
  >(search.boxDisplayer)
  const [displayed, setDisplayed] = useState<DisplayedPanel>('unit-filter')

  const [showSaveSearch, setShowSaveSearch] = useState<boolean>(false)

  const computeNewSearch = (): Search => ({
    filters: {
      units: unitFilter,
      userUnits: userUnitFilter,
    },
    sorts,
    displayer,
    boxDisplayer,
  })

  const applySearch = (search: Search) => {
    setUnitFilter(search.filters.units || {})
    setUserUnitFilter(search.filters.userUnits || {})
    setSorts(search.sorts)
    setDisplayer(search.displayer)
    setBoxDisplayer(search.boxDisplayer)
  }

  const { reseter, searches } = useStoredSearches(resetSaveKey)

  useSyncer(userUnitFilter, sorts, displayer, sync => {
    if (!sync.some(Boolean)) {
      return
    }

    const [newSorting, newDisplayer] = sync

    if (newSorting) {
      setSorts(newSorting)
    }

    if (newDisplayer) {
      setDisplayer(newDisplayer)
    }
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
            onClick={() => applySearch(EmptySearch)}
            variant="danger"
            icon={ClearIcon}
            title="Clear all"
          />

          {reseter && (
            <Button
              onClick={() => {
                const resetSearch = searches.find(x => x.id === reseter.id)
                if (!resetSearch) {
                  return
                }

                applySearch(resetSearch.search)
              }}
              variant="danger"
              icon={ResetIcon}
              title={`Reset to ${reseter.name}`}
            />
          )}

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
        <Box overflowY="auto">
          <BoxDisplayerCriteria
            searchBoxDisplayer={boxDisplayer}
            onChange={setBoxDisplayer}
          />
          <Displayer searchDisplayer={displayer} onChange={setDisplayer} />
        </Box>
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
          saveKey={resetSaveKey}
          onClose={() => setShowSaveSearch(false)}
          search={computeNewSearch()}
          onSearchSelected={search => {
            applySearch(search)
            setShowSaveSearch(false)
          }}
        />
      )}
    </Popup>
  )
}

function displayerTitle(panel: DisplayedPanel) {
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
