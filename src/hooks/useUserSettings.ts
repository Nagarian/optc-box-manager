import { useStorage } from './useStorage'
import { SavedSearch } from './useStoredSearches'

export type UserSetting = {
  is200cc: boolean
  userSearches: SavedSearch[]
  resetSearchId?: string
}

export function useUserSettings () {
  const [userSetting, setUserSetting, forceUpdate] = useStorage<UserSetting>('userSetting', {
    is200cc: false,
    userSearches: [],
  })

  return {
    userSetting,
    setUserSetting,
    ccLimit: userSetting.is200cc ? 200 : 100,
    forceUpdate,
  }
}
