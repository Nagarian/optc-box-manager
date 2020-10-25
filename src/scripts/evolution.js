// @ts-check
const { evolutions: EvolsArray } = require('./DBLoader')

/**
 *  @typedef { ({ [id: number]: number[] }) } EvolutionMapHash
 */

/** @returns EvolutionMapHash */
function evolutionMap () {
  /** @type EvolutionMapHash */
  const evolutionHash = {}

  for (const key in EvolsArray) {
    const id = parseInt(key)

    if (evolutionHash[id]) continue

    const evolutionForward = evolutionSeeker(EvolsArray, id)
    for (const evolveId of evolutionForward) {
      evolutionHash[evolveId] = evolutionForward
    }
  }

  return evolutionHash
}

/** @return { number[] } */
function evolutionSeeker (
  /** @type import('./DBLoader').BaseUnitEvolution */ evolutions,
  /** @type number */ id,
) {
  const evolutionForward = evolutions[id]
  const result = [id]

  if (!evolutionForward) {
    return result
  }

  if (Array.isArray(evolutionForward.evolution)) {
    return evolutionForward.evolution.reduce(
      (all, evolveId) => all.concat(evolutionSeeker(evolutions, evolveId)),
      result,
    )
  }

  return result.concat(evolutionSeeker(evolutions, evolutionForward.evolution))
}

module.exports = {
  evolutionMap,
}
