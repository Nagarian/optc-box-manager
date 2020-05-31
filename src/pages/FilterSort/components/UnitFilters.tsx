import { SearchFilterUnits } from 'components/SearchPanel/Filters/Units'
import { ByClassInput } from 'components/SearchPanel/Filters/Units/ByClass'
import { ByPotentialInput } from 'components/SearchPanel/Filters/Units/ByPotential'
import { ByRarityInput } from 'components/SearchPanel/Filters/Units/ByRarity'
import { BySupportInput } from 'components/SearchPanel/Filters/Units/BySupport'
import { ByTypeInput } from 'components/SearchPanel/Filters/Units/ByType'
import { ByUnclassableInput } from 'components/SearchPanel/Filters/Units/ByUnclassable'
import React from 'react'

export type UnitFiltersProps = {
  unitFilter: SearchFilterUnits
  onChange: (unitFilter: SearchFilterUnits) => void
}
export default function UnitFilters ({ unitFilter, onChange }: UnitFiltersProps) {
  return (
    <div>
      <ByRarityInput
        criteria={unitFilter.byRarity}
        onChange={byRarity =>
          onChange({
            ...unitFilter,
            byRarity,
          })
        }
      />

      <BySupportInput
        criteria={unitFilter.bySupport}
        onChange={bySupport =>
          onChange({
            ...unitFilter,
            bySupport,
          })
        }
      />

      <ByPotentialInput
        criteria={unitFilter.byPotential}
        onChange={byPotential =>
          onChange({
            ...unitFilter,
            byPotential,
          })
        }
      />

      <ByClassInput
        criteria={unitFilter.byClass}
        onChange={byClass =>
          onChange({
            ...unitFilter,
            byClass,
          })
        }
      />

      <ByTypeInput
        criteria={unitFilter.byType}
        onChange={byType =>
          onChange({
            ...unitFilter,
            byType,
          })
        }
      />

      <ByUnclassableInput
        criteria={unitFilter.byUnclassable}
        onChange={byUnclassable =>
          onChange({
            ...unitFilter,
            byUnclassable,
          })
        }
      />
    </div>
  )
}
