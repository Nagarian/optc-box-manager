/* eslint-disable no-global-assign */
/* eslint-disable no-native-reassign */
window = {}
require('../optcdb/common/data/units')
require('../optcdb/common/js/utils')
require('../optcdb/common/data/drops')

const noImage =
  'https://onepiece-treasurecruise.com/wp-content/themes/onepiece-treasurecruise/images/noimage.png'

const getImage = func => id => {
  try {
    const imagePath = func(id)
    return imagePath
      ?.replace('../res', 'https://optc-db.github.io/res/')
      .replace('http:', 'https:')
  } catch (error) {
    console.trace('Invalid unit :', id)
    return noImage
  }
}

module.exports = {
  Fortnight: window.drops.Fortnight.map(fn => {
    const fnUnits = fn['All Difficulties'] ?? fn.Global ?? []

    return {
      id: fn.dropID,
      name: fn.name,
      icon: getImage(window.Utils.getThumbnailUrl)(fn.thumb),
      manual: fnUnits.filter(id => id < 0).map(id => 0 - id),
      units: fnUnits.filter(id => id > 0),
    }
  }).reverse(),
}
