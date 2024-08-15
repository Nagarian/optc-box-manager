import { Search, SearchOptionInputProps } from 'models/search'
import { UserBox } from 'models/userBox'
import { FunctionComponent } from 'react'
import {
  BoxStatistics,
  BoxStatisticsInput,
  BoxStatisticsOption,
} from './BoxStatistics'

type BoxDisplayerOptions = {
  boxStatistics: BoxStatisticsOption
}

export type SearchBoxDisplayerType = keyof BoxDisplayerOptions

export interface SearchBoxDisplayerCriteria<T = unknown> {
  type: SearchBoxDisplayerType
  options?: T
}

export type SearchBoxDisplayerProps<T = unknown> = {
  search?: Search
  userBox: UserBox
}

export const SearchBoxDisplayerBuilder: {
  [key in SearchBoxDisplayerType]: {
    key: key
    label: string
    displayer: FunctionComponent<
      SearchBoxDisplayerProps<BoxDisplayerOptions[key]>
    >
    input?: FunctionComponent<SearchOptionInputProps<BoxDisplayerOptions[key]>>
  }
} = {
  boxStatistics: {
    key: 'boxStatistics',
    label: 'Box statistics',
    displayer: BoxStatistics,
    input: BoxStatisticsInput,
  },
}
