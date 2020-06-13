import { UserUnit } from 'models/userBox'
import { FunctionComponent } from 'react'
import { DetailedCottonCandyDisplayer } from './DetailedCottonCandyDisplayer'
import PotentialsDisplayer, {
  SpecificPotentialDisplayer,
  SpecificPotentialDisplayerInput,
} from './PotentialsDisplayer'
import SpecialLevelDisplayer from './SpecialLevelDisplayer'
import SupportDisplayer from './SupportDisplayer'

export const UserUnitDisplayerTypeKeys = [
  'specialLvl',
  'cottonCandy',
  'support',
  'potentials',
  'potential',
] as const
export type SearchDisplayerType = typeof UserUnitDisplayerTypeKeys[number]

export type SearchDisplayerCriteria<T = undefined> =
  | undefined
  | {
      type: SearchDisplayerType
      options?: T
    }

export type SearchDisplayerProps<T = undefined> = {
  userUnit: UserUnit
  options?: T
}

export type SearchDisplayerInputProps<T = undefined> = {
  options?: T
  onChange: (options?: T) => void
}

export const SearchDisplayerBuilder: {
  [key in SearchDisplayerType]: {
    label: string
    displayer: FunctionComponent<SearchDisplayerProps>
    input?: FunctionComponent<SearchDisplayerInputProps>
  }
} = {
  cottonCandy: {
    label: 'Cotton Candy',
    displayer: DetailedCottonCandyDisplayer,
  },
  specialLvl: {
    label: 'Special',
    displayer: SpecialLevelDisplayer,
  },
  support: {
    label: 'Support',
    displayer: SupportDisplayer,
  },
  potential: {
    label: 'Specific Potential',
    displayer: SpecificPotentialDisplayer,
    input: SpecificPotentialDisplayerInput as any,
  },
  potentials: {
    label: 'Potentials',
    displayer: PotentialsDisplayer,
  },
}
