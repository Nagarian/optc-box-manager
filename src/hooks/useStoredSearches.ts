import { Search } from 'models/search'
import { v4 as uuid } from 'uuid'
import { useUserSettings } from './useUserSettings'

export type SavedSearch = {
  id: string
  name: string
  search: Search
}

export function useStoredSearches () {
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
    setAsReseter: (search: SavedSearch | undefined) =>
      setUserSetting({
        ...userSetting,
        resetSearchId: search?.id ?? undefined,
      }),
    reseter: userSetting.resetSearchId
      ? searches.find(x => x.id === userSetting.resetSearchId)
      : undefined,
  }
}
