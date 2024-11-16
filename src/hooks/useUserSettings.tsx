import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
} from 'react'
import { checkReminderNotification } from 'services/notification'
import { exportAsJson } from 'services/share'
import { useStorage } from './useStorage'
import { DefaultSearches, SavedSearch } from './useStoredSearches'

export type ThemeMode = 'auto' | 'light' | 'dark'
export type GameVersion = 'global' | 'japan'

export type AccountRecovery = {
  userId: string
  password: string
  generatedAt: Date
}

export type UserSetting = {
  settingVersion: number
  cottonCandiesMaximumLevel: {
    atk: number
    hp: number
    rcv: number
  }
  userSearches: SavedSearch[]
  reseter: Record<string, string | undefined>
  themeMode: ThemeMode
  gameVersion: GameVersion
  accountRecovery?: AccountRecovery
}

const defaultUserSettings: UserSetting = {
  settingVersion: 1,
  userSearches: DefaultSearches,
  reseter: {
    box: DefaultSearches[0].id,
    addSettingSearch: DefaultSearches[1].id,
    sugocleaner: DefaultSearches[2].id,
    sugoCleanerAddSearch: DefaultSearches[3].id,
  },
  cottonCandiesMaximumLevel: {
    atk: 0,
    hp: 0,
    rcv: 0,
  },
  themeMode: 'auto',
  gameVersion: 'global',
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

function migration(initial: UserSetting): UserSetting {
  let updated = initial
  if (initial.settingVersion === undefined) {
    updated = {
      ...defaultUserSettings,
      ...initial,
    }
  }

  if (updated.settingVersion === 1) {
    updated.settingVersion = 2
    if (
      !updated.userSearches.find(
        (s: SavedSearch) => s.id === DefaultSearches[0].id,
      )
    ) {
      updated.userSearches = [...DefaultSearches, ...initial.userSearches]
    }
  }

  return updated
}

function reviver(key: string, value: unknown) {
  if (key !== 'generatedAt') return value

  if (typeof value === 'string') {
    return new Date(value)
  }

  return value
}

export function UserSettingsProvider({ children }: { children: ReactNode }) {
  const [userSetting, setUserSetting] = useStorage<UserSetting>(
    'userSetting',
    defaultUserSettings,
    migration,
    reviver,
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

  useEffect(() => {
    const generatedAt =
      UserSettingValue.userSetting.accountRecovery?.generatedAt
    if (!generatedAt) {
      return
    }

    checkReminderNotification(generatedAt)
  }, [UserSettingValue.userSetting.accountRecovery?.generatedAt])

  return (
    <UserSettingsContext.Provider value={UserSettingValue}>
      {children}
    </UserSettingsContext.Provider>
  )
}

export function useUserSettings(): UserSettingEnhanced {
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
      const importedDb = JSON.parse(json) as UserSetting
      // TODO: make safety check
      if (!importedDb.themeMode) {
        throw new Error("That's not a valid Setting backup file")
      }
      context.setUserSetting?.(migration(importedDb))
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
