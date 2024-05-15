// @ts-check
import {
  aliases,
  evolutions,
  units,
  details,
  cooldowns,
  flags,
  gamewith,
} from './DBLoader.js'
import { applyDropLocation } from './dropExtracter.js'
import { getUnitThumbnail, getUnitFullPicture } from './image.js'
import { evolutionMap } from './evolution.js'
import {
  fixupDetail,
  fixupSpecificIssue,
  fixupImages,
  fixupEvolution,
  fixupFlags,
  fixupVsLastTapSuperTandem,
  fixupFestProperties,
} from './fixup.js'
import {
  globalOnlyWrongId,
  globalOnlyMissingInDb,
  checkGloJapMapping,
} from './glo-jap-remapper.js'
import { applyNewPirateRumble } from './pirateRumbleExtracter.js'

const getFamilyId = (
  /** @type import('../models/old-units').BaseUnit[] */ units,
  /** @type import('../models/old-units').BaseUnit */ unit,
) => {
  if (!unit.families) return -1

  return (
    units.findIndex(u =>
      u.families?.every(fam => unit.families?.includes(fam)),
    ) + 1
  )
}

/** @returns { import('../models/old-units').ExtendedUnit[] } */
function DBFactory() {
  const Details = details
  const Evolutions = evolutions
  const Cooldowns = cooldowns
  const Flags = flags
  const EvolutionMap = evolutionMap()

  let db = units
    .filter(unit => unit.name)
    // .filter(unit => unit.class !== 'Booster' && unit.class !== 'Evolver')
    .map(({ support, ...unit }) => {
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
        cooldown: Cooldowns[unit.number] ?? Details[dbId]?.specialCooldown,
        detail: fixupDetail(Details[dbId]),
        flags,
        family: {
          name: unit.families || undefined,
          id: getFamilyId(units, unit),
        },
        dropLocations: [],
        evolutionMap: EvolutionMap[dbId] ?? [dbId],
        aliases: aliases[dbId],
        gamewith: gamewith[unit.number] ?? undefined,
      }
    })
    .map(fixupSpecificIssue)

  checkGloJapMapping(db)

  db = db.filter(unit => !unit.name.includes('⚐') && !unit.name.includes('⚔'))

  db = db.concat(
    db
      .filter(u => !!globalOnlyMissingInDb[u.id])
      .map(u => ({ ...u, id: globalOnlyMissingInDb[u.id] })),
  )

  db = db
    .map(fixupImages)
    .map(fixupEvolution)
    .map(fixupFlags)
    .map(fixupFestProperties)
    .map(fixupVsLastTapSuperTandem)
    .map(applyDropLocation)
    .map(applyNewPirateRumble)

  db.sort((u1, u2) => u1.id - u2.id)
  return db
}

export const DB = DBFactory()
