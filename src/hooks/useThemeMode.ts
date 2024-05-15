import { useEffect, useState } from 'react'
import { ThemeMode, useUserSettings } from './useUserSettings'

export function useThemeMode() {
  const { userSetting, setUserSetting } = useUserSettings()
  const { themeMode } = userSetting

  const [, setRefresher] = useState<string>()

  useEffect(() => {
    const matcher = window.matchMedia('(prefers-color-scheme: dark)')

    const handle = (result: MediaQueryListEvent) => {
      setRefresher(new Date().toString())
    }
    matcher.addEventListener('change', handle)

    return () => matcher.removeEventListener?.('change', handle)
  }, [])

  let currentTheme = themeMode

  if (themeMode === 'auto') {
    currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  return {
    currentTheme,
    themeMode,
    setThemeMode: (theme: ThemeMode) =>
      setUserSetting({
        ...userSetting,
        themeMode: theme,
      }),
  }
}
