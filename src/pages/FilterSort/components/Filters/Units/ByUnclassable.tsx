import ChoiceInput from 'components/forms/ChoiceInput'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { BooleanFilterMapper } from 'services/filterHelper'
import { FilterContainerPanel } from '../FilterContainer'

export interface ByUnclassableCriteria {
  exclude?: {
    globalOnly?: boolean
    japanOnly?: boolean
  }
  evolvedOnly?: boolean
  superEvolvedOnly?: boolean
  isInkable?: boolean
  hasLevelLB?: boolean
}

const UnclassedFilters = {
  hasSuperEvolved: (unit: ExtendedUnit) => !unit.evolution,
  hasEvolved: (unit: ExtendedUnit) => {
    if (!unit.evolution) return true
    if (Array.isArray(unit.evolution.evolvers[0])) {
      return unit.evolution.evolvers[0][0]?.toString().startsWith?.('skull') ?? false
    }
    return unit.evolution.evolvers[0]?.toString().startsWith?.('skull') ?? false
  },
}

export const ByUnclassableFilter = (criteria: ByUnclassableCriteria) =>
  BooleanFilterMapper(
    [criteria.evolvedOnly, UnclassedFilters.hasEvolved],
    [criteria.superEvolvedOnly, UnclassedFilters.hasSuperEvolved],
    [criteria.exclude?.globalOnly, unit => !unit.flags?.gloOnly],
    [criteria.exclude?.japanOnly, unit => !unit.flags?.japOnly],
    [criteria.isInkable === true, unit => !!unit.flags?.inkable],
    [criteria.isInkable === false, unit => !unit.flags?.inkable],
    [criteria.hasLevelLB === true, unit => unit.maxLevel >= 99],
    [criteria.hasLevelLB === false, unit => unit.maxLevel < 99],
  )

export function ByUnclassableInput({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUnclassableCriteria>) {
  return (
    <>
      <FilterContainerPanel marginTop="2">
        {'Exclude'}
        <ChoiceInput
          type="checkbox"
          name="global-only"
          checked={criteria?.exclude?.globalOnly ?? false}
          onChange={e =>
            onChange({
              ...criteria,
              exclude: {
                ...criteria?.exclude,
                globalOnly: e.target.checked,
              },
            })
          }
        >
          {'Global Only'}
        </ChoiceInput>
        <ChoiceInput
          type="checkbox"
          name="japan-only"
          checked={criteria?.exclude?.japanOnly ?? false}
          onChange={e =>
            onChange({
              ...criteria,
              exclude: {
                ...criteria?.exclude,
                japanOnly: e.target.checked,
              },
            })
          }
        >
          {'Japan Only'}
        </ChoiceInput>
      </FilterContainerPanel>

      <FilterContainerPanel marginTop="2">
        {'Exclude'}
        <ChoiceInput
          type="radio"
          name="evolved-only"
          checked={criteria?.evolvedOnly ?? false}
          onChange={e =>
            onChange({
              ...criteria,
              superEvolvedOnly: !e.target.checked,
              evolvedOnly: e.target.checked,
            })
          }
        >
          {'unevolved'}
        </ChoiceInput>
        <ChoiceInput
          type="radio"
          name="evolved-only"
          checked={criteria?.superEvolvedOnly ?? false}
          onChange={e =>
            onChange({
              ...criteria,
              superEvolvedOnly: e.target.checked,
              evolvedOnly: !e.target.checked,
            })
          }
        >
          {'unevolved + not super-evolved'}
        </ChoiceInput>
      </FilterContainerPanel>

      <FilterContainerPanel marginTop="2">
        {'Ink Effects'}
        <ChoiceInput
          type="radio"
          name="is-inkable"
          checked={criteria?.isInkable ?? false}
          onChange={e =>
            onChange({
              ...criteria,
              isInkable: true,
            })
          }
        >
          {'Is Inkable'}
        </ChoiceInput>
        <ChoiceInput
          type="radio"
          name="is-inkable"
          checked={criteria?.isInkable === false}
          onChange={e =>
            onChange({
              ...criteria,
              isInkable: false,
            })
          }
        >
          {'Is not Inkable'}
        </ChoiceInput>
      </FilterContainerPanel>

      <FilterContainerPanel marginTop="2">
        {'Level LB'}
        <ChoiceInput
          type="radio"
          name="has-llb"
          checked={criteria?.hasLevelLB ?? false}
          onChange={e =>
            onChange({
              ...criteria,
              hasLevelLB: true,
            })
          }
        >
          {'Has LLB'}
        </ChoiceInput>
        <ChoiceInput
          type="radio"
          name="has-llb"
          checked={criteria?.hasLevelLB === false}
          onChange={e =>
            onChange({
              ...criteria,
              hasLevelLB: false,
            })
          }
        >
          {"Hasn't LLB"}
        </ChoiceInput>
      </FilterContainerPanel>
    </>
  )
}
