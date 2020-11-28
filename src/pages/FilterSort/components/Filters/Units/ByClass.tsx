import { UnitClassIcon } from 'components/Class'
import ImageInput from 'components/forms/ImageInput'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { ExtendedUnit, UnitClass, UnitClasses } from 'models/units'
import React from 'react'

export interface ByClassCriteria {
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

export function ByClassInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByClassCriteria>) {
  const values = criteria?.values! ?? []
  const triggerChange = (value: UnitClass, check: boolean) => {
    const newValues = check
      ? values.concat(value)
      : values.filter(v => v !== value)

    onChange(
      newValues.length
        ? {
          values: newValues,
        }
        : undefined,
    )
  }

  return (
    <>
      {UnitClasses.map(unitClass => (
        <ImageInput
          key={unitClass}
          type="checkbox"
          name="unit-class"
          checked={values.includes(unitClass)}
          onChange={e => triggerChange(unitClass, e.target.checked)}
        >
          <UnitClassIcon type={unitClass} size="2" margin="2" />
        </ImageInput>
      ))}
    </>
  )
}
