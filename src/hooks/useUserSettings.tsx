import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react'
import { exportAsJson } from 'services/share'
import { useStorage } from './useStorage'
import { SavedSearch } from './useStoredSearches'

export type ThemeMode = 'auto' | 'light' | 'dark'

export type UserSetting = {
  cottonCandiesMaximumLevel: {
    atk: number
    hp: number
    rcv: number
  }
  userSearches: SavedSearch[]
  resetSearchId?: string
  themeMode: ThemeMode
}

const defaultUserSettings: UserSetting = {
  userSearches: [],
  cottonCandiesMaximumLevel: {
    atk: 0,
    hp: 0,
    rcv: 0,
  },
  themeMode: 'auto',
}

export type UserSettingEnhanced = {
  userSetting: UserSetting
  setUserSetting: Dispatch<SetStateAction<UserSetting>>
  ccLimit: {
    all: number
    atk: number
    hp: number
    rcv: number
  }
  reset: () => void
  import: (json: string) => void
  export: () => Promise<void>
}

export const UserSettingsContext = createContext<Partial<UserSettingEnhanced>>(
  {},
)

function migration (value: any): UserSetting {
  if (value.is200cc !== undefined) {
    return {
      ...defaultUserSettings,
      ...value,
      is200cc: undefined,
    }
  }

  if (!value.themeMode) {
    return {
      ...defaultUserSettings,
      ...value,
    }
  }

  return value
}

export function UserSettingsProvider ({ children }: { children: ReactNode }) {
  const [userSetting, setUserSetting] = useStorage<UserSetting>(
    'userSetting',
    defaultUserSettings,
    migration,
  )

  const { atk, hp, rcv } =
    userSetting.cottonCandiesMaximumLevel ??
    defaultUserSettings.cottonCandiesMaximumLevel

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
    <UserSettingsContext.Provider value={UserSettingValue}>
      {children}
    </UserSettingsContext.Provider>
  )
}

export function useUserSettings (): UserSettingEnhanced {
  const context = useContext(UserSettingsContext)

  return {
    ccLimit: {
      all: 300,
      atk: 100,
      hp: 100,
      rcv: 100,
    },
    setUserSetting: () => {},
    userSetting: defaultUserSettings,
    ...context,

    reset: () => context.setUserSetting?.({ ...defaultUserSettings }),
    import: (json: string) => {
      const importedDb: UserSetting = JSON.parse(json)
      // TODO: make safety check
      if (!importedDb.themeMode) {
        throw new Error("That's not a valid Setting backup file")
      }
      context.setUserSetting?.(importedDb)
    },
    export: async () => {
      if (!context.userSetting) {
        return
      }

      const payload = JSON.stringify(context.userSetting)
      await exportAsJson(payload, 'optc-bm-settings')
    },
  }
}
