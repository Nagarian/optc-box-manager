// @ts-check
const {
  aliases,
  evolutions,
  units,
  details,
  cooldowns,
  flags,
  families,
  gamewith,
} = require('./DBLoader')
const { getDropLocations } = require('./dropExtracter')
const { getUnitThumbnail, getUnitFullPicture } = require('./image')
const { evolutionMap } = require('./evolution')
const { fixupDetail, fixupDualVersusMapping, fixupSpecificIssue, fixupImages, fixupEvolution, fixupFlags } = require('./fixup')
const { globalOnlyWrongId, globalOnlyMissingInDb, globalOnly } = require('./glo-jap-remapper')
const dualMap = require('../models/optcdb-dual-units.json')
const { applyNewPirateRumble } = require('./pirateRumbleExtracter')

const getFamilyId = (
  /** @type import('models/old-units').UnitFamily[] */ families,
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

/** @returns { import('models/old-units').ExtendedUnit[] } */
function DBFactory () {
  const Details = details
  const Evolutions = evolutions
  const Cooldowns = cooldowns
  const Flags = flags
  const Families = families
  const EvolutionMap = evolutionMap()

  let db = units
    .filter(unit => unit.name)
    // .filter(unit => unit.class !== 'Booster' && unit.class !== 'Evolver')
    .map(unit => {
      const dbId = unit.number + 1
      const gameId = globalOnlyWrongId[dbId] ?? dbId
      const flags = Flags[dbId] ?? {}

      return {
        ...unit,
        id: gameId,
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
        pirateFest: unit.pirateFest,
        dropLocations: getDropLocations(dbId, flags, EvolutionMap),
        evolutionMap: EvolutionMap[dbId] ?? [dbId],
        aliases: aliases[dbId],
        gamewith: gamewith[unit.number] ?? undefined,
      }
    })
    .map(fixupDualVersusMapping)
    .map(fixupSpecificIssue)

  for (const [id, name] of dualMap) {
    const unit = db.find(u => u.dbId === id)
    if (!unit) throw new Error(`unit ${id} ${name} can't be find`)
    if (unit.name !== name) throw new Error(`unit ${unit.dbId} "${unit.name}" has not the right name which should be "${name}"`)
  }

  db = db.filter(unit =>
    !unit.name.includes('Dual Unit') &&
    !unit.name.includes('VS Unit'),
  )

  db = db.concat(db
    .filter(u => !!globalOnlyMissingInDb[u.id])
    .map(u => ({ ...u, id: globalOnlyMissingInDb[u.id] })),
  )

  db = db
    .map(fixupImages)
    .map(fixupEvolution)
    .map(fixupFlags)
    .map(applyNewPirateRumble)

  db.sort((u1, u2) => u1.id - u2.id)
  return db
}

const DB = DBFactory()

module.exports = {
  DB,
}
