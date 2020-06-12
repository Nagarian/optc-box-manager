import { UserUnit } from 'models/userBox'
import { FunctionComponent } from 'react'
import { DetailedCottonCandyDisplayer } from './DetailedCottonCandyDisplayer'
import PotentialsDisplayer, { SpecificPotentialDisplayer } from './PotentialsDisplayer'
import SpecialLevelDisplayer from './SpecialLevelDisplayer'
import SupportDisplayer from './SupportDisplayer'

export const UserUnitDisplayerTypeKeys = [
  'cottonCandy',
  'support',
  'specialLvl',
  'potentials',
  'potential',
] as const
export type SearchDisplayerType = typeof UserUnitDisplayerTypeKeys [number]

export type SearchDisplayerProps<T = undefined> = {
  userUnit: UserUnit
  options?: T
}

export const SearchDisplayerBuilder: {
  [key in SearchDisplayerType]: {
    label: string
    displayer: FunctionComponent<SearchDisplayerProps>
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
  },
  potentials: {
    label: 'Potentials',
    displayer: PotentialsDisplayer,
  },
}
