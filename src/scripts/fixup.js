// @ts-check

/**
 * @typedef { ({ [key: string]: import("models/units").PotentialKey })} PotentialRenamedHash
 * @typedef { ({ [key: string]: import("models/units").UnitPirateFestStyle })} PirateFestRenamedHash
 */

/** @return { import("models/units").UnitDetail } */
function fixupDetail (
  /** @type { import("models/units").UnitDetail } */ detail,
) {
  // @ts-ignore
  if (!detail) return {}

  if (detail.potential?.length) {
    /** @type PotentialRenamedHash */
    const renamedPotentials = {
      'Enrage/Increase Damage Taken reduction': 'Enrage',
      'Enrage/Reduce Increase Damage Taken duration': 'Enrage',
      'Nutrition/Reduce Hunger duration': 'Nutrition/Hunger reduction',
    }

    if (detail.potential.some(p => !!renamedPotentials[p.Name])) {
      detail.potential = detail.potential.map(p => ({
        ...p,
        Name: renamedPotentials[p.Name] ?? p.Name,
      }))
    }
  }

  return detail
}

/** @return { import("models/units").UnitPirateFestStyle | undefined } */
function fixupPirateFestStyle (
  /** @type { (string | undefined)} */ pirateFestStyle,
) {
  if (!pirateFestStyle) {
    return undefined
  }

  /** @type PirateFestRenamedHash */
  const renamed = {
    Obstructer: 'DBF',
  }

  return renamed[pirateFestStyle] ?? pirateFestStyle
}

/** @return { import("models/units").ExtendedUnit } */
function fixupVersusUnit (
  /** @type import("models/units").ExtendedUnit */ unit) {
  if (![3134, 3135].includes(unit.id)) {
    return unit
  }

  /** @type any */
  const untyped = unit
  const format = (/** @type any */ obj) => `**Kaido:** ${obj.character1}<br/>**Big Mom:** ${obj.character2}`

  return {
    ...unit,
    class: [[], ...untyped.class],
    pirateFest: {
      class: untyped.pirateFest.class[0],
    },
    detail: {
      ...untyped.detail,
      captain: {
        ...untyped.detail.captain,
        combined: format(untyped.detail.captain),
      },
      special: format(untyped.detail.special),
      sailor: {
        ...untyped.detail.sailor,
        combined: untyped.detail.sailor.character1,
      },
      festAbility: untyped.detail.festAbility.character1.map(
        (/** @type any */ desc, /** @type number */ i) => ({
          description: format({
            character1: desc.description,
            character2: untyped.detail.festAbility.character2[i].description,
          }),
        }),
      ),
      festSpecial: untyped.detail.festSpecial.character1.map(
        (/** @type any */ desc, /** @type number */ i) => ({
          description: format({
            character1: desc.description,
            character2: untyped.detail.festSpecial.character2[i].description,
          }),
          /** @type any */
          cooldown: `${desc.cooldown} / ${untyped.detail.festSpecial.character2[i].cooldown}`,
        }),
      ),
    },
  }
}

module.exports = {
  fixupDetail,
  fixupPirateFestStyle,
  fixupVersusUnit,
}
