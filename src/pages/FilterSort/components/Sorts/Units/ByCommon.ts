import { UnitSort } from 'models/search'

export const byFamily: UnitSort = (unit1, unit2) =>
  unit1.family.id - unit2.family.id

export const byId: UnitSort = (unit1, unit2) => unit1.id - unit2.id

export const byLBLvlMax: UnitSort = (unit1, unit2) =>
  (unit1.detail.limit?.length ?? 0) - (unit2.detail.limit?.length ?? 0)
