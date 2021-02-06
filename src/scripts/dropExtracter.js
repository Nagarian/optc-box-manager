// @ts-check

/** @type { ({ [key: string]: number }) } */
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

const { drops, units } = require('./DBLoader')
const { getUnitThumbnail } = require('./image')

/** @type { ({ [key: string]: import('models/drops').EventDrop[] }) } */
const eventModules = {
  Fortnight: drops.Fortnight.map(fn => {
    const fnUnits = fn['All Difficulties'] ?? fn.Global ?? []

    return {
      id: fn.dropID,
      name: fn.name,
      icon: getUnitThumbnail(fn.thumb),
      manual: fnUnits.filter(id => id < 0).map(id => 0 - id),
      units: fnUnits.filter(id => id > 0),
    }
  }).reverse(),

  // @ts-ignore
  BookQuests: drops['Rookie Mission']
    .filter(group => group.name.startsWith('Manual Acquirement Quest'))
    .flatMap(group => {
      // @ts-ignore
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
            icon: getUnitThumbnail(iconId),
            manual: value.filter(id => id < 0).map(id => 0 - id),
            category: category,
          }
        })
    })
    .filter(Boolean),
}

/** @type { ({ [key: string]: import('models/drops').EventDropLight }) } */
const eventLightModules = {
  TM: drops['Treasure Map'].map(tm => tm.thumb),
  Ambush: dropMapper('Ambush'),
  Arena: dropMapper('Arena'),
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

// @ts-ignore
function distinct (value, index, self) {
  return self.indexOf(value) === index
}

/** @return import('models/drops').EventDropLight */
function dropMapper (
  /** @type string */ dropKey,
  /** @type string[] */ ...subKey
) {
  /** @type number[] */
  const init = []
  return drops[dropKey]
    .reduce(
      (all, quest) => [
        ...all,
        quest.thumb,
        ...(quest['All Difficulties'] ?? []),
        ...subKey.reduce(
          (allsub, sub) => [...allsub, ...(quest[sub] ?? [])],
          init,
        ),
      ],
      init,
    )
    .filter(Boolean)
    .filter(
      (/** @type number */ id) =>
        id > 0 && // remove books
        !!units[id - 1] && // remove skull and other tricks
        !(
          ['Evolver', 'Booster'].includes(units[id - 1].toString())
        ), // remove evolver and booster
    )
    .filter(distinct)
}

/** @returns { import('models/units').ExtendedDrop[] } */
function getDropLocations (
  /** @type number */ id,
  /** @type import('models/units').UnitFlags */ flags,
  /** @type import('./evolution').EvolutionMapHash */ evolutions,
) {
  if (Object.keys(flags).some(key => key.includes('rr'))) {
    return ['rarerecruit']
  }

  const evolve = evolutions[id] ?? []

  const condition = (/** @type import('models/drops').EventDropLight */ event) =>
    event.includes(id) || event.some(eventId => evolve.includes(eventId))

  /** @type { import('models/units').ExtendedDrop[] } */
  const result = []

  if (condition(eventLightModules.Story)) {
    result.push('story')
  }

  if (
    eventModules.Fortnight.some(
      fn =>
        fn.units.includes(id) ||
        evolve.some(evolveId => fn.units.includes(evolveId)),
    )
  ) {
    result.push('fortnight')
  }

  if (condition(eventLightModules.Coliseum)) {
    result.push('coliseum')
  }

  if (condition(eventLightModules.Arena)) {
    result.push('arena')
  }

  if (condition(eventLightModules.TM)) {
    result.push('treasuremap')
  }

  if (condition(eventLightModules.KK)) {
    result.push('kizunaclash')
  }

  if (condition(eventLightModules.PF)) {
    result.push('piratefest')
  }

  // we put raid and ambush last because they often includes some units from other game mode
  // IE: ambush shanks
  if (condition(eventLightModules.Raid)) {
    result.push('raid')
  }

  if (condition(eventLightModules.Ambush)) {
    result.push('ambush')
  }

  if (!result.length) {
    // ambiguous units like thus given on login, or on specific events
    result.push('special')
  }

  return result
}

module.exports = {
  ...eventLightModules,
  ...eventModules,
  getDropLocations,
}
