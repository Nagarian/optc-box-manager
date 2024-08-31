import ImageInput from 'components/forms/ImageInput'
import Type from 'components/Type'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { ExtendedUnit, UnitType, UnitTypes } from 'models/units'
import {
  SearchRecapItem,
  SearchRecapItemCriteriaProps,
} from '../../BoxDisplayers/SearchRecap/SearchRecapItem'

export interface ByTypeCriteria {
  values: UnitType[]
}

export const ByTypeFilter =
  (criteria: ByTypeCriteria) => (unit: ExtendedUnit) =>
    criteria.values?.some(crit =>
      crit === 'DUAL'
        ? Array.isArray(unit.type) && !!unit.detail?.swap
        : crit === 'VS'
          ? Array.isArray(unit.type) && !unit.detail?.swap
          : Array.isArray(unit.type)
            ? unit.type.some(t => t === crit)
            : unit.type === crit,
    ) ?? false

export function ByTypeInput({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByTypeCriteria>) {
  const values = criteria?.values ?? []
  const triggerChange = (value: UnitType, check: boolean) => {
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
      {UnitTypes.map(unitType => (
        <ImageInput
          key={unitType}
          type="checkbox"
          name="unit-type"
          checked={values.includes(unitType)}
          onChange={e => triggerChange(unitType, e.target.checked)}
        >
          <Type value={unitType} margin="2" />
        </ImageInput>
      ))}
    </>
  )
}

export function ByTypeBoxDisplayer({
  criteria,
}: SearchRecapItemCriteriaProps<ByTypeCriteria>) {
  if (!criteria?.values.length) {
    return undefined
  }

  return (
    <SearchRecapItem title="type">
      {criteria.values.map(v => (
        <Type key={v} value={v} size="2em" />
      ))}
    </SearchRecapItem>
  )
}
