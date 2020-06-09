import { ExtendedUnit } from 'models/units'
import { UserUnit, UserUnitSpecial } from 'models/userBox'
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
