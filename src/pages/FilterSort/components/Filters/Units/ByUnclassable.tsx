import ChoiceInput from 'components/forms/ChoiceInput'
import { SearchFilterCriteriaInputProps } from 'models/search'
import { ExtendedUnit } from 'models/units'
import { BooleanFilterMapper } from 'services/filterHelper'
import { FilterContainerPanel } from '../FilterContainer'

export interface ByUnclassableCriteria {
  globalOnly?: boolean
  evolvedOnly?: boolean
  superEvolvedOnly?: boolean
}

const UnclassedFilters = {
  hasSuperEvolved: (unit: ExtendedUnit) => !unit.evolution,
  hasEvolved: (unit: ExtendedUnit) =>
    (!unit.evolution ||
      unit.evolution.evolvers[0]?.startsWith?.('skull') ||
      false) as boolean,
  globalOnly: (unit: ExtendedUnit) => !!unit.flags?.global,
}

export const ByUnclassableFilter = (criteria: ByUnclassableCriteria) =>
  BooleanFilterMapper(
    [criteria.evolvedOnly, UnclassedFilters.hasEvolved],
    [criteria.superEvolvedOnly, UnclassedFilters.hasSuperEvolved],
    [criteria.globalOnly, UnclassedFilters.globalOnly],
  )

export function ByUnclassableInput ({
  criteria,
  onChange,
}: SearchFilterCriteriaInputProps<ByUnclassableCriteria>) {
  return (
    <>
      <ChoiceInput
        type="checkbox"
        name="global-only"
        checked={criteria?.globalOnly ?? false}
        onChange={e =>
          onChange({
            ...criteria,
            globalOnly: e.target.checked,
          })
        }
      >
        Show global only
      </ChoiceInput>

      <FilterContainerPanel marginTop="2">
        Hide
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
          unevolved
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
          unevolved + not super-evolved
        </ChoiceInput>
      </FilterContainerPanel>
    </>
  )
}
