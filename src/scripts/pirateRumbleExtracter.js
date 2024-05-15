import fs from 'fs'
import jsonc from 'jsonc-parser'

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
      input.area = input.area[0].toUpperCase() + input.area.slice(1)
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
      return `${conditionToString(input.condition)}${input.percentage}% reduction to ${input.attribute} damage.`
    }
    return `${conditionToString(input.condition)}${input.chance}% to resist ${input.attribute}.`
  }
}

filters.specialToString = function () {
  return function (input) {
    if (!input) return 'N/A'
    return filters.abilityToString()(input)
  }
}

filters.gpconditionToString = function () {
  return function (input) {
    switch (input.type) {
      case 'time':
        return `After ${input.count} seconds`
      case 'damage':
        return `After dealing damage ${input.count} times`
      case 'action':
        return `After ${input.action}ing ${input.count} times`
      case 'debuff':
        return `After landing ${input.attribute} ${input.count} times`
      case 'attack':
        return `After landing ${input.count} ${input.attack} attacks`
      case 'defeat':
        return `After ${input.count} ${input.team} are defeated`
      case 'special':
        return `After ${input.team} uses ${input.count} Rumble Specials`
      case 'dmgdealt':
        return `After ${new Intl.NumberFormat().format(input.count)} damage dealt`
      case 'dbfreceived':
        return `After ${input.count} debuffs recieved`
      case 'dmgreceived':
        return `After ${new Intl.NumberFormat().format(input.count)} damage recieved`
      case 'hitreceived':
        return `After ${input.count} hits recieved`
      default:
        return `UNKNOWN CONDITION ${JSON.stringify(input)}`
    }
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
              e += `Deals ${new Intl.NumberFormat().format(effect.amount)}x ${effect.leader ? "Leader's " : ''}ATK in damage`
              break
            case 'atkbase':
              e += `Deals ${new Intl.NumberFormat().format(effect.amount)}x ${effect.leader ? "Leader's " : ''}base ATK in damage`
              break
            case 'fixed':
              e += `Deals ${new Intl.NumberFormat().format(effect.amount)} fixed damage`
              break
            case 'random':
              e += `Randomly deals between ${new Intl.NumberFormat().format(effect.amountrange[0])}-${new Intl.NumberFormat().format(effect.amountrange[1])} fixed damage`
              break
            case 'cut':
              e += `${new Intl.NumberFormat().format(effect.amount)}% health cut`
              break
            default:
              e += 'TODO:  ' + JSON.stringify(effect)
          }
          e += effect.defbypass ? ' that will ignore DEF' : ''
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
          if (effect.interval)
            e += ` every ${effect.interval} ${effect.interval === 1 ? 'second' : 'seconds'}`
          break
        case 'hinderance':
          e += effect.amount
            ? `Removes ${new Intl.NumberFormat().format(effect.amount)}% of ${arrayToString(effect.attributes)}`
            : `${effect.chance}% chance to inflict ${effect.level ? 'Lv.' + effect.level + ' ' : ''}${arrayToString(effect.attributes)}`
          break
        case 'boon': {
          e += `${effect.chance ? effect.chance + '% chance to ' : ''}`
          const attrStr = arrayToString(effect.attributes)
          switch (attrStr) {
            case 'Provoke':
              e += 'Provoke enemies'
              break
            case 'Haste':
              e += `${effect.chance ? 'g' : 'G'}rant Haste`
              break
            case 'Counter':
              e += `${effect.chance ? 'g' : 'G'}rant ${effect.amount}x Counter`
              break
            case 'Revive':
              e += `${effect.chance ? 'r' : 'R'}evive to ${effect.amount}% HP after death`
              break
            default:
              e += `${'Reduce ' + attrStr}`
              break
          }
          break
        }
        case 'penalty': {
          const tmpStr = arrayToString(effect.attributes)
          if (tmpStr === 'HP' && effect.amount) {
            e += `${new Intl.NumberFormat().format(effect.amount)}% health cut`
          } else if (effect.level) {
            e += `Inflicts Lv.${new Intl.NumberFormat().format(effect.level)} ${arrayToString(effect.attributes)} down penalty`
          } else {
            e += `${effect.chance || 100}% chance to ${arrayToString(effect.attributes)}`
          }
          break
        }
        case 'cleanse':
          e += `${effect.chance}% chance to cleanse ${arrayToString(effect.attributes)} debuffs`
          break
        default:
          e = 'UNKNOWN EFFECT ' + JSON.stringify(effect)
          break
      }
      retVal +=
        e +
        `${targetToString(effect.targeting)}${rangeToString(effect.range)}${effect.duration ? ' for ' + effect.duration + ' seconds' : ''}` +
        (effect.repeat
          ? ` ${new Intl.NumberFormat().format(effect.repeat)} times`
          : '') +
        '.\n'
    }
    return retVal
  }
}

function arrayToString(array) {
  const tmpStr = new Intl.ListFormat('en').format(array)
  return tmpStr
}

function arrayToStringOr(array) {
  const tmpStr = new Intl.ListFormat('en', { type: 'disjunction' }).format(
    array,
  )
  return tmpStr
}

function conditionToString(condition) {
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
      return `When there are ${condition.count} or ${condition.comparator} ${condition.type} ${condition.relative ? (condition.type === 'crew' ? 'than the enemy team' : 'than your crew') : ''} remaining, `
    case 'trigger':
      return `The first ${condition.count} times this character ${condition.stat === 'takes damage' ? condition.stat : 'lands a ' + condition.stat}, `
    case 'defeat':
      return `When ${condition.count} characters ${condition.team === 'enemies' ? 'on the enemy team ' : condition.team === 'crew' ? 'on your crew ' : ''}are defeated, `
    case 'character':
      return `When ${arrayToStringOr(condition.families)} ${condition.families.length > 1 ? 'are' : 'is'} ${condition.team === 'enemies' ? 'on the enemy team' : condition.team === 'crew' ? 'on your crew' : ''}, `
    default:
      return `UNKNOWN CONDITION ${JSON.stringify(condition)}`
  }
}

function rangeToString(range) {
  if (!range) return ''
  return ` in a ${range.size}, ${range.direction} range`
}

function targetToString(target) {
  if (!target) return ''
  let targetStr = arrayToString(target.targets)
  const excludeStr = arrayToString(target.excludes)
  if (targetStr === 'crew') targetStr = 'crew member(s)'
  if (targetStr === 'enemies') {
    if (!target.count) {
      targetStr = 'all enemies'
    } else if (target.count === 1) {
      targetStr = 'enemy'
    }
  }
  let retVal = ` to ${target.count ? target.count + ' ' : ''}${targetStr}${target.targets.includes('self') || target.targets.includes('crew') || target.targets.includes('enemies') ? '' : target.count === 1 ? ' character' : ' characters'}`
  retVal =
    retVal +
    `${target.excludes ? ', excluding ' : ''}${target.excludes ? excludeStr : ''}${target.excludes ? (target.excludes.includes('self') || target.excludes.includes('crew') || target.excludes.includes('enemies') ? '' : target.count === 1 ? ' character' : ' characters') : ''}`
  retVal =
    retVal +
    `${target.stat ? ' with ' + (target.percentage ? 'a ' + target.percentage + '% or ' : 'the ') + target.priority + ' ' + target.stat : ''}`
  return retVal
}

function denormalizeEffects(ability) {
  const lastEffect = []
  let mergedEffect = []
  ability.forEach(ability => {
    mergedEffect = [...lastEffect]
    ability.effects.forEach((effect, effectIdx) => {
      if (effect.effect) {
        lastEffect[effectIdx] = effect
        mergedEffect[effectIdx] = effect
      } else if (effect.override) {
        mergedEffect[effectIdx] = {
          ...lastEffect[effectIdx],
          ...effect.override,
        }
      }
    })
    ability.effects = mergedEffect
  })
}

/** @type import("models/pirate-rumble").RumbleSchema */
const rumbleData = jsonc.parse(
  fs.readFileSync('./src/optcdb/common/data/rumble.json', 'utf8'),
)

/** @returns { import("models/pirate-rumble").Unit | [import("models/pirate-rumble").Unit, import("models/pirate-rumble").Unit]  } */
function getRumbleData(id) {
  let key = id
  const rumbleUnits = rumbleData.units
  let unit = rumbleUnits.find(unit => Math.floor(unit.id) === key)

  if (!unit) {
    return undefined
  }

  while (unit.basedOn) {
    key = unit.basedOn
    unit = rumbleUnits.find(u => u.id === unit.basedOn)
  }

  if (unit === undefined) {
    return undefined
  }
  // normalize the data here:
  denormalizeEffects(unit.ability)
  denormalizeEffects(unit.special)
  if (unit.llbability) denormalizeEffects(unit.llbability)
  if (unit.llbspecial) denormalizeEffects(unit.llbspecial)
  if (unit.gpspecial) denormalizeEffects(unit.gpspecial)
  if (unit.gpability) denormalizeEffects(unit.gpability)

  // Check for VS unit
  if (unit.id !== Math.floor(unit.id)) {
    key = Math.floor(key)
    const unit2 = rumbleUnits.filter(unit => Math.floor(unit.id) === key)[1]
    denormalizeEffects(unit2.ability)
    denormalizeEffects(unit2.special)
    if (unit2.llbability) denormalizeEffects(unit2.llbability)
    if (unit2.llbspecial) denormalizeEffects(unit2.llbspecial)
    if (unit2.gpspecial) denormalizeEffects(unit2.gpspecial)
    if (unit2.gpability) denormalizeEffects(unit2.gpability)

    return [unit, unit2]
  }

  return unit
}

export function applyNewPirateRumble(
  /** @type import('../models/old-units').ExtendedUnit */ unit,
) {
  let newRumble
  try {
    newRumble = getRumbleData(unit.dbId)
  } catch (error) {
    error.unitId = unit.id
    throw error
  }

  if (!newRumble) {
    return unit
  }

  if (!unit.pirateFest) {
    unit.pirateFest = {}
  }

  if (Array.isArray(newRumble)) {
    if (!unit.pirateFest2) {
      unit.pirateFest2 = {}
    }

    unit.pirateFest.class = newRumble[0].stats.rumbleType
    unit.pirateFest.DEF = newRumble[0].stats.def
    unit.pirateFest.SPD = newRumble[0].stats.spd

    unit.pirateFest2.class = newRumble[1].stats.rumbleType
    unit.pirateFest2.DEF = newRumble[1].stats.def
    unit.pirateFest2.SPD = newRumble[1].stats.spd

    unit.detail.festAbility = {
      character1: newRumble[0].ability.map(ab => ({
        description: filters.abilityToString()(ab.effects),
      })),
      character2: newRumble[1].ability.map(ab => ({
        description: filters.abilityToString()(ab.effects),
      })),
    }
    unit.detail.festAttackPattern = {
      character1: newRumble[0].pattern.map(p => ({
        description: filters.patternToString()(p),
      })),
      character2: newRumble[1].pattern.map(p => ({
        description: filters.patternToString()(p),
      })),
    }
    unit.detail.festAttackTarget = {
      character1: filters.targetToString()(newRumble[0].target),
      character2: filters.targetToString()(newRumble[1].target),
    }
    unit.detail.festResistance = {
      character1: filters.resilienceToString()(newRumble[0].resilience),
      character2: filters.resilienceToString()(newRumble[1].resilience),
    }
    unit.detail.festSpecial = {
      character1: newRumble[0].special.map(s => ({
        cooldown: s.cooldown,
        description: filters.specialToString()(s.effects),
      })),
      character2: newRumble[1].special.map(s => ({
        cooldown: s.cooldown,
        description: filters.specialToString()(s.effects),
      })),
    }
    unit.detail.festGPLeader = newRumble[0].gpability && {
      character1: newRumble[0].gpability?.map(ab => ({
        description: filters.abilityToString()(ab.effects),
      })),
      character2: newRumble[1].gpability?.map(ab => ({
        description: filters.abilityToString()(ab.effects),
      })),
    }
    const gpCondition1 =
      (newRumble[0].gpcondition
        ? filters.gpconditionToString()(newRumble[0].gpcondition[0])
        : undefined) ?? ''
    const gpCondition2 =
      (newRumble[1].gpcondition
        ? filters.gpconditionToString()(newRumble[1].gpcondition[0])
        : undefined) ?? ''
    unit.detail.festGPBurst = newRumble[0].gpspecial && {
      character1: newRumble[0].gpspecial?.map(gps => ({
        use: gps.uses,
        condition: gpCondition1,
        description: filters.specialToString()(gps.effects),
      })),
      character2: newRumble[1].gpspecial?.map(gps => ({
        use: gps.uses,
        condition: gpCondition2,
        description: filters.specialToString()(gps.effects),
      })),
    }
  } else {
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
    unit.detail.festResistance = filters.resilienceToString()(
      newRumble.resilience,
    )
    unit.detail.festSpecial = newRumble.special.map(s => ({
      cooldown: s.cooldown ?? 0,
      description: filters.specialToString()(s.effects),
    }))
    unit.detail.festGPLeader = newRumble.gpability?.map(ab => ({
      description: filters.abilityToString()(ab.effects),
    }))

    const gpCondition =
      (newRumble.gpcondition
        ? filters.gpconditionToString()(newRumble.gpcondition[0])
        : undefined) ?? ''
    unit.detail.festGPBurst = newRumble.gpspecial?.map(gps => ({
      use: gps.uses,
      condition: gpCondition,
      description: filters.specialToString()(gps.effects),
    }))
  }

  return unit
}
