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
const { globalOnlyWrongId, globalOnlyMissingInDb } = require('./glo-jap-remapper')

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

  let db = units
    .filter(
      unit =>
        unit.name &&
        !unit.name.includes('Limit Break') &&
        !unit.name.includes('Dual Unit'),
    )
    .filter(unit => unit.class !== 'Booster' && unit.class !== 'Evolver')
    .map(unit => {
      const dbId = unit.number + 1
      const flags = Flags[dbId] ?? {}

      return {
        ...unit,
        id: globalOnlyWrongId[dbId] ?? dbId,
        dbId,
        images: {
          thumbnail: getUnitThumbnail(dbId),
          full: getUnitFullPicture(dbId),
        },
        evolution: Evolutions[dbId],
        cooldown: Cooldowns[unit.number],
        detail: fixupDetail(Details[dbId]),
        flags,
        family: {
          name: Families[unit.number],
          id: getFamilyId(Families, unit.number),
        },
        pirateFest: {
          class: fixupPirateFestStyle(unit.pirateFest.class),
        },
        dropLocations: getDropLocations(dbId, flags, EvolutionMap),
        evolutionMap: EvolutionMap[dbId] ?? [dbId],
      }
    })
    .map(fixupVersusUnit)

  db = db.concat(db
    .filter(u => !!globalOnlyMissingInDb[u.id])
    .map(u => ({ ...u, id: globalOnlyMissingInDb[u.id] })),
  )
  db.sort((u1, u2) => u1.id - u2.id)
  return db
}

const DB = DBFactory()

module.exports = {
  DB,
}
