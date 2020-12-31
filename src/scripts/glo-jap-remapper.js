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
  5013: 3333, // KFL
  5014: 3334,
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
  5027: 3339, // Neo Garp Raid
  5028: 3340,
  5029: 3347, // Vivi
  5030: 3348,
  5031: 3349, // Ace
  5032: 3350,
  5033: 3351, // Neo Iva
  5034: 3352,
  5035: 3353, // Neo WB inva
  5036: 3354,
  5037: 2772, //  wanda
  5038: 2919, // sanji/pudding
  5039: 3366, // Neo Duval
  5040: 3367,
  5041: 3368,
  5042: 3356, // Neo Nightmare Luffy
  5043: 3357,
  5044: 3358, // Neo Vergo
  5045: 3359,
  5046: 3360, // Blue swimsuit pudding
  5047: 3361,
  5048: 2768, // Kimono Sakazuki
  5049: 2769,
  5050: 2770, // Kimono Kuzan
  5051: 2771,
  5052: 3370, // Usopp/Chopper
  5053: 3371, // Neo Coby
  5054: 3372,
  5055: 3373, // Neo Helmep
  5056: 3374, // Sengoku
  5057: 3375, // Heracles
  5058: 3376,
  5059: 3380, // Condoriano
  5060: 2929, // Kuzan v3
  5061: 2930,
  5062: 2830, // Robin 6+
  5063: 2909, // WB v2 6+
  5064: 3381, // Law/Chopper
  5065: 3382, // MOTNS
  5066: 3383, // Makino
  5067: 3156, // Akainu v3
  5068: 3157,
}

/** @type { ({ [key: number]: number }) } */
const globalOnlyReverseMap = Object.entries(globalOnly)
  .reduce((agg, [realId, wrongId]) => ({ ...agg, [wrongId]: parseInt(realId) }), {})

/** @type { ({ [key: number]: number }) } */
const globalOnlyWrongId = Object.entries(globalOnly)
  .filter(([realId, wrongId]) => wrongId >= 3333)
  .reduce((agg, [realId, wrongId]) => ({ ...agg, [wrongId]: parseInt(realId) }), {})

/** @type { ({ [key: number]: number }) } */
const globalOnlyMissingInDb = Object.entries(globalOnly)
  .filter(([realId, wrongId]) => wrongId < 3333)
  .reduce((agg, [realId, wrongId]) => ({ ...agg, [wrongId]: parseInt(realId) }), {})

/** @type { ({ [key: number]: number }) } */
const gloToJapConverter = Object.entries(globalOnly)
  .reduce((agg, [gloId, japId]) => ({ ...agg, [gloId]: japId >= 3333 ? null : japId }), {})

module.exports = {
  globalOnly,
  globalOnlyReverseMap,
  globalOnlyWrongId,
  globalOnlyMissingInDb,
  gloToJapConverter,
}
