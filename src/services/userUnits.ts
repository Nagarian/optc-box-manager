import { ExtendedUnit } from 'models/units'
import { UserUnit, UserUnitSpecial, UserUnitBulkEdit } from 'models/userBox'
import { v4 as uuid } from 'uuid'

export function UserUnitFactory (unit: ExtendedUnit): UserUnit {
  return {
    id: uuid(),
    unit,
    potentials:
      unit.detail.potential?.map(potential => ({
        type: potential.Name,
        lvl: 0,
      })) ?? [],
    special: unit.cooldown && {
      lvl: 1,
      lvlMax: unit.cooldown ? unit.cooldown[0] - unit.cooldown[1] + 1 : 1,
    },
    support:
      unit.detail.support?.length > 0
        ? {
          lvl: 0,
        }
        : undefined,
    cc: {
      hp: 0,
      atk: 0,
      rcv: 0,
    },
  }
}

export function Evolve (userUnit: UserUnit, evolution?: ExtendedUnit): UserUnit {
  if (!evolution) {
    return userUnit
  }

  const template = UserUnitFactory(evolution)

  return {
    id: userUnit.id,
    unit: evolution,
    cc: userUnit.cc,
    support: userUnit.support ?? template.support,
    special: computeSpecialReset(userUnit, template),
    potentials: template.potentials.map(p => ({
      ...p,
      lvl: userUnit.potentials.find(pp => pp.type === p.type)?.lvl ?? p.lvl,
    })),
  }
}

function computeSpecialReset (
  base: UserUnit,
  evolved: UserUnit,
): UserUnitSpecial | undefined {
  if (!base.special || !evolved.special) {
    return evolved.special
  }

  if (evolved.unit.stars.toString().includes('+')) {
    // super evolution doesn't reset
    return base.special
  }

  if (evolved.unit.detail.specialName !== base.unit.detail.specialName) {
    // handle case of old units that reset their special when they evolved like Usopp Golden Pound
    return evolved.special
  }

  // by prevention of optc-db issue with cooldown definition, we re-compute to avoid over-range
  return {
    lvlMax: evolved.special!.lvlMax,
    lvl:
      base.special.lvl > evolved.special.lvlMax
        ? evolved.special.lvlMax
        : base.special.lvl,
  }
}

export function applyEdit (userUnit: UserUnit, edit: UserUnitBulkEdit) {
  const updated = {
    ...userUnit,
  }

  if (edit.limitBreakState && updated.potentials.length > 0) {
    updated.potentials = updated.potentials.map(p => ({
      ...p,
      lvl: edit.limitBreakState === 'rainbow' ? 5 : 1,
    }))
  }

  if (edit.supportLvl && updated.support) {
    updated.support.lvl = edit.supportLvl
  }

  if (edit.cottonCandies) {
    if (edit.cottonCandies.atk) {
      updated.cc.atk = edit.cottonCandies.atk
    }
    if (edit.cottonCandies.hp) {
      updated.cc.hp = edit.cottonCandies.hp
    }
    if (edit.cottonCandies.rcv) {
      updated.cc.rcv = edit.cottonCandies.rcv
    }
  }

  return updated
}

export function resync (userUnit: UserUnit) {
  const updated = { ...userUnit }
  const compare = UserUnitFactory(userUnit.unit)
  let isUpdated = false

  if (userUnit.special?.lvlMax !== compare.special?.lvlMax && compare.special) {
    updated.special = {
      ...compare.special,
      lvl: Math.min(userUnit.special?.lvl ?? compare.special.lvl, compare.special.lvlMax),
    }

    isUpdated = true
  }

  if (!userUnit.support && !!compare.support) {
    updated.support = compare.support
    isUpdated = true
  }

  if (!arrayEqual(userUnit.potentials, compare.potentials)) {
    updated.potentials = compare.potentials.map(({ type, lvl }) => ({
      type,
      lvl: userUnit.potentials.find(p => p.type === type)?.lvl ?? lvl,
    }))
    isUpdated = true
  }

  return isUpdated ? updated : userUnit
}

function arrayEqual<T> (array1: T[], array2: T[]) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  )
}
