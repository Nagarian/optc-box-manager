import Popup from 'components/Popup'
import { ByRarityInput } from 'components/SearchPanel/Filters/Units/ByRarity'
import { Search, SearchFilterUnits } from 'models/search'
import React, { useState } from 'react'

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

  return (
    <Popup
      onCancel={onCancel}
      onValidate={() =>
        onSubmit({
          filters: {
            units: unitFilter,
          },
        })
      }
    >
      <ByRarityInput
        criteria={unitFilter.byRarity}
        onChange={byRarity =>
          setUnitFilter({
            ...unitFilter,
            byRarity,
          })
        }
      />
    </Popup>
  )
}
