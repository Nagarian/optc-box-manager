import Popup from 'components/Popup'
import { SearchFilterUnits } from 'components/SearchPanel/Filters/Units'
import { SearchFilterUserUnits } from 'components/SearchPanel/Filters/UserUnits'
import { Search } from 'models/search'
import React, { useState } from 'react'
import UnitFilters from './components/UnitFilters'
import UserUnitFilters from './components/UserUnitFilters'

type FilterSortProps = {
  onCancel: () => void
  onSubmit: (search: Search) => void
  search: Search
}

export default function FilterSort ({
  search,
  onCancel,
  onSubmit,
}: FilterSortProps) {
  const [unitFilter, setUnitFilter] = useState<SearchFilterUnits>(
    search.filters.units || {},
  )
  const [userUnitFilter, setUserUnitFilter] = useState<SearchFilterUserUnits>(
    search.filters.userUnits || {},
  )

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
    >
      <UnitFilters unitFilter={unitFilter} onChange={setUnitFilter} />
      <UserUnitFilters userUnitFilter={userUnitFilter} onChange={setUserUnitFilter} />
    </Popup>
  )
}
