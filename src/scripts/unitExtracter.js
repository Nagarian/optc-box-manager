// @ts-check
const {
  evolutions,
  units,
  details,
  cooldowns,
  flags,
  families,
} = require('./DBLoader')
const { getDropLocations } = require('./dropExtracter')
const { getUnitThumbnail, getUnitFullPicture } = require('./image')
const { evolutionMap } = require('./evolution')
const { fixupDetail, fixupPirateFestStyle, fixupVersusUnit } = require('./fixup')

const getFamilyId = (
  /** @type import('models/units').UnitFamily[] */ families,
  /** @type number */ unitId,
) => {
  const family = families[unitId]

  if (!family) return -1

  if (Array.isArray(family)) {
    return families.findIndex(
      f => Array.isArray(f) && f.every(fam => family.includes(fam)),
    )
  }

  return families.findIndex(u => u === family) + 1
}

/** @returns { import('models/units').ExtendedUnit[] } */
function DBFactory () {
  const Details = details
  const Evolutions = evolutions
  const Cooldowns = cooldowns
  const Flags = flags
  const Families = families
  const EvolutionMap = evolutionMap()

  return units
    .filter(
      unit =>
        unit.name &&
        !unit.name.includes('Limit Break') &&
        !unit.name.includes('Dual Unit'),
    )
    .filter(unit => unit.class !== 'Booster' && unit.class !== 'Evolver')
    .map(unit => {
      const id = unit.number + 1
      const flags = Flags[id] ?? {}

      return {
        ...unit,
        id,
        images: {
          thumbnail: getUnitThumbnail(id),
          full: getUnitFullPicture(id),
        },
        evolution: Evolutions[id],
        cooldown: Cooldowns[unit.number],
        detail: fixupDetail(Details[id]),
        flags,
        family: {
          name: Families[unit.number],
          id: getFamilyId(Families, unit.number),
        },
        pirateFest: {
          class: fixupPirateFestStyle(unit.pirateFest.class),
        },
        dropLocations: getDropLocations(id, flags, EvolutionMap),
        evolutionMap: EvolutionMap[id] ?? [id],
      }
    })
    .map(fixupVersusUnit)
}

const DB = DBFactory()

module.exports = {
  DB,
}
