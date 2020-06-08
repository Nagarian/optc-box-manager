import { UserUnitSort } from 'models/search'

export const bySupportLvl: UserUnitSort = (userUnit1, userUnit2) =>
  (userUnit1.support?.lvl ?? -1) - (userUnit2.support?.lvl ?? -1)
