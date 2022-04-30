import { useStorage } from './useStorage'
import { ExtendedUnit } from 'models/units'
import { exportAsJson } from 'services/share'

export const SugoCleanerList = [
  'toClean',
  'toSell',
  'toWaiting',
  'toWaitingForLB',
  'toWaitingForSupport',
] as const
export type SugoCleanerListType = typeof SugoCleanerList[number]

export type SugoCleaner = {
  [key in SugoCleanerListType]: number[]
}

const defaultSugoCleaner: SugoCleaner = {
  toClean: [],
  toSell: [],
  toWaiting: [],
  toWaitingForLB: [],
  toWaitingForSupport: [],
}

export default function useSugoCleaner (unitDB: ExtendedUnit[]) {
  const [sugoCleaner, setSugoCleaner] = useStorage<SugoCleaner>(
    'sugocleaner',
    defaultSugoCleaner,
  )

  const {
    toClean = [],
    toSell = [],
    toWaiting = [],
    toWaitingForLB = [],
    toWaitingForSupport = [],
  } = sugoCleaner

  return {
    toClean: toClean
      .map(id => unitDB.find(u => u.id === id))
      .filter(Boolean) as ExtendedUnit[],

    toSell: toSell
      .map(id => unitDB.find(u => u.id === id))
      .filter(Boolean) as ExtendedUnit[],

    toWaiting: toWaiting
      .map(id => unitDB.find(u => u.id === id))
      .filter(Boolean) as ExtendedUnit[],

    toWaitingForLB: toWaitingForLB
      .map(id => unitDB.find(u => u.id === id))
      .filter(Boolean) as ExtendedUnit[],

    toWaitingForSupport: toWaitingForSupport
      .map(id => unitDB.find(u => u.id === id))
      .filter(Boolean) as ExtendedUnit[],

    addTo: (list: SugoCleanerListType, ...unitToAdd: ExtendedUnit[]) => {
      setSugoCleaner({
        ...sugoCleaner,
        [list]: [...sugoCleaner[list], ...unitToAdd.map(u => u.id)],
      })
    },

    move: (
      from: SugoCleanerListType,
      to: SugoCleanerListType,
      ...unitsToMove: ExtendedUnit[]
    ) => {
      if (from === to) {
        return
      }

      const idsToMove = unitsToMove.map(u => u.id)

      setSugoCleaner({
        ...sugoCleaner,
        [from]: sugoCleaner[from].filter(
          (id, i, a) =>
            !idsToMove.includes(id) || a.findIndex(el => el === id) !== i,
        ),
        [to]: [...(sugoCleaner[to] ?? []), ...idsToMove],
      })
    },

    remove: (from: SugoCleanerListType, ...unitsToRemove: ExtendedUnit[]) => {
      const idsToRemove = unitsToRemove.map(u => u.id)
      setSugoCleaner({
        ...sugoCleaner,
        [from]: sugoCleaner[from].filter(
          (id, i, a) =>
            !idsToRemove.includes(id) || a.findIndex(el => el === id) !== i,
        ),
      })
    },

    removeAll: (from: SugoCleanerListType) => {
      setSugoCleaner({
        ...sugoCleaner,
        [from]: [],
      })
    },

    reset: () => setSugoCleaner({ ...defaultSugoCleaner }),
    import: (json: string) => {
      const importedDb: SugoCleaner = JSON.parse(json)
      // TODO: make safety check
      if (!importedDb.toClean) {
        throw new Error("That's not a valid Sugo Cleaner backup file")
      }
      setSugoCleaner?.(importedDb)
    },
    export: async () => {
      if (!sugoCleaner) {
        return
      }

      const payload = JSON.stringify(sugoCleaner)
      await exportAsJson(payload, 'optc-bm-sugo-cleaner')
    },
  }
}
