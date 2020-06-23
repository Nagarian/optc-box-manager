import { UserUnitSort } from 'models/search'
import { UserUnitLimitBreak } from 'models/userBox'

export const byLimitBreakLevel: UserUnitSort = (userUnit1, userUnit2) =>
  (userUnit1.limitBreak?.lvl ?? -1) - (userUnit2.limitBreak?.lvl ?? -1)

export const byLimitBreakLevelGameLike: UserUnitSort = (userUnit1, userUnit2) =>
  computeLvl(userUnit1.limitBreak) - computeLvl(userUnit2.limitBreak)

function computeLvl (userLimitBreak?: UserUnitLimitBreak) {
  if (!userLimitBreak) {
    return -1
  }

  const { lvl, lvlMax, keyLvlMax } = userLimitBreak

  if (lvl === lvlMax || lvl === keyLvlMax) {
    return 1000 + lvl
  }

  return lvl
}
