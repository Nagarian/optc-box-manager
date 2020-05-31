import React from 'react'
import { SearchFilterUnits } from './Units'
import { ByClassInput } from './Units/ByClass'
import { ByPotentialInput } from './Units/ByPotential'
import { ByRarityInput } from './Units/ByRarity'
import { BySupportInput } from './Units/BySupport'
import { ByTypeInput } from './Units/ByType'
import { ByUnclassableInput } from './Units/ByUnclassable'

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
