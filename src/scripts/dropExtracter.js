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

  BookQuests: window.drops.Fortnight.map(fn => {
    const extracter = key => {
      const fnUnits = fn[key]

      if (!fnUnits) return null

      return {
        id: fn.dropID,
        name: fn.name,
        icon: getImage(window.Utils.getThumbnailUrl)(fn.thumb),
        manual: fnUnits.filter(id => id < 0).map(id => 0 - id),
        category: key.substring(0, 3),
      }
    }

    return (
      extracter('STR Manuals') ??
      extracter('DEX Manuals') ??
      extracter('QCK Manuals') ??
      extracter('PSY Manuals') ??
      extracter('INT Manuals') ??
      null
    )
  }).filter(Boolean),

  TM: window.drops['Treasure Map'].map(tm => tm.thumb),
  Ambush: dropMapper('Ambush'),
  KK: dropMapper(
    'Kizuna Clash',
    'Round 1',
    'Round 2',
    'Round 3',
    'Round 4',
    'Round 5',
    'Round 6',
  ),
  Raid: dropMapper('Raid', 'Master', 'Expert', 'Ultimate'),
  Coliseum: dropMapper('Coliseum', 'Chaos', 'Underground', 'Exebition'),
  Story: dropMapper(
    'Story Island',
    'Completion Units',
    ...[...Array(100).keys()].map(i => i.toString().padStart(2, '0')),
  ),
}

function distinct (value, index, self) {
  return self.indexOf(value) === index
}

function dropMapper (dropKey, ...subKey) {
  return window.drops[dropKey]
    .reduce(
      (all, quest) => [
        ...all,
        quest.thumb,
        ...(quest['All Difficulties'] ?? []),
        ...subKey.reduce(
          (allsub, sub) => [...allsub, ...(quest[sub] ?? [])],
          [],
        ),
      ],
      [],
    )
    .filter(Boolean)
    .filter(
      id =>
        id > 0 && // remove books
        !!window.units[id - 1] && // remove skull and other tricks
        !(
          ['Evolver', 'Booster'].includes(window.units[id - 1][2]) ||
          ['Evolver', 'Booster'].includes(window.units[id - 1].class)
        ), // remove evolver and booster
    )
    .filter(distinct)
}
