const filters = {}

// copy from src\optcdb\characters\js\directives.js
filters.targetToString = function () {
  return function (input) {
    if (!input) return 'N/A'
    if (input.criteria === 'near') {
      return 'Nearby Enemies.'
    } else {
      return `Enemies with the ${input.comparator} ${input.criteria}.`
    }
  }
}

filters.patternToString = function () {
  return function (input) {
    if (!input) return 'N/A'
    if (input.action === 'attack') {
      switch (input.type) {
        case 'Normal':
          return `${input.type} Attack`
        case 'Power':
          return `**${input.type} Attack**`
        case 'Full':
          return `**${input.type} Attack**`
        default:
          return ''
      }
    } else if (input.action === 'heal') {
      return `*Level ${input.level} ${input.area === 'Self' ? input.area : input.area + ' Range'} Heal*`
    } else {
      return 'UNKNOWN'
    }
  }
}

filters.resilienceToString = function () {
  return function (input) {
    if (!input) return 'N/A'
    if (input.amount) {
      return `${conditionToString(input.condition)}Heals ${input.amount} HP every ${input.interval} seconds.`
    }
    if (input.type === 'damage') {
      return `${input.percentage}% reduction to ${input.attribute} damage.`
    }
    return `${input.chance}% to resist ${input.attribute}.`
  }
}

filters.specialToString = function () {
  return function (input) {
    if (!input) return 'N/A'
    return filters.abilityToString()(input)
  }
}

filters.abilityToString = function () {
  return function (input) {
    if (!input) return 'N/A'
    let retVal = '\n'
    for (const effect of input) {
      let e = `- ${conditionToString(effect.condition)}`
      switch (effect.effect) {
        case 'buff':
          e += `Applies Lv.${effect.level} ${arrayToString(effect.attributes)} up buff`
          break
        case 'debuff':
          e += `Inflicts Lv.${effect.level} ${arrayToString(effect.attributes)} down debuff`
          break
        case 'damage':
          switch (effect.type) {
            case 'time':
              e += `Deals Lv.${effect.level} Damage Over Time`
              break
            case 'atk':
              e += `Deals ${new Intl.NumberFormat().format(effect.amount)}x ATK in damage`
              break
            case 'fixed':
              e += `Deals ${new Intl.NumberFormat().format(effect.amount)} fixed damage`
              break
            case 'cut':
              e += `${new Intl.NumberFormat().format(effect.amount)}% health cut`
              break
            default:
              e += 'TODO:  ' + JSON.stringify(effect)
          }
          break
        case 'recharge':
          switch (effect.type) {
            case 'RCV':
              e += `Restores ${new Intl.NumberFormat().format(effect.amount)}x RCV of HP`
              break
            case 'percentage':
              e += `Restores ${new Intl.NumberFormat().format(effect.amount)}% of HP`
              break
            case 'fixed':
              e += `Restores ${new Intl.NumberFormat().format(effect.amount)} fixed HP`
              break
            case 'Special CT':
              e += `Reduces ${new Intl.NumberFormat().format(effect.amount)}% of ${effect.type}`
              break
            default:
              e += 'TODO:  ' + JSON.stringify(effect)
          }
          break
        case 'hinderance':
          e += `${effect.chance}% chance to inflict ${arrayToString(effect.attributes)}`
          break
        case 'boon':
          e += `${effect.chance ? effect.chance + '% chance to ' : ''}`
          const attrStr = arrayToString(effect.attributes)
          switch (attrStr) {
            case 'Provoke':
              e += 'Provoke enemies'
              break
            case 'Haste':
              e += 'grant Haste'
              break
            default:
              e += `${'reduce ' + attrStr}`
              break
          }
          break
        case 'penalty':
          const tmpStr = arrayToString(effect.attributes)
          if (tmpStr === 'HP' && effect.amount) { e += `${new Intl.NumberFormat().format(effect.amount)}% health cut` } else if (effect.level) { e += `Inflicts Lv.${new Intl.NumberFormat().format(effect.level)} ${arrayToString(effect.attributes)} down penalty` } else { e += `${effect.chance}% chance to ${arrayToString(effect.attributes)}` }
          break
        default:
          e = 'UNKNOWN EFFECT ' + JSON.stringify(effect)
          break
      }
      retVal += e + `${targetToString(effect.targeting)}${rangeToString(effect.range)}${effect.duration ? ' for ' + effect.duration + ' seconds' : ''}.\n`
    }
    return retVal
  }
}

function arrayToString (array) {
  const tmpStr = new Intl.ListFormat().format(array)
  return tmpStr
}

function conditionToString (condition) {
  if (!condition) return ''

  switch (condition.type) {
    case 'stat':
      return `When ${condition.stat} is ${condition.comparator} ${condition.count}%, `
    case 'time':
      switch (condition.comparator) {
        case 'first':
          return `For the first ${condition.count} seconds, `
        case 'after':
          return `After the first ${condition.count} seconds, `
        case 'remaining':
          return `When there are ${condition.count} seconds or less remaining, `
        default:
          return `UNKNOWN TIME CONDITION ${JSON.stringify(condition)}`
      }
    case 'crew':
    case 'enemies':
      return `When there are ${condition.count} or ${condition.comparator} ${condition.type} remaining, `
    case 'trigger':
      return `The first ${condition.count} times this character lands a ${condition.stat}, `
    default:
      return `UNKNOWN CONDITION ${JSON.stringify(condition)}`
  }
}

function rangeToString (range) {
  if (!range) return ''
  return ` in a ${range.size}, ${range.direction} range`
}

function targetToString (
  target,
) {
  if (!target) return ''
  let targetStr = arrayToString(target.targets)
  if (targetStr === 'crew') targetStr = 'crew member(s)'
  if (targetStr === 'enemies') {
    if (!target.count) { targetStr = 'all enemies' } else if (target.count === 1) { targetStr = 'enemy' }
  }
  let retVal = ` to ${target.count ? target.count + ' ' : ''}${targetStr}`
  retVal = retVal + `${target.stat ? (' with ' + (target.percentage ? 'a ' + target.percentage + '% or ' : 'the ') + target.priority + ' ' + target.stat) : ''}`
  return retVal
}

function denormalizeEffects (ability) {
  const lastEffect = []
  let mergedEffect = []
  ability.forEach((ability) => {
    mergedEffect = [...lastEffect]
    ability.effects.forEach((effect, effectIdx) => {
      if (effect.effect) {
        lastEffect[effectIdx] = effect
        mergedEffect[effectIdx] = effect
      } else if (effect.override) {
        mergedEffect[effectIdx] = { ...lastEffect[effectIdx], ...effect.override }
      }
    })
    ability.effects = mergedEffect
  })
}

/** @type import("models/pirate-rumble").RumbleSchema */
const rumbleData = require('../optcdb/common/data/rumble.json')

/** @returns { import("models/pirate-rumble").Unit } */
function getRumbleData (id) {
  let key = id
  const rumbleUnits = rumbleData.units
  let unit = rumbleUnits.find(unit => Math.floor(unit.id) === key)

  if (!unit) {
    return undefined
  }

  if (unit.basedOn) {
    key = unit.basedOn
    unit = rumbleUnits.find(unit => unit.id === unit.basedOn)
  }

  if (unit === undefined) {
    return undefined
  }
  // normalize the data here:
  denormalizeEffects(unit.ability)
  denormalizeEffects(unit.special)

  // Check for VS unit
  if (unit.id !== Math.floor(unit.id)) {
    return undefined
    // key = Math.floor(key)
    // unit2 = rumbleUnits.filter(unit => Math.floor(unit.id) === key)[1]
    // denormalizeEffects(unit2.ability)
    // denormalizeEffects(unit2.special)
  }

  return unit
}

function applyNewPirateRumble (
  /** @type import('models/old-units').ExtendedUnit */ unit,
) {
  const newRumble = getRumbleData(unit.dbId)

  if (!newRumble) {
    return unit
  }

  unit.pirateFest.class = newRumble.stats.rumbleType
  unit.pirateFest.DEF = newRumble.stats.def
  unit.pirateFest.SPD = newRumble.stats.spd
  unit.detail.festAbility = newRumble.ability.map(ab => ({
    description: filters.abilityToString()(ab.effects),
  }))
  unit.detail.festAttackPattern = newRumble.pattern.map(p => ({
    description: filters.patternToString()(p),
  }))
  unit.detail.festAttackTarget = filters.targetToString()(newRumble.target)
  unit.detail.festResilience = filters.resilienceToString()(newRumble.resilience)
  unit.detail.festSpecial = newRumble.special.map(s => ({
    cooldown: s.cooldown,
    description: filters.specialToString()(s.effects),
  }))

  return unit
}

module.exports = {
  applyNewPirateRumble,
}
