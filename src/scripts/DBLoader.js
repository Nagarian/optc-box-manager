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

if (Array.isArray(window.units[0])) {
  window.Utils.parseUnits(false)
}

/**
 * @typedef { import('models/units').UnitEvolution } UnitEvol
 * @typedef { ({ [id: number]: UnitEvol })  } BaseUnitEvolution
 */

module.exports = {
  Utils: window.Utils,
  /** @type BaseUnitEvolution */
  evolutions: window.evolutions,
  /** @type import('models/units').UnitDetail[] */
  details: window.details,
  /** @type import('models/units').UnitCooldown[] */
  cooldowns: window.cooldowns,
  /** @type import('models/units').UnitFlags[] */
  flags: window.flags,
  /** @type import('models/units').UnitFamily[] */
  families: window.families,
  /** @type import('models/units').BaseUnit[] */
  units: window.units,
  /** @type import('models/drops').BaseDrops */
  drops: window.drops,
}
