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

const RookieIcons = {
  'Retrieve the Candy!': 1357,
  'Sentomaru, Guard of the New World!': 1469,
  "Perona's Peculiar Living Situation": 1891,
  'Last Wish for Sanji': 1918,
  'Red-Hair Pirates at the Harbor!': 2046,
  'Comeback! "King of the Day" Duke Dogstorm': 2219,
  'The Finest of Tea Parties! (Perorin!)': 2351,
  'Catch the Big Person!': 1328,
  'Smokey and the Captain!': 1397,
  'Passionate Exile!': 1450,
  'Mystery of the Seven Warlords, Trafalgar Law!!': 1581,
  'Branded in Shackles': 1933,
  "Commotion at Makino's Tavern?!": 2019,
  'Escapees, Join the Fight!': 2692,
  'Strong for your Happiness!': 1384,
  'Intense Combat! Chin Jao Family!!': 1426,
  'Cheer on Your Soul!': 1547,
  'Revenge is Nigh! The New Fishman Pirates!': 1624,
  'Fukaboshi and Neptune': 1725,
  "The Beast's Return": 1965,
  "Baby 5's Wedding Plans": 2165,
  "Let's Go See The Cat Viper!": 2177,
  'Forces of Rage: Amande and Bobbin': 2327,
  'The Charming Tea House Owner': 2782,
  'Rumbar Pirates!': 1203,
  'World Pirates!': 1217,
  "Donquixote Family's Children!": 1287,
  'Find the Beloved Prince?!': 1332,
  'Full Defense!': 1416,
  'Bandits! The Dadan Family!!': 1520,
  'Kingsbird Flying High': 1810,
  "Let's Play in The Seducing Woods!": 2253,
  'Rosy Melancholy': 2428,
  'Dress Up for the Pirate Festival! Chic': 2526,
  'Mermaid Under Siege': 1597,
  'Brutal Fiend! Eustass Kid': 1690,
  "Foxfire Kin'emon": 1774,
  '800-Year-Old Kingdom in Danger': 1818,
  "I'm Now Your Ideal Type! I Think": 1947,
  'The Germa Bloodline Elements': 2056,
  "Brûlée's Cauldron Party": 2127,
  "The Genius Jester! Buggy's Festival!": 2277,
  'Miracle Cherry Blossoms': 2491,
  'Revenge of the Assassins! Galette': 2751,
  'Holy Mother\'s Lover: Mother Caramel': 2377,
  'The Finest of Art': 1649,
  'Coliseum Executioner': 2144,
  'Reunited in Wano! Straw Hat Pirates': 2802,
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

  BookQuests: window.drops['Rookie Mission']
    .filter(group => group.name.startsWith('Manual Acquirement Quest'))
    .flatMap(group => {
      const category = /\(([A-Z]*)\)/i.exec(group.name)[1]

      return Object.entries(group)
        .filter(([key, value]) => Array.isArray(value))
        .map(([key, value]) => {
          const iconId = RookieIcons[key]

          if (!iconId) {
            return null
          }

          return {
            id: `${group.id}-${iconId}`,
            name: key,
            icon: getImage(window.Utils.getThumbnailUrl)(iconId),
            manual: value.filter(id => id < 0).map(id => 0 - id),
            category: category,
          }
        })
    })
    .filter(Boolean),

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
  PF: dropMapper('Pirate Rumble'),
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
