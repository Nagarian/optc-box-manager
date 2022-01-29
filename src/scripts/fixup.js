// @ts-check

const { globalOnlyReverseMap, globalOnly, globalOnlyMissingInDb } = require('./glo-jap-remapper')

/**
 * @typedef { ({ [key: string]: import("models/old-units").PotentialKey })} PotentialRenamedHash
 * @typedef { ({ [key: string]: import("models/old-units").UnitPirateFestStyle })} PirateFestRenamedHash
 */

/** @return { import("models/old-units").UnitDetail } */
function fixupDetail (
  /** @type { import("models/old-units").UnitDetail } */ detail,
) {
  // @ts-ignore
  if (!detail) return {}

  if (detail.potential?.length) {
    /** @type PotentialRenamedHash */
    const renamedPotentials = {
      'Enrage/Reduce Increase Damage Taken duration': 'Enrage',
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

/** @return { import("models/old-units").ExtendedUnit } */
function fixupVersusUnit (
  /** @type import("models/old-units").ExtendedUnit */ unit,
) {
  if (!unit.detail.VSCondition) {
    return unit
  }

  /** @type any */
  const untyped = unit
  const format = (/** @type any */ obj) => `**Character 1:** ${obj.character1}<br/>**Character 2:** ${obj.character2}`

  return {
    ...unit,
    class: [[], ...untyped.class],
    pirateFest: {
      class: untyped.pirateFest.class,
      DEF: 0,
      SPD: 0,
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
      festAbility: untyped.detail.festAbility?.character1.map(
        (/** @type any */ desc, /** @type number */ i) => ({
          description: format({
            character1: desc.description,
            character2: untyped.detail.festAbility.character2[i].description,
          }),
        }),
      ),
      festSpecial: untyped.detail.festSpecial?.character1.map(
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

/** @return { import("models/old-units").ExtendedUnit } */
function fixupImages (
  /** @type import("models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("models/old-units").ExtendedUnit[] */ units,
) {
  if (unit.id < 5001 || unit.id > 5008) {
    return unit
  }

  return {
    ...unit,
    images: {
      ...unit.images,
      thumbnail: `characters/${unit.id}.png`,
    },
  }
}

/** @return { import("models/old-units").ExtendedUnit } */
function fixupEvolution (
  /** @type import("models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("models/old-units").ExtendedUnit[] */ units,
) {
  if (unit.id < 5001) {
    return unit
  }

  return {
    ...unit,
    evolutionMap: unit.evolutionMap.map(id => globalOnlyReverseMap[id] ?? id),
    evolution: unit.evolution && {
      ...unit.evolution,
      evolution: Array.isArray(unit.evolution.evolution)
        ? unit.evolution.evolution.map(id => globalOnlyReverseMap[id])
        : globalOnlyReverseMap[unit.evolution.evolution] ?? unit.evolution.evolution,
    },
  }
}

/** @return { import("models/old-units").ExtendedUnit } */
function fixupFlags (
  /** @type import("models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("models/old-units").ExtendedUnit[] */ units,
) {
  return {
    ...unit,
    flags: {
      ...unit.flags,
      gloOnly: globalOnly[unit.id] ? 1 : undefined,
      japOnly: globalOnlyMissingInDb[unit.id] ? 1 : undefined,
    },
  }
}

/** @return { import("models/old-units").ExtendedUnit } */
function fixupSpecificIssue (
  /** @type import("models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("models/old-units").ExtendedUnit[] */ units,
) {
  if (unit.id === 2831 || unit.id === 2999 || unit.id === 3098) {
    // @ts-ignore
    if (unit.detail.sailor.character1 === null) {
      // @ts-ignore
      delete unit.detail.sailor.character1
      // @ts-ignore
      delete unit.detail.sailor.character2
      // @ts-ignore
      delete unit.detail.sailor.combined
    } else {
      console.warn(`issue with unit ${unit.id} has been fixed`)
    }
  }

  if (unit.evolutionMap?.includes(2784)) {
    // Lucci 6+
    if (unit.dbId === 1763) {
      return {
        ...unit,
        evolutionMap: [...unit.evolutionMap, 5016],
        evolution: {
          evolution: [2784, 5016],
          evolvers: [
            ['skullQCK', 'skullQCK', 'skullQCK', 1180, 301],
            ['skullQCK', 'skullQCK', 'skullQCK', 1180, 301],
          ],
        },
      }
    }

    return {
      ...unit,
      evolutionMap: [...unit.evolutionMap, 5016],
    }
  }

  if (unit.evolutionMap?.includes(2830)) {
    // Robin 6+
    if (unit.dbId === 1951) {
      return {
        ...unit,
        evolutionMap: [...unit.evolutionMap, 5062],
        evolution: {
          evolution: [2830, 5062],
          evolvers: [
            ['skullPSY', 'skullINT', 99, 304, 267],
            ['skullPSY', 'skullINT', 99, 304, 267],
          ],
        },
      }
    }

    return {
      ...unit,
      evolutionMap: [...unit.evolutionMap, 5062],
    }
  }

  return unit
}

function removeProp (
  /** @type any */ obj,
  /** @type string */ badName,
  /** @type string */ realName,
) {
  if (obj[badName]) {
    obj[realName] = obj[badName]
    delete obj[badName]
  }
}

/**
 * @param {import("../models/old-units").ExtendedUnit} unit
 * @param {string} name
 * @returns {import("../models/old-units").ExtendedUnit}
 */
// @ts-ignore
const copy = (unit, name) => ({
  name: name,
  class: unit.class,
  detail: { ...unit.detail },
  images: { ...unit.images }
})

module.exports = {
  fixupDetail,
  fixupVersusUnit,
  fixupImages,
  fixupEvolution,
  fixupFlags,
  fixupSpecificIssue,
  removeProp,
}
