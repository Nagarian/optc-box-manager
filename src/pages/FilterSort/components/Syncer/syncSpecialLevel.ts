import { SearchDisplayerCriteria } from '../Displayers'
import { ByUserSpecialCriteria } from '../Filters/UserUnits/ByUserSpecial'
import { Syncer } from '.'

export const syncSpecialLevel: Syncer = (filters, sorts, displayer) => {
  const userS = filters.byUserSpecial as ByUserSpecialCriteria
  if (!userS || userS.state === 'maxed') {
    return [undefined, undefined]
  }

  const syncDisplayer = syncSpecialLevelDisplayer(displayer)

  return [undefined, syncDisplayer]
}

export function syncSpecialLevelDisplayer(
  displayer: SearchDisplayerCriteria | undefined,
): SearchDisplayerCriteria | undefined {
  if (displayer) {
    return undefined
  }

  return {
    type: 'specialLvl',
  }
}
