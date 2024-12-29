import { ExtendedUnit, LimitBreak, PotentialKey, UnitStar } from 'models/units'
import {
  UserUnit,
  UserUnitBulkEdit,
  UserUnitBulkEditLimitBreakState,
  UserUnitLevel,
  UserUnitLimitBreak,
  UserUnitPotentialAbility,
  UserUnitPotentialAbilityKeyState,
  UserUnitPowerSocket,
  UserUnitSpecial,
} from 'models/userBox'
import {
  globalOnlyMissingInDb,
  gloToJapConverter,
} from 'scripts/glo-jap-remapper-proxy'
import { v4 as uuid } from 'uuid'

export function UserUnitFactory(unit: ExtendedUnit): UserUnit {
  return {
    id: uuid(),
    unit,
    potentials:
      unit.detail.potential?.map(potential => ({
        type: potential.Name,
        lvl: 1,
        keyState: getPotentialState(potential.Name, 0, unit.detail.limit),
      })) ?? [],
    limitBreak: UserUnitLimitBreakFactory(unit.detail.limit),
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
    pirateFest:
      unit.detail.festAbility && unit.detail.festSpecial
        ? {
            abilityLvl: 1,
            specialLvl: 1,
            gplvl: unit.detail.festGPBurst ? 1 : undefined,
          }
        : undefined,
    sockets: Array<UserUnitPowerSocket>(
      Math.max(unit.slots, unit.limitSlot, unit.limitexSlot),
    ).fill({ type: undefined, lvl: 0 }),
    ink:
      unit.flags.inkable || unit.stars === '6+' || unit.stars === 6
        ? { lvl: 0 }
        : undefined,
    level: {
      lvl: 1,
      lvlMax: unit.maxLevel,
      limitLvl: unit.maxLevel >= 99 ? 0 : undefined,
      limitStepLvl: unit.maxLevel >= 99 ? 0 : undefined,
    },
    coop: {
      dupeConsumed: 0,
      luck: 0,
      captain: 0,
      special: 0,
    },
  }
}

const UserUnitLimitBreakFactory = (
  limitBreak?: LimitBreak[],
): UserUnitLimitBreak | undefined => {
  if (!limitBreak?.length) {
    return undefined
  }

  const keyIndex = limitBreak.findIndex(lb =>
    lb.description.startsWith('LOCKED WITH KEY'),
  )

  return {
    lvl: 0,
    lvlMax: keyIndex === -1 ? limitBreak.length : keyIndex,
    keyLvlMax: keyIndex === -1 ? undefined : limitBreak.length,
  }
}

const superEvolution: UnitStar[] = ['4+', '5+', '6+']

export function Evolve(userUnit: UserUnit, evolution?: ExtendedUnit): UserUnit {
  if (!evolution) {
    return userUnit
  }

  const template = UserUnitFactory(evolution)
  const isSuperEvolution =
    superEvolution.includes(userUnit.unit.stars) ||
    superEvolution.includes(evolution.stars)

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
    limitBreak: userUnit.limitBreak ?? template.limitBreak,
    pirateFest: userUnit.pirateFest ?? template.pirateFest,
    sockets: template.sockets.map((s, i) => userUnit.sockets[i] ?? s),
    ink: userUnit.ink ?? template.ink,
    level: isSuperEvolution ? userUnit.level : template.level,
    coop: {
      ...userUnit.coop,
      luck: 0,
    },
  }
}

function computeSpecialReset(
  base: UserUnit,
  evolved: UserUnit,
): UserUnitSpecial | undefined {
  if (!base.special || !evolved.special) {
    return evolved.special
  }

  if (superEvolution.includes(evolved.unit.stars)) {
    // super evolution doesn't reset
    return base.special
  }

  if (evolved.unit.detail.specialName !== base.unit.detail.specialName) {
    // handle case of old units that reset their special when they evolved like Usopp Golden Pound
    return evolved.special
  }

  // by prevention of optc-db issue with cooldown definition, we re-compute to avoid over-range
  return {
    lvlMax: evolved.special.lvlMax,
    lvl:
      base.special.lvl > evolved.special.lvlMax
        ? evolved.special.lvlMax
        : base.special.lvl,
  }
}

export function ConsumeUnitDupe(userUnit: UserUnit): UserUnit {
  const updated: UserUnit = {
    ...userUnit,
    coop: {
      ...userUnit.coop,
      dupeConsumed: userUnit.coop.dupeConsumed + 1,
      luck:
        userUnit.coop.luck +
        (userUnit.unit.dropLocations.includes('legend')
          ? 2
          : userUnit.unit.dropLocations.includes('rarerecruit') &&
              userUnit.unit.maxLevel >= 99
            ? 1
            : 0),
    },
  }

  if (
    userUnit.level.limitStepLvl !== undefined &&
    userUnit.level.limitStepLvl < 9
  ) {
    const newStepLvl = userUnit.level.limitStepLvl + 1
    updated.level = {
      ...userUnit.level,
      lvlMax: levelLBMaxLevel[levelLBFromStepLevel[newStepLvl]],
      limitLvl: levelLBFromStepLevel[newStepLvl],
      limitStepLvl: newStepLvl,
    }
  }

  if (userUnit.support && userUnit.support.lvl < 5) {
    updated.support = {
      ...updated.support,
      lvl: userUnit.support.lvl + 1,
    }
  }

  if (userUnit.special && userUnit.special.lvl < userUnit.special.lvlMax) {
    updated.special = {
      ...userUnit.special,
      lvl: userUnit.special.lvl + 1,
    }
  }

  const potentialToUpgrade =
    userUnit.potentials.find(
      p =>
        [
          'Rush',
          'Last Tap / Super Tandem',
          'Last Tap',
          'Super Tandem',
        ].includes(p.type) && p.lvl < 5,
    ) ?? userUnit.potentials.find(p => p.lvl < 5)
  if (potentialToUpgrade && !userUnit.unit.dropLocations.includes('legend')) {
    updated.potentials = userUnit.potentials.map(p =>
      p === potentialToUpgrade ? { ...p, lvl: p.lvl + 1 } : p,
    )
  }

  return updated
}

export function applyEdit(
  userUnit: UserUnit,
  edit: UserUnitBulkEdit,
  db: ExtendedUnit[],
) {
  const updated = {
    ...userUnit,
  }

  if (edit.levelState === 'max') {
    updated.level = {
      ...updated.level,
      lvl: updated.unit.maxLevel,
    }
  }

  if (edit.levelState === 'postlbmax') {
    updated.level = {
      ...updated.level,
      lvl: updated.level.lvlMax,
    }
  }

  if (edit.levelState === 'lbmax' && updated.level.limitLvl !== undefined) {
    updated.level = {
      ...updated.level,
      lvlMax: 150,
      limitLvl: 5,
      limitStepLvl: 9,
    }
  }

  if (edit.limitBreakState && updated.potentials.length > 0) {
    updated.potentials = updated.potentials.map(p =>
      editPotential(p, edit.limitBreakState),
    )

    if (updated.limitBreak) {
      updated.limitBreak = {
        ...updated.limitBreak,
        lvl: editLimitBreak(updated.limitBreak, edit.limitBreakState),
      }
    }
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

  if (
    edit.idConverter === 'toGlobal' &&
    globalOnlyMissingInDb[userUnit.unit.id]
  ) {
    const newUnit = db.find(
      u => u.id === globalOnlyMissingInDb[userUnit.unit.id],
    )

    if (newUnit) {
      updated.unit = newUnit
    }
  }

  if (edit.idConverter === 'toJapan' && gloToJapConverter[userUnit.unit.id]) {
    const newUnit = db.find(u => u.id === gloToJapConverter[userUnit.unit.id])

    if (newUnit) {
      updated.unit = newUnit
    }
  }

  return updated
}

function editPotential(
  userPotential: UserUnitPotentialAbility,
  state?: UserUnitBulkEditLimitBreakState,
): UserUnitPotentialAbility {
  switch (state) {
    case 'max':
      return {
        ...userPotential,
        lvl: userPotential.keyState ? 0 : 1,
      }
    case 'rainbow':
      return {
        ...userPotential,
        lvl: userPotential.keyState ? 0 : 5,
      }
    case 'max+':
      return {
        ...userPotential,
        lvl: 1,
        keyState: userPotential.keyState ? 'unlocked' : undefined,
      }
    case 'rainbow+':
      return {
        ...userPotential,
        lvl: 5,
        keyState: userPotential.keyState ? 'unlocked' : undefined,
      }
    default:
      return userPotential
  }
}

function editLimitBreak(
  limitBreak: UserUnitLimitBreak,
  state?: UserUnitBulkEditLimitBreakState,
): number {
  switch (state) {
    case 'max':
    case 'rainbow':
      return limitBreak.lvlMax
    case 'max+':
    case 'rainbow+':
      return limitBreak.keyLvlMax ?? limitBreak.lvlMax
    default:
      return limitBreak.lvl
  }
}

export function resync(userUnit: UserUnit) {
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
    const renamedPotentials: Record<string, PotentialKey> = {
      Enrage: 'Enrage/Reduce Increase Damage Taken duration',
      'Nutrition/Reduce Hunger duration': 'Nutrition/Reduce Hunger stacks',
    }

    updated.potentials = compare.potentials.map(({ type, lvl }) => {
      const updatedLvl =
        userUnit.potentials.find(
          p =>
            (renamedPotentials[p.type] ?? p.type) ===
            (renamedPotentials[type] ?? type),
        )?.lvl || lvl
      return {
        type: renamedPotentials[type] ?? type,
        lvl: updatedLvl,
        keyState: getPotentialState(
          type,
          updatedLvl,
          userUnit.unit.detail.limit,
        ),
      }
    })
    isUpdated = true
  }

  if (
    userUnit.limitBreak?.keyLvlMax !== compare.limitBreak?.keyLvlMax ||
    userUnit.limitBreak?.lvlMax !== compare.limitBreak?.lvlMax
  ) {
    if (compare.limitBreak) {
      updated.limitBreak = {
        ...compare.limitBreak,
        lvl: userUnit.limitBreak?.lvl ?? 0,
      }

      isUpdated = true
    }
  }

  if (!userUnit.pirateFest && compare.pirateFest) {
    updated.pirateFest = compare.pirateFest
    isUpdated = true
  }

  if (
    (userUnit.pirateFest?.abilityLvl ?? 0) <
      (compare.pirateFest?.abilityLvl ?? 0) ||
    (userUnit.pirateFest?.specialLvl ?? 0) <
      (compare.pirateFest?.specialLvl ?? 0) ||
    (userUnit.pirateFest?.gplvl ?? 0) < (compare.pirateFest?.gplvl ?? 0)
  ) {
    updated.pirateFest = {
      abilityLvl: Math.max(
        updated.pirateFest?.abilityLvl ?? 0,
        compare.pirateFest?.abilityLvl ?? 0,
      ),
      specialLvl: Math.max(
        updated.pirateFest?.specialLvl ?? 0,
        compare.pirateFest?.specialLvl ?? 0,
      ),
      gplvl: compare.pirateFest?.gplvl
        ? Math.max(
            updated.pirateFest?.gplvl ?? 0,
            compare.pirateFest?.gplvl ?? 0,
          )
        : undefined,
    }

    isUpdated = true
  }

  if (!userUnit.sockets || userUnit.sockets.length !== compare.sockets.length) {
    updated.sockets = compare.sockets.map((s, i) => userUnit.sockets?.[i] ?? s)
    isUpdated = true
  }

  if (!userUnit.ink && !!compare.ink) {
    updated.ink = compare.ink
    isUpdated = true
  }

  if (!userUnit.level && !!compare.level) {
    updated.level = compare.level
    isUpdated = true
  }

  if (!userUnit.coop) {
    updated.coop = {
      dupeConsumed: userUnit.level.limitStepLvl ?? 0,
      luck: 0,
      captain: 0,
      special: 0,
    }

    isUpdated = true
  }

  if (
    !updated.coop.dupeConsumed ||
    updated.coop.dupeConsumed < (updated.level.limitStepLvl ?? 0)
  ) {
    updated.coop = {
      ...updated.coop,
      dupeConsumed: updated.level.limitStepLvl ?? 0,
    }

    isUpdated = true
  } else if (
    updated.level.limitStepLvl !== undefined &&
    updated.level.limitStepLvl < updated.coop.dupeConsumed &&
    updated.coop.dupeConsumed < 9
  ) {
    updated.level = getUserUnitLevel({
      level: userUnit.level.lvl,
      stepLevel: updated.coop.dupeConsumed,
    })

    isUpdated = true
  }

  const luckLevel = getUserUnitLuck(updated)

  if (userUnit.coop.luck < luckLevel) {
    updated.coop = {
      ...updated.coop,
      luck: luckLevel,
    }

    isUpdated = true
  }

  return isUpdated ? updated : userUnit
}

function arrayEqual<T>(array1: T[], array2: T[]) {
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

  const keyIndex = limitBreak.findIndex(lb =>
    lb.description.startsWith('LOCKED WITH KEY'),
  )

  if (keyIndex === -1) {
    return undefined
  }

  if (lbIndex < keyIndex) {
    return undefined
  }

  return lvl === 0 ? 'locked' : 'unlocked'
}

function getUserUnitLuck(userUnit: UserUnit) {
  const base = Math.trunc(userUnit.level.lvl / 5)
  if (userUnit.unit.dropLocations.includes('legend')) {
    return base + userUnit.coop.dupeConsumed * 2
  }

  if (userUnit.unit.dropLocations.includes('rarerecruit')) {
    return base + userUnit.coop.dupeConsumed * 1
  }

  return base
}

const levelLBFromStepLevel = [0, 1, 2, 2, 3, 3, 4, 4, 4, 5]
const levelLBMaxLevel = [99, 105, 110, 120, 130, 150]
export function getUserUnitLevel({
  level,
  stepLevel,
}: {
  level: number
  stepLevel: number
}): UserUnitLevel {
  return {
    lvl: level,
    lvlMax: levelLBMaxLevel[levelLBFromStepLevel[stepLevel]],
    limitLvl: levelLBFromStepLevel[stepLevel],
    limitStepLvl: stepLevel,
  }
}
