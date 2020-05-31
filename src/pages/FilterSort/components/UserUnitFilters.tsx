import { SearchFilterUserUnits } from 'components/SearchPanel/Filters/UserUnits'
import { ByUserPotentialInput } from 'components/SearchPanel/Filters/UserUnits/ByUserPotential'
import React from 'react'

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
    </div>
  )
}
