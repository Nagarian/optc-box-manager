import { useStorage } from './useStorage'
import { Search } from 'models/search'

export type SavedSearch = {
  name: string
  search: Search
}

export function useStoredSearches (key: string = 'search') {
  const [searches, setSearches] = useStorage<SavedSearch[]>(key, [])

  return {
    searches,
    add: (searchToSave: SavedSearch) =>
      setSearches([...searches, searchToSave]),
    remove: (searchToRemove: SavedSearch) =>
      setSearches(searches.filter(s => s !== searchToRemove)),
  }
}
