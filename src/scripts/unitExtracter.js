// @ts-check
const {
  aliases,
  evolutions,
  units,
  details,
  cooldowns,
  flags,
  gamewith,
} = require('./DBLoader')
const { getDropLocations } = require('./dropExtracter')
const { getUnitThumbnail, getUnitFullPicture } = require('./image')
const { evolutionMap } = require('./evolution')
const { fixupDetail, fixupSpecificIssue, fixupImages, fixupEvolution, fixupFlags } = require('./fixup')
const { globalOnlyWrongId, globalOnlyMissingInDb, checkGloJapMapping } = require('./glo-jap-remapper')
const { applyNewPirateRumble } = require('./pirateRumbleExtracter')

const getFamilyId = (
  /** @type import('models/old-units').BaseUnit[] */ units,
  /** @type import('models/old-units').BaseUnit */ unit,
) => {
  if (!unit.families) return -1

  return units.findIndex(u => u.families?.every(fam => unit.families?.includes(fam))) + 1
}

/** @returns { import('models/old-units').ExtendedUnit[] } */
function DBFactory () {
  const Details = details
  const Evolutions = evolutions
  const Cooldowns = cooldowns
  const Flags = flags
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
          name: unit.families || undefined,
          id: getFamilyId(units, unit),
        },
        pirateFest: unit.pirateFest,
        dropLocations: getDropLocations(dbId, flags, EvolutionMap),
        evolutionMap: EvolutionMap[dbId] ?? [dbId],
        aliases: aliases[dbId],
        gamewith: gamewith[unit.number] ?? undefined,
      }
    })
    .map(fixupSpecificIssue)

  checkGloJapMapping(db)

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
