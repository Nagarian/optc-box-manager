import { UnitEvolution } from 'models/units'

export type EvolutionMapHash = { [id: number]: number[] }

export const evolutionMap = (): EvolutionMapHash => {
  const Evolutions = (window as any).evolutions as {
    [id: number]: UnitEvolution
  }

  const evolutionHash: EvolutionMapHash = {}

  for (const key in Evolutions) {
    const id = parseInt(key)

    if (evolutionHash[id]) continue

    const evolutionForward = evolutionSeeker(Evolutions, id)
    for (const evolveId of evolutionForward) {
      evolutionHash[evolveId] = evolutionForward
    }
  }

  return evolutionHash
}

const evolutionSeeker = (
  evolutions: {
    [id: number]: UnitEvolution
  },
  id: number,
): number[] => {
  const evolutionForward = evolutions[id]
  const result = [id]

  if (!evolutionForward) {
    return result
  }

  if (Array.isArray(evolutionForward.evolution)) {
    return evolutionForward.evolution.reduce<number[]>(
      (all, evolveId) => all.concat(evolutionSeeker(evolutions, evolveId)),
      result,
    )
  }

  return result.concat(evolutionSeeker(evolutions, evolutionForward.evolution))
}
