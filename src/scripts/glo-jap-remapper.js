/** @type { ({ [key: number]: number }) } */
const globalOnly = {
  // 1120: 577, // Luffy // different image
  // 1121: 578,
  5001: 650, // nami // different image
  5002: 651,
  5003: 660, // usopp // different image
  5004: 661,
  5005: 579, // zoro // different image
  5006: 580,
  5007: 596, // chopper // different image
  5008: 597,
  5009: 1923, // Rayleigh raid
  5010: 1924,
  5011: 2262, // Doflamingo Int Raid
  5012: 2263,
  5013: 4986, // KFL
  5014: 4987,
  5015: 2399, // Mr0/Mr1
  5016: 2784, // Lucci 6+
  5017: 2551, // Garpoku
  5018: 2552,
  5019: 2663, // Knight Zoro
  5020: 2664, // Knight Sanji
  5021: 2440, // Sabo v3
  5022: 2441,
  5023: 2818, // Shawk
  5024: 2819,
  5025: 2685, // WB v2
  5026: 2686,
  5027: 3312, // Neo Garp Raid
  5028: 3313,
  5029: 4988, // Vivi
  5030: 4989,
  5031: 4990, // Ace
  5032: 4991,
  5033: 3314, // Neo Iva
  5034: 3315,
  5035: 3316, // Neo WB inva
  5036: 3317,
  5037: 2772, //  wanda
  5038: 2919, // sanji/pudding
  5039: 3318, // Neo Duval
  5040: 3319,
  5041: 3320,
  5042: 3321, // Neo Nightmare Luffy
  5043: 3322,
  5044: 3323, // Neo Vergo
  5045: 3324,
  5046: 4992, // Blue swimsuit pudding
  5047: 4993,
  5048: 2768, // Kimono Sakazuki
  5049: 2769,
  5050: 2770, // Kimono Kuzan
  5051: 2771,
  5052: 3331, // Usopp/Chopper
  5053: 4994, // Neo Coby
  5054: 4995,
  5055: 4996, // Neo Helmep
  5056: 4997, // Sengoku
  5057: 3325, // Heracles
  5058: 3326,
  5059: 3327, // Condoriano
  5060: 2929, // Kuzan v3
  5061: 2930,
  5062: 2830, // Robin 6+
  5063: 2909, // WB v2 6+
  5064: 3330, // Law/Chopper
  5065: 4998, // MOTNS
  5066: 4999, // Makino
  5067: 3156, // Akainu v3
  5068: 3157,
}

/** @type { ({ [key: number]: number }) } */
const globalOnlyReverseMap = Object.entries(globalOnly)
  .reduce((agg, [realId, wrongId]) => ({ ...agg, [wrongId]: parseInt(realId) }), {})

/** @type { ({ [key: number]: number }) } */
const globalOnlyWrongId = Object.entries(globalOnly)
  .filter(([realId, wrongId]) => wrongId >= 4986)
  .reduce((agg, [realId, wrongId]) => ({ ...agg, [wrongId]: parseInt(realId) }), {})

/** @type { ({ [key: number]: number }) } */
const globalOnlyMissingInDb = Object.entries(globalOnly)
  .filter(([realId, wrongId]) => wrongId < 4986)
  .reduce((agg, [realId, wrongId]) => ({ ...agg, [wrongId]: parseInt(realId) }), {})

/** @type { ({ [key: number]: number }) } */
const gloToJapConverter = Object.entries(globalOnly)
  .reduce((agg, [gloId, japId]) => ({ ...agg, [gloId]: japId >= 4986 ? null : japId }), {})

const remainingGlobalOnlyUnitMapping = {
  'Monkey D. Luffy, Kung Fu Training': 4986,
  'Monkey D. Luffy, To Become a True Kung Fu Master': 4987,
  'Nefertari Vivi, Wake of an Endless Dream - Princess of Alabasta': 4988,
  'Nefertari Vivi, Wake of an Endless Dream - Pirate Queen': 4989,
  'Portgas D. Ace, Wake of an Endless Dream - Whitebeard Pirates': 4990,
  'Portgas D. Ace, Wake of an Endless Dream - High Seas Pirate': 4991,
  'Charlotte Pudding, White Summer Sweets': 4992,
  'Charlotte Pudding, Devilish White Swimsuit': 4993,
  'Coby [EXTRA], Navy HQ Petty Officer': 4994,
  'War Hero Coby [EXTRA], Navy HQ Petty Officer': 4995,
  'Sergeant Helmeppo [EXTRA]': 4996,
  'Sengoku, Fatherly Buddha': 4997,
  'Local Sea Monster, Man-Eating Monster': 4998,
  'Makino, Proprietor of a Relaxed Tavern': 4999,
}

const checkGloJapMapping = (
  /** @type import("models/old-units").ExtendedUnit[] */ units,
) => {
  const errors = []

  for (const [name, id] of Object.entries(remainingGlobalOnlyUnitMapping)) {
    const selectedUnit = units.find(unit => unit.name === name)

    if (!selectedUnit) {
      errors.push(`"${name}" hasn't been found`)
    } else if (selectedUnit.dbId !== id) {
      errors.push(`"${name}" should be at ID ${id} but was ${selectedUnit.dbId}`)
    }
  }

  if (errors.length > 0) {
    console.error(errors)
    throw new Error('Global -> Jap units have changed')
  }
}

module.exports = {
  globalOnly,
  globalOnlyReverseMap,
  globalOnlyWrongId,
  globalOnlyMissingInDb,
  gloToJapConverter,
  checkGloJapMapping,
}
