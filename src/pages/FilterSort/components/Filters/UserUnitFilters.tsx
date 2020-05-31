import React from 'react'
import { SearchFilterUserUnits } from './UserUnits'
import { ByCottonCandyInput } from './UserUnits/ByCottonCandy'
import { ByUserPotentialInput } from './UserUnits/ByUserPotential'
import { ByUserSpecialCriteria, ByUserSpecialInput } from './UserUnits/ByUserSpecial'
import { ByUserSupportCriteria, ByUserSupportInput } from './UserUnits/ByUserSupport'

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
      <ByUserSupportInput
        criteria={userUnitFilter.byUserSupport as ByUserSupportCriteria}
        onChange={byUserSupport =>
          onChange({
            ...userUnitFilter,
            byUserSupport,
          })
        }
      />
      <ByUserSpecialInput
        criteria={userUnitFilter.byUserSpecial as ByUserSpecialCriteria}
        onChange={byUserSpecial =>
          onChange({
            ...userUnitFilter,
            byUserSpecial,
          })
        }
      />
    </div>
  )
}
