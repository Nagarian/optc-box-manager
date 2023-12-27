global.window = {}
await import('../optcdb/common/js/unitUtils.js')
global.UnitUtils = window.UnitUtils
await import('../optcdb/common/data/aliases.js')
await import('../optcdb/common/data/cooldowns.js')
await import('../optcdb/common/data/evolutions.js')
await import('../optcdb/common/data/families.js')
await import('../optcdb/common/data/festival.js')
await import('../optcdb/common/data/flags.js')
await import('../optcdb/common/data/units.js')
await import('../optcdb/common/js/utils.js')
await import('../optcdb/common/data/details.js')
await import('../optcdb/common/data/drops.js')
await import('../optcdb/common/data/gw.js')

if (Array.isArray(window.units[0])) {
  window.Utils.parseUnits(false)
}

/**
 * @typedef { import('../models/old-units').UnitEvolution } UnitEvol
 * @typedef { ({ [id: number]: UnitEvol })  } BaseUnitEvolution
 */

export const Utils = window.Utils
/** @type BaseUnitEvolution */
export const evolutions = window.evolutions
/** @type import('../models/old-units').UnitDetail[] */
export const details = window.details
/** @type import('../models/old-units').UnitCooldown[] */
export const cooldowns = window.cooldowns
/** @type import('../models/old-units').UnitFlags[] */
export const flags = window.flags
/** @type import('../models/old-units').UnitFamily */
export const families = window.families
/** @type import('../models/old-units').BaseUnit[] */
export const units = window.units
/** @type import('models/drops').BaseDrops */
export const drops = window.drops
/** @type { { [id: number]: string[]} } */
export const aliases = window.aliases
/** @type { (number | null)[] } */
export const gamewith = window.gw
