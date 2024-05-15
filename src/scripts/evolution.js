// @ts-check
import { evolutions as EvolsArray } from './DBLoader.js'

/**
 *  @typedef { ({ [id: number]: number[] }) } EvolutionMapHash
 */

/** @returns EvolutionMapHash */
export function evolutionMap() {
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
function evolutionSeeker(
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
