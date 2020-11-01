/* eslint-disable no-global-assign */
/* eslint-disable no-native-reassign */
window = {}
require('../optcdb/common/data/aliases')
require('../optcdb/common/data/cooldowns')
require('../optcdb/common/data/details')
require('../optcdb/common/data/evolutions')
require('../optcdb/common/data/families')
require('../optcdb/common/data/festival')
require('../optcdb/common/data/flags')
require('../optcdb/common/data/units')
require('../optcdb/common/js/utils')
require('../optcdb/common/data/drops')
require('../optcdb/common/data/gw')

if (Array.isArray(window.units[0])) {
  window.Utils.parseUnits(false)
}

/**
 * @typedef { import('models/old-units').UnitEvolution } UnitEvol
 * @typedef { ({ [id: number]: UnitEvol })  } BaseUnitEvolution
 */

module.exports = {
  Utils: window.Utils,
  /** @type BaseUnitEvolution */
  evolutions: window.evolutions,
  /** @type import('models/old-units').UnitDetail[] */
  details: window.details,
  /** @type import('models/old-units').UnitCooldown[] */
  cooldowns: window.cooldowns,
  /** @type import('models/old-units').UnitFlags[] */
  flags: window.flags,
  /** @type import('models/old-units').UnitFamily[] */
  families: window.families,
  /** @type import('models/old-units').BaseUnit[] */
  units: window.units,
  /** @type import('models/drops').BaseDrops */
  drops: window.drops,
  /** @type { { [id: number]: string[]} } */
  aliases: window.aliases,
  /** @type { (number | null)[] } */
  gamewith: window.gw,
}
