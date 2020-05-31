import React from 'react'
import { SearchFilterUserUnits } from './UserUnits'
import { ByCottonCandyInput } from './UserUnits/ByCottonCandy'
import { ByUserPotentialInput } from './UserUnits/ByUserPotential'

export type UserUnitFiltersProps = {
  userUnitFilter: SearchFilterUserUnits
  onChange: (userUnitFilter: SearchFilterUserUnits) => void
}
export default function UserUnitFilters ({
  userUnitFilter,
  onChange,
}: UserUnitFiltersProps) {
  return (
    <div>
      <ByUserPotentialInput
        criteria={userUnitFilter.byUserPotential}
        onChange={byUserPotential =>
          onChange({
            ...userUnitFilter,
            byUserPotential,
          })
        }
      />
      <ByCottonCandyInput
        criteria={userUnitFilter.byCottonCandy}
        onChange={byCottonCandy =>
          onChange({
            ...userUnitFilter,
            byCottonCandy,
          })
        }
      />
    </div>
  )
}
