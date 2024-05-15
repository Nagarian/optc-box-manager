import ImageInput from 'components/forms/ImageInput'
import { PirateFestStyleIcon } from 'components/PirateFestStyle'
import { SearchFilterCriteriaInputProps } from 'models/search'
import {
  ExtendedUnit,
  UnitPirateFestStyle,
  UnitPirateFestStyles,
} from 'models/units'

export interface ByPirateFestStyleCriteria {
  values: UnitPirateFestStyle[]
}

export const ByPirateFestStyleFilter = (
  criteria: ByPirateFestStyleCriteria,
) => (unit: ExtendedUnit) =>
  criteria.values.some(crit => unit.pirateFest.class === crit)

export function ByPirateFestStyleInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByPirateFestStyleCriteria>) {
  const values = criteria?.values ?? []
  const triggerChange = (value: UnitPirateFestStyle, check: boolean) => {
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
      {UnitPirateFestStyles.map(unitPirateFestStyle => (
        <ImageInput
          key={unitPirateFestStyle}
          type="checkbox"
          name="unit-class"
          checked={values.includes(unitPirateFestStyle)}
          onChange={e => triggerChange(unitPirateFestStyle, e.target.checked)}
        >
          <PirateFestStyleIcon type={unitPirateFestStyle} size="2" margin="2" />
        </ImageInput>
      ))}
    </>
  )
}
