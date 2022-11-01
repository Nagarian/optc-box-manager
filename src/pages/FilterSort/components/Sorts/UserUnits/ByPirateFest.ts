import { UserUnitSort } from 'models/search'

export const byPirateFestSpecial: UserUnitSort = (userUnit1, userUnit2) =>
  (userUnit1.pirateFest?.specialLvl ?? -1) -
  (userUnit2.pirateFest?.specialLvl ?? -1)

export const byPirateFestAbility: UserUnitSort = (userUnit1, userUnit2) =>
  (userUnit1.pirateFest?.abilityLvl ?? -1) -
  (userUnit2.pirateFest?.abilityLvl ?? -1)

export const byPirateFestGp: UserUnitSort = (userUnit1, userUnit2) =>
  (userUnit1.pirateFest?.gplvl ?? -1) -
  (userUnit2.pirateFest?.gplvl ?? -1)
