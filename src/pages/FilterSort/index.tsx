import Box from 'components/Box'
import Button from 'components/Button'
import Popup from 'components/Popup'
import { Search } from 'models/search'
import { SearchFilterUnits } from 'pages/FilterSort/components/Filters/Units'
import { SearchFilterUserUnits } from 'pages/FilterSort/components/Filters/UserUnits'
import React, { useState } from 'react'
import UnitFilters from './components/Filters/UnitFilters'
import UserUnitFilters from './components/Filters/UserUnitFilters'

type DisplayedPanel = 'unit-filter' | 'userunit-filter'

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
  const [displayed, setDisplayed] = useState<DisplayedPanel>('unit-filter')

  return (
    <Popup
      onCancel={onCancel}
      onValidate={() =>
        onSubmit({
          filters: {
            units: unitFilter,
            userUnits: userUnitFilter,
          },
        })
      }
      customAction={
        <Button
          onClick={() => {
            setUnitFilter({})
            setUserUnitFilter({})
          }}
          variant="danger"
        >
          Clear all
        </Button>
      }
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
      <Box display="flex" justifyContent="space-evenly" padding="2">
        <Button
          onClick={() => setDisplayed('unit-filter')}
          fontSize="1"
          disabled={displayed === 'unit-filter'}
        >
          Unit Filter
        </Button>
        {!unitOnly && (
          <Button
            onClick={() => setDisplayed('userunit-filter')}
            fontSize="1"
            disabled={displayed === 'userunit-filter'}
          >
            My Box Filter
          </Button>
        )}
      </Box>
    </Popup>
  )
}
