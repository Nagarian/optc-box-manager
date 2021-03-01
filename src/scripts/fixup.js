// @ts-check

const { globalOnlyReverseMap, globalOnly, globalOnlyMissingInDb } = require('./glo-jap-remapper')

/**
 * @typedef { ({ [key: string]: import("models/old-units").PotentialKey })} PotentialRenamedHash
 * @typedef { ({ [key: string]: import("models/old-units").UnitPirateFestStyle })} PirateFestRenamedHash
 */

/** @return { import("models/old-units").UnitDetail } */
function fixupDetail (
  /** @type { import("models/old-units").UnitDetail } */ detail,
) {
  // @ts-ignore
  if (!detail) return {}

  if (detail.potential?.length) {
    /** @type PotentialRenamedHash */
    const renamedPotentials = {
      'Enrage/Reduce Increase Damage Taken duration': 'Enrage',
      'Nutrition/Reduce Hunger duration': 'Nutrition/Hunger reduction',
    }

    if (detail.potential.some(p => !!renamedPotentials[p.Name])) {
      detail.potential = detail.potential.map(p => ({
        ...p,
        Name: renamedPotentials[p.Name] ?? p.Name,
      }))
    }
  }

  return detail
}

/** @return { import("models/old-units").ExtendedUnit } */
function fixupVersusUnit (
  /** @type import("models/old-units").ExtendedUnit */ unit,
) {
  if (!unit.detail.VSCondition) {
    return unit
  }

  /** @type any */
  const untyped = unit
  const format = (/** @type any */ obj) => `**Character 1:** ${obj.character1}<br/>**Character 2:** ${obj.character2}`

  return {
    ...unit,
    class: [[], ...untyped.class],
    pirateFest: {
      class: untyped.pirateFest.class[0],
      DEF: 0,
      SPD: 0,
    },
    detail: {
      ...untyped.detail,
      captain: {
        ...untyped.detail.captain,
        combined: format(untyped.detail.captain),
      },
      special: format(untyped.detail.special),
      sailor: {
        ...untyped.detail.sailor,
        combined: untyped.detail.sailor.character1,
      },
      festAbility: untyped.detail.festAbility?.character1.map(
        (/** @type any */ desc, /** @type number */ i) => ({
          description: format({
            character1: desc.description,
            character2: untyped.detail.festAbility.character2[i].description,
          }),
        }),
      ),
      festSpecial: untyped.detail.festSpecial?.character1.map(
        (/** @type any */ desc, /** @type number */ i) => ({
          description: format({
            character1: desc.description,
            character2: untyped.detail.festSpecial.character2[i].description,
          }),
          /** @type any */
          cooldown: `${desc.cooldown} / ${untyped.detail.festSpecial.character2[i].cooldown}`,
        }),
      ),
    },
  }
}

/** @type { {[key: number]: number[]} } */
const dualRemapping = {
  1983: [5000, 5001, 5002, 5003],
  1984: [5004, 5005, 5006, 5007],
  1985: [5008, 5009, 5010, 5011],
  2000: [5012, 5013, 5014, 5015],
  2180: [5016, 5017, 5018, 5019],
  2181: [5020, 5021, 5022, 5023],
  2399: [5024, 5025, 5026, 5027],
  2417: [5036, 5037, 5038, 5039],
  2418: [5040, 5041, 5042, 5043],
  2445: [5052, 5053, 5054],
  2446: [5055, 5056, 5057],
  2468: [5058, 5059, 5060, 5061],
  2469: [5062, 5063, 5064, 5065],
  2516: [5066, 5067, 5068, 5069],
  2517: [5070, 5071, 5072, 5073],
  2531: [5074, 5075, 5076, 5077],
  2532: [5078, 5079, 5080, 5081],
  2533: [5082, 5083, 5084, 5085],
  2534: [5086, 5087, 5088, 5089],
  2535: [5090, 5091, 5092],
  2536: [5093, 5094, 5095],
  2537: [5096, 5097, 5098, 5099],
  2538: [5100, 5101, 5102, 5103],
  2539: [5104, 5105, 5106, 5107],
  2540: [5108, 5109, 5110, 5111],
  2541: [5112, 5113, 5114, 5115],
  2542: [5116, 5117, 5118, 5119],
  2543: [5120, 5121, 5122, 5123],
  2544: [5124, 5125, 5126, 5127],
  2549: [5128, 5129, 5130, 5131],
  2550: [5132, 5133, 5134, 5135],

  2551: [5028, 5029, 5030, 5031],
  2552: [5032, 5033, 5034, 5035],

  2556: [5136, 5137, 5138, 5139],
  2557: [5140, 5141, 5142, 5143],

  2560: [5144, 5145, 5146, 5147],
  2561: [5148, 5149, 5150, 5151],
  2576: [5152, 5153, 5154, 5155],
  2577: [5156, 5157, 5158, 5159],
  2600: [5160, 5161, 5162, 5163],
  2601: [5164, 5165, 5166, 5167],

  2602: [5168, 5169, 5170, 5171],
  2603: [5172, 5173, 5174, 5175],

  2618: [5176, 5177, 5178, 5179],

  2795: [5187, 5188, 5189, 5190],

  2801: [5191, 5192, 5193, 5194],
  2802: [5195, 5196, 5197, 5198],

  2818: [5044, 5045, 5046, 5047],
  2819: [5048, 5049, 5050, 5051],

  2831: [5199, 5200, 5201],

  2919: [5180, 5181, 5182, 5183],

  3370: [5184, 5185, 5186], // Global only dual

  2834: [5202, 5203, 5204, 5205],
  2835: [5206, 5207, 5208, 5209],
  2850: [5210, 5211, 5212, 5213],

  2859: [5214, 5215, 5216],
  2860: [5217, 5218, 5219],
  2861: [5220, 5221, 5222, 5223],
  2862: [5224, 5225, 5226, 5227],
  2863: [5228, 5229, 5230, 5231],
  2864: [5232, 5233, 5234, 5235],
  2865: [5236, 5237, 5238, 5239],
  2866: [5240, 5241, 5242, 5243],
  2867: [5244, 5245, 5246],

  2894: [5247, 5248, 5249, 5250],
  2895: [5251, 5252, 5253, 5254],

  3381: [5255, 5256, 5257, 5258], // Global only dual

  2999: [5259, 5260, 5261, 5262],
  3060: [5263, 5264, 5265, 5266],
  3064: [5267, 5268, 5269, 5270],
  3065: [5271, 5272, 5273, 5274],
  3098: [5275, 5276, 5277, 5278],

  3134: [5279, 5280],
  3135: [5281, 5282],

  3163: [5283, 5284, 5285, 5286],
  3164: [5287, 5288, 5289, 5290],
  3165: [5291, 5292, 5293, 5294],
  3166: [5295, 5296, 5297, 5298],

  3203: [5299, 5300, 5301, 5302],
  3204: [5303, 5304, 5305, 5306],

  3252: [5307, 5308],
  3253: [5309, 5310],
}

/** @return { import("models/old-units").ExtendedUnit } */
function fixupDualVersusMapping (
  /** @type import("models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("models/old-units").ExtendedUnit[] */ units,
) {
  if (!dualRemapping[unit.dbId]) {
    // @ts-ignore
    return unit
  }
  const temp = [...units].reverse()

  return {
    ...unit,
    // @ts-ignore
    dualCharacters: dualRemapping[unit.dbId].flatMap(id => temp.find(u => u.dbId === id)).filter(Boolean),
  }
}

/** @return { import("models/old-units").ExtendedUnit } */
function fixupImages (
  /** @type import("models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("models/old-units").ExtendedUnit[] */ units,
) {
  if (unit.id < 5001 || unit.id > 5008) {
    return unit
  }

  return {
    ...unit,
    images: {
      ...unit.images,
      thumbnail: `characters/${unit.id}.png`,
    },
  }
}

/** @return { import("models/old-units").ExtendedUnit } */
function fixupEvolution (
  /** @type import("models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("models/old-units").ExtendedUnit[] */ units,
) {
  if (unit.id < 5001) {
    return unit
  }

  return {
    ...unit,
    evolutionMap: unit.evolutionMap.map(id => globalOnlyReverseMap[id] ?? id),
    evolution: unit.evolution && {
      ...unit.evolution,
      evolution: Array.isArray(unit.evolution.evolution)
        ? unit.evolution.evolution.map(id => globalOnlyReverseMap[id])
        : globalOnlyReverseMap[unit.evolution.evolution],
    },
  }
}

/** @return { import("models/old-units").ExtendedUnit } */
function fixupFlags (
  /** @type import("models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("models/old-units").ExtendedUnit[] */ units,
) {
  return {
    ...unit,
    flags: {
      ...unit.flags,
      gloOnly: globalOnly[unit.id] ? 1 : undefined,
      japOnly: globalOnlyMissingInDb[unit.id] ? 1 : undefined,
    },
  }
}

/** @return { import("models/old-units").ExtendedUnit } */
function fixupSpecificIssue (
  /** @type import("models/old-units").ExtendedUnit */ unit,
  /** @type number */ index,
  /** @type import("models/old-units").ExtendedUnit[] */ units,
) {
  if (unit.id === 1538) {
    if (unit.detail.limit?.[14].description.includes('Acquire Potential 2')) {
      // @ts-ignore
      unit.detail.limit[14].description = `Acquire Sailor Ability 2: ${unit.detail.sailor.level1}`
    } else {
      console.warn('issue with unit 1538 has been fixed')
    }
  }

  /**
   * @param {import("../models/old-units").ExtendedUnit} unit
   * @param {string} name
   * @returns {import("../models/old-units").ExtendedUnit}
   */
  // @ts-ignore
  const copy = (unit, name) => ({
    name: name,
    class: unit.class,
    detail: { ...unit.detail },
    images: { ...unit.images }
  })

  if (unit.id === 3252) {
    unit.cooldown = unit.cooldown?.length ? unit.cooldown : [18, 13]
    unit.evolution = { evolution: 3253, evolvers: [] }
    if (unit.dualCharacters?.length === 0) {
      unit.dualCharacters = [
        copy(unit, '[VS Unit] Ace, Flame and Magma'),
        copy(unit, '[VS Unit] Akainu, Flame and Magma'),
      ]
    } else {
      console.warn('issue with Ace vs Akainu fixed')
    }
  }

  if (unit.id === 3253) {
    unit.cooldown = unit.cooldown?.length ? unit.cooldown : [18, 13]

    if (unit.dualCharacters?.length === 0) {
      unit.dualCharacters = [
        copy(unit, '[VS Unit] Ace, Explosive Collision'),
        copy(unit, '[VS Unit] Akainu, Explosive Collision'),
      ]
    } else {
      console.warn('issue with Ace vs Akainu fixed')
    }
  }

  if (unit.evolutionMap?.includes(2784)) {
    // Lucci 6+
    if (unit.dbId === 1763) {
      return {
        ...unit,
        evolutionMap: [...unit.evolutionMap, 5016],
        evolution: {
          evolution: [2784, 5016],
          evolvers: [
            ['skullQCK', 'skullQCK', 'skullQCK', 1180, 301],
            ['skullQCK', 'skullQCK', 'skullQCK', 1180, 301],
          ],
        },
      }
    }

    return {
      ...unit,
      evolutionMap: [...unit.evolutionMap, 5016],
    }
  }

  if (unit.evolutionMap?.includes(2830)) {
    // Robin 6+
    if (unit.dbId === 1951) {
      return {
        ...unit,
        evolutionMap: [...unit.evolutionMap, 5062],
        evolution: {
          evolution: [2830, 5062],
          evolvers: [
            ['skullPSY', 'skullINT', 99, 304, 267],
            ['skullPSY', 'skullINT', 99, 304, 267],
          ],
        },
      }
    }

    return {
      ...unit,
      evolutionMap: [...unit.evolutionMap, 5062],
    }
  }

  return unit
}

function removeProp (
  /** @type any */ obj,
  /** @type string */ badName,
  /** @type string */ realName,
) {
  if (obj[badName]) {
    obj[realName] = obj[badName]
    delete obj[badName]
  }
}

module.exports = {
  fixupDetail,
  fixupVersusUnit,
  fixupDualVersusMapping,
  fixupImages,
  fixupEvolution,
  fixupFlags,
  fixupSpecificIssue,
  removeProp,
}
