import Popup from 'components/Popup'
import { SearchFilterUnits } from 'components/SearchPanel/Filters/Units'
import { ByClassInput } from 'components/SearchPanel/Filters/Units/ByClass'
import { ByPotentialInput } from 'components/SearchPanel/Filters/Units/ByPotential'
import { ByRarityInput } from 'components/SearchPanel/Filters/Units/ByRarity'
import { BySupportInput } from 'components/SearchPanel/Filters/Units/BySupport'
import { Search } from 'models/search'
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

      <BySupportInput
        criteria={unitFilter.bySupport}
        onChange={bySupport =>
          setUnitFilter({
            ...unitFilter,
            bySupport,
          })
        }
      />

      <ByPotentialInput
        criteria={unitFilter.byPotential}
        onChange={byPotential =>
          setUnitFilter({
            ...unitFilter,
            byPotential,
          })
        }
      />

      <ByClassInput
        criteria={unitFilter.byClass}
        onChange={byClass =>
          setUnitFilter({
            ...unitFilter,
            byClass,
          })
        }
      />
    </Popup>
  )
}
