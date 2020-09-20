import { Search } from 'models/search'
import { useUserSettings } from './useUserSettings'
import { useEffect } from 'react'
import { v4 as uuid } from 'uuid'

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

  useEffect(() => {
    if (searches.length) {
      return
    }

    // migration of previous storageKey
    const json = localStorage.getItem('userSearches')
    if (json) {
      setSearches(
        (JSON.parse(json) as SavedSearch[]).map(saved => ({
          ...saved,
          id: uuid(),
        })),
      )
      localStorage.removeItem('userSearches')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    remove: (searchToRemove: SavedSearch) =>
      setSearches(searches.filter(s => s !== searchToRemove)),
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
