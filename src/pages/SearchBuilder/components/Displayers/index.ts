import { SearchOptionInputProps } from 'models/search'
import { UserUnit } from 'models/userBox'
import { FunctionComponent } from 'react'
import {
  CoopDisplayer,
  CoopDisplayerInput,
  CoopDisplayerOption,
} from './CoopDisplayer'
import { DetailedCottonCandyDisplayer } from './DetailedCottonCandyDisplayer'
import {
  LevelDisplayer,
  LevelDisplayerInput,
  LevelDisplayerOption,
} from './LevelDisplayer'
import {
  PirateFestDisplayer,
  PirateFestDisplayerInput,
  PirateFestDisplayerOption,
} from './PirateFestDisplayer'
import {
  PotentialsDisplayer,
  SpecificPotentialDisplayer,
  SpecificPotentialDisplayerInput,
  SpecificPotentialDisplayerOption,
} from './PotentialsDisplayer'
import { SpecialLevelDisplayer } from './SpecialLevelDisplayer'
import { SupportDisplayer } from './SupportDisplayer'

type DisplayerOptions = {
  level: LevelDisplayerOption
  specialLvl: never
  cottonCandy: never
  support: never
  potentials: never
  potential: SpecificPotentialDisplayerOption
  pirateFest: PirateFestDisplayerOption
  coop: CoopDisplayerOption
}

type DisplayerCriteriaAll = {
  [Prop in keyof DisplayerOptions]: {
    type: Prop
    options?: DisplayerOptions[Prop]
  }
}

export type SearchDisplayerType = keyof DisplayerOptions

export type SearchDisplayerCriteria =
  DisplayerCriteriaAll[keyof DisplayerCriteriaAll]

export type SearchDisplayerProps<T> = {
  userUnit: UserUnit
  options?: T
}

export const SearchDisplayerBuilder: {
  [key in keyof DisplayerOptions]: {
    key: key
    label: string
    displayer: FunctionComponent<SearchDisplayerProps<DisplayerOptions[key]>>
    input?: FunctionComponent<SearchOptionInputProps<DisplayerOptions[key]>>
  }
} = {
  level: {
    key: 'level',
    label: 'Level',
    displayer: LevelDisplayer,
    input: LevelDisplayerInput,
  },
  specialLvl: {
    key: 'specialLvl',
    label: 'Special',
    displayer: SpecialLevelDisplayer,
  },
  cottonCandy: {
    key: 'cottonCandy',
    label: 'Cotton Candy',
    displayer: DetailedCottonCandyDisplayer,
  },
  support: {
    key: 'support',
    label: 'Support',
    displayer: SupportDisplayer,
  },
  potentials: {
    key: 'potentials',
    label: 'Potentials',
    displayer: PotentialsDisplayer,
  },
  potential: {
    key: 'potential',
    label: 'Specific Potential',
    displayer: SpecificPotentialDisplayer,
    input: SpecificPotentialDisplayerInput,
  },
  pirateFest: {
    key: 'pirateFest',
    label: 'Pirate Rumble',
    displayer: PirateFestDisplayer,
    input: PirateFestDisplayerInput,
  },
  coop: {
    key: 'coop',
    label: 'Coop',
    displayer: CoopDisplayer,
    input: CoopDisplayerInput,
  },
}
