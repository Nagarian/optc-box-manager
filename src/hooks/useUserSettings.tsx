import React, { createContext, useContext, ReactNode } from 'react'
import { useStorage } from './useStorage'
import { SavedSearch } from './useStoredSearches'

export type UserSetting = {
  cottonCandiesMaximumLevel: {
    atk: number
    hp: number
    rcv: number
  }
  userSearches: SavedSearch[]
  resetSearchId?: string
}

const defaultUserSettings: UserSetting = {
  userSearches: [],
  cottonCandiesMaximumLevel: {
    atk: 0,
    hp: 0,
    rcv: 0,
  },
}

export type UserSettingEnhanced = {
  userSetting: UserSetting,
  setUserSetting: React.Dispatch<React.SetStateAction<UserSetting>>,
  ccLimit: {
    all: number,
    atk: number,
    hp: number,
    rcv: number,
  },
}

export const UserSettingsContext = createContext<Partial<UserSettingEnhanced>>({ })

function migration (value: any) : UserSetting {
  if (value.is200cc !== undefined) {
    return {
      ...defaultUserSettings,
      ...value,
      is200cc: undefined,
    }
  }

  return value
}

export function UserSettingsProvider ({
  children,
}: { children: ReactNode }) {
  const [userSetting, setUserSetting] = useStorage<UserSetting>('userSetting', defaultUserSettings, migration)

  const { atk, hp, rcv } = userSetting.cottonCandiesMaximumLevel ?? defaultUserSettings.cottonCandiesMaximumLevel

  const UserSettingValue = {
    userSetting: {
      ...defaultUserSettings,
      ...userSetting,
    },
    setUserSetting,
    ccLimit: {
      all: 300 + atk + hp + rcv,
      atk: 100 + atk,
      hp: 100 + hp,
      rcv: 100 + rcv,
    },
  }

  return (
    <UserSettingsContext.Provider value={UserSettingValue} >
      {children}
    </UserSettingsContext.Provider>
  )
}

export function useUserSettings (): UserSettingEnhanced {
  return {
    ccLimit: {
      all: 300,
      atk: 100,
      hp: 100,
      rcv: 100,
    },
    setUserSetting: () => {},
    userSetting: defaultUserSettings,
    ...useContext(UserSettingsContext),
  }
}
