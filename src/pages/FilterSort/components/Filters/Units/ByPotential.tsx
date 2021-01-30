import ImageInput from 'components/forms/ImageInput'
import PotentialAbility from 'components/PotentialAbility'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { ExtendedUnit, PotentialKey, Potentials } from 'models/units'

export interface ByPotentialCriteria {
  values: PotentialKey[]
}
const renamedPotentials: Record<string, PotentialKey> = {
  'Nutrition/Hunger reduction': 'Nutrition/Reduce Hunger duration',
}

export const ByPotentialFilter = (criteria: ByPotentialCriteria) => (
  unit: ExtendedUnit,
) =>
  criteria.values.some(crit =>
    unit.detail.potential?.some(p => (renamedPotentials[p.Name] ?? p.Name) === crit),
  )

export function ByPotentialInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByPotentialCriteria>) {
  const values = criteria?.values ?? []
  const triggerChange = (value: PotentialKey, check: boolean) => {
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
      {Potentials.map(potential => (
        <ImageInput
          key={potential}
          type="checkbox"
          name="unit-potentials"
          checked={values.includes(potential)}
          onChange={e => triggerChange(potential, e.target.checked)}
        >
          <PotentialAbility type={potential} size="3" />
        </ImageInput>
      ))}
    </>
  )
}
