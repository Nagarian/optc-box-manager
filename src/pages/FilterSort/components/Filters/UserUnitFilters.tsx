import { Title } from 'components/Title'
import React from 'react'
import { SearchFilterUserUnits } from './UserUnits'
import { ByUserCottonCandyInput } from './UserUnits/ByUserCottonCandy'
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
      <Title>My Box Filters</Title>
      <ByUserSpecialInput
        criteria={userUnitFilter.byUserSpecial as ByUserSpecialCriteria}
        onChange={byUserSpecial =>
          onChange({
            ...userUnitFilter,
            byUserSpecial,
          })
        }
      />
      <ByUserCottonCandyInput
        criteria={userUnitFilter.byUserCottonCandy}
        onChange={byUserCottonCandy =>
          onChange({
            ...userUnitFilter,
            byUserCottonCandy,
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
