import { useStorage } from './useStorage'

export type UserSetting = {
  is200cc: boolean
}

export function useUserSettings () {
  const [userSetting, setUserSetting] = useStorage<UserSetting>('userSetting', {
    is200cc: false,
  })

  return {
    userSetting,
    setUserSetting,
    ccLimit: userSetting.is200cc ? 200 : 100,
  }
}
