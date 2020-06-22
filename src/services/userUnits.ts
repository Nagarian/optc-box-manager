import { ExtendedUnit, PotentialKey, LimitBreak } from 'models/units'
import {
  UserUnit,
  UserUnitSpecial,
  UserUnitBulkEdit,
  UserUnitPotentialAbilityKeyState,
  UserUnitBulkEditLimitBreakState,
  UserUnitPotentialAbility,
} from 'models/userBox'
import { v4 as uuid } from 'uuid'

export function UserUnitFactory (unit: ExtendedUnit): UserUnit {
  return {
    id: uuid(),
    unit,
    potentials:
      unit.detail.potential?.map(potential => ({
        type: potential.Name,
        lvl: 0,
        keyState: getPotentialState(potential.Name, 0, unit.detail.limit),
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
      lvl: editLimitBreak(p, edit.limitBreakState),
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

function editLimitBreak (
  userPotential: UserUnitPotentialAbility,
  state?: UserUnitBulkEditLimitBreakState,
): number {
  switch (state) {
    case 'max':
      return userPotential.keyState ? 0 : 1
    case 'rainbow':
      return userPotential.keyState ? 0 : 5
    case 'max+':
      return 1
    case 'rainbow+':
      return 5
    default:
      return userPotential.lvl
  }
}

export function resync (userUnit: UserUnit) {
  const updated = { ...userUnit }
  const compare = UserUnitFactory(userUnit.unit)
  let isUpdated = false

  if (userUnit.special?.lvlMax !== compare.special?.lvlMax && compare.special) {
    updated.special = {
      ...compare.special,
      lvl: Math.min(
        userUnit.special?.lvl ?? compare.special.lvl,
        compare.special.lvlMax,
      ),
    }

    isUpdated = true
  }

  if (!userUnit.support && !!compare.support) {
    updated.support = compare.support
    isUpdated = true
  }

  if (!arrayEqual(userUnit.potentials, compare.potentials)) {
    updated.potentials = compare.potentials.map(({ type, lvl }) => {
      const updatedLvl = userUnit.potentials.find(p => p.type === type)?.lvl ?? lvl
      return ({
        type,
        lvl: updatedLvl,
        keyState: getPotentialState(type, updatedLvl, userUnit.unit.detail.limit),
      })
    })
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

const getPotentialState = (
  key: PotentialKey,
  lvl: number,
  limitBreak: LimitBreak[] = [],
): UserUnitPotentialAbilityKeyState => {
  const lbIndex = limitBreak.findIndex(lb => lb.description.includes(key))

  if (lbIndex === -1) {
    return undefined
  }

  const keyIndex = limitBreak.findIndex(
    lb => lb.description === 'LOCKED WITH KEY',
  )

  if (keyIndex === -1) {
    return undefined
  }

  if (lbIndex < keyIndex) {
    return undefined
  }

  return lvl === 0 ? 'locked' : 'unlocked'
}
