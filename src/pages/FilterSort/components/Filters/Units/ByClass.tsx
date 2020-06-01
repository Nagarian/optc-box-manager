import { UnitClassIcon } from 'components/Class'
import ImageInput from 'components/forms/ImageInput'
import { UnitFilterCriteria } from 'models/search'
import { ExtendedUnit, UnitClass, UnitClasses } from 'models/units'
import React from 'react'
import FilterContainer from '../FilterContainer'

export interface ByClassCriteria extends UnitFilterCriteria {
  values: UnitClass[]
}

export const ByClassFilter = (criteria: ByClassCriteria) => (
  unit: ExtendedUnit,
) =>
  criteria.values.some(crit =>
    Array.isArray(unit.class)
      ? unit.class.some((subClass: UnitClass[] | UnitClass) =>
        Array.isArray(subClass)
          ? subClass.some(dualUnitClass => dualUnitClass === crit)
          : subClass === crit,
      )
      : unit.class === crit,
  )

export type ByClassInputProps = {
  criteria?: ByClassCriteria
  onChange: (criteria?: ByClassCriteria) => void
}

export function ByClassInput ({
  criteria = { values: [] },
  onChange,
}: ByClassInputProps) {
  const triggerChange = (value: UnitClass, check: boolean) => {
    const values = check
      ? criteria.values.concat(value)
      : criteria.values.filter(v => v !== value)

    onChange(
      values.length
        ? {
          values,
        }
        : undefined,
    )
  }

  return (
    <FilterContainer
      title="Class"
      onReset={() => onChange(undefined)}
      disableReset={!criteria.values.length}
    >
      {UnitClasses.map(unitClass => (
        <ImageInput
          key={unitClass}
          type="checkbox"
          name="unit-class"
          checked={criteria.values.includes(unitClass)}
          onChange={e => triggerChange(unitClass, e.target.checked)}
        >
          <UnitClassIcon type={unitClass} size="2" margin="2" />
        </ImageInput>
      ))}
    </FilterContainer>
  )
}
