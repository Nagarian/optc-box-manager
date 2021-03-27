import { UserUnitSort } from 'models/search'

export const byInkLvl: UserUnitSort = (userUnit1, userUnit2) =>
  (userUnit1.ink?.lvl ?? -1) - (userUnit2.ink?.lvl ?? -1)
