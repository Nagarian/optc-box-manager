import { Search } from 'models/search'
import { v4 as uuid } from 'uuid'
import { useUserSettings } from './useUserSettings'

export type SavedSearch = {
  id: string
  name: string
  search: Search
}

export function useStoredSearches (key?: string) {
  const { userSetting, setUserSetting } = useUserSettings()

  const searches = userSetting.userSearches ?? []
  const setSearches = (searches: SavedSearch[]) =>
    setUserSetting({
      ...userSetting,
      userSearches: searches,
    })

  return {
    searches,
    add: (name: string, searchToSave: Search) =>
      setSearches([
        ...searches,
        {
          id: uuid(),
          name,
          search: searchToSave,
        },
      ]),
    remove: (searchToRemove: SavedSearch) => {
      setSearches(searches.filter(s => s !== searchToRemove))
    },
    update: (search: SavedSearch) => {
      setSearches(searches.map(s => (s.id === search.id ? search : s)))
    },
    setAsReseter: (key: string, search: SavedSearch | undefined) =>
      setUserSetting({
        ...userSetting,
        reseter: {
          ...userSetting.reseter,
          [key]: search?.id,
        },
      }),
    reseter:
      key && userSetting.reseter[key]
        ? searches.find(x => x.id === userSetting.reseter[key])
        : undefined,
    reseters: Object.values(userSetting.reseter).filter(s => !!s) as string[],
  }
}

export const DefaultSearches: SavedSearch[] = [
  {
    id: 'f8bb11f9-5d8b-451e-92b5-6bd82f2f21ad',
    name: 'Default - Box - Last added + lvl',
    search: {
      filters: {
        units: {},
        userUnits: {},
      },
      sorts: [
        {
          by: 'byAddedToBox',
          order: 'desc',
        },
      ],
      displayer: {
        type: 'level',
        options: {
          type: 'progression',
        },
      },
    },
  },
  {
    id: 'cbc078c2-4778-4ba2-97ae-b54529b03d42',
    name: 'Default - Add Panel',
    search: {
      filters: {
        units: {},
        userUnits: {},
      },
      sorts: [
        {
          by: 'byId',
          order: 'desc',
        },
      ],
    },
  },
  {
    id: '2f166339-b039-451b-a248-4c4648254cc4',
    name: 'Default - Sugo Cleaner - Main list sort',
    search: {
      filters: {
        units: {},
        userUnits: {},
      },
      sorts: [
        {
          by: 'byType',
          order: 'asc',
        },
        {
          by: 'byFamily',
          order: 'asc',
        },
        {
          by: 'byId',
          order: 'asc',
        },
      ],
    },
  },
  {
    id: '6c36d208-61ab-4a1e-91ba-c7a64a143584',
    name: 'Default - Sugo Cleaner add Panel',
    search: {
      filters: {
        units: {
          byDrop: {
            dropLocations: ['rarerecruit'],
          },
        },
        userUnits: {},
      },
      sorts: [
        {
          by: 'byId',
          order: 'desc',
        },
      ],
      displayer: {
        type: 'specialLvl',
      },
    },
  },
  {
    id: '555eaf78-aacb-496d-933d-fcc8ed89c1bb',
    name: 'Default - Sugo Cleaner add Panel - TM Quest',
    search: {
      filters: {
        units: {
          byDrop: {
            dropLocations: [
              'raid',
              'coliseum',
              'story',
              'fortnight',
              'ambush',
              'arena',
              'special',
            ],
          },
        },
        userUnits: {},
      },
      sorts: [
        {
          by: 'byId',
          order: 'desc',
        },
      ],
      displayer: {
        type: 'specialLvl',
      },
    },
  },
  {
    id: 'f7386f36-5f18-46af-b94d-154628dedc9a',
    name: 'Default - Sugo Cleaner add Panel - Friend Point Pull',
    search: {
      filters: {
        units: {
          byRarity: {
            values: [1, 2, 3, '4+', 4, '5+'],
          },
          byDrop: {
            dropLocations: ['story', 'fortnight', 'coliseum', 'special'],
          },
        },
        userUnits: {},
      },
      sorts: [
        {
          by: 'byFamily',
          order: 'asc',
        },
        {
          by: 'byType',
          order: 'asc',
        },
        {
          by: 'byRarity',
          order: 'desc',
        },
        {
          by: 'byId',
          order: 'asc',
        },
      ],
      displayer: {
        type: 'specialLvl',
      },
    },
  },
]
