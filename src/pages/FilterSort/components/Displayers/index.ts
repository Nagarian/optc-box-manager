import { UserUnit } from 'models/userBox'
import { FunctionComponent } from 'react'
import { DetailedCottonCandyDisplayer } from './DetailedCottonCandyDisplayer'
import PirateFestDisplayer, { PirateFestDisplayerInput } from './PirateFestDisplayer'
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
  'pirateFest',
] as const
export type SearchDisplayerType = typeof UserUnitDisplayerTypeKeys[number]

export interface SearchDisplayerCriteria<T = unknown | undefined> {
  type: SearchDisplayerType
  options?: T
}

export type SearchDisplayerProps<T = unknown | undefined> = {
  userUnit: UserUnit
  options?: T
}

export type SearchDisplayerInputProps<T = unknown | undefined> = {
  options?: T
  onChange: (options?: T) => void
}

type SearchDisplayerBuilderType<T> = {
  label: string
  displayer: FunctionComponent<SearchDisplayerProps<T>>
  input?: FunctionComponent<SearchDisplayerInputProps<T>>
}

export const SearchDisplayerBuilder: {
  [key in SearchDisplayerType]: SearchDisplayerBuilderType<any>
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
    input: SpecificPotentialDisplayerInput,
  },
  potentials: {
    label: 'Potentials',
    displayer: PotentialsDisplayer,
  },
  pirateFest: {
    label: 'Pirate Festival',
    displayer: PirateFestDisplayer,
    input: PirateFestDisplayerInput,
  },
}
