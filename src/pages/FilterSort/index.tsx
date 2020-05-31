import Popup from 'components/Popup'
import { Search } from 'models/search'
import { SearchFilterUnits } from 'pages/FilterSort/components/Filters/Units'
import { SearchFilterUserUnits } from 'pages/FilterSort/components/Filters/UserUnits'
import React, { useState } from 'react'
import UnitFilters from './components/Filters/UnitFilters'
import UserUnitFilters from './components/Filters/UserUnitFilters'

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
