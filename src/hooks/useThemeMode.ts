import { useEffect, useState } from 'react'
import { ThemeMode, useUserSettings } from './useUserSettings'

export function useThemeMode () {
  const { userSetting, setUserSetting } = useUserSettings()
  const { themeMode } = userSetting

  const [, setRefresher] = useState<string>()

  useEffect(() => {
    const matcher = window.matchMedia('(prefers-color-scheme: dark)')

    const handle = (result: MediaQueryListEvent) => {
      setRefresher(new Date().toString())
    }
    try {
      matcher.addEventListener('change', handle)
    } catch (error) {
      try {
        matcher.addListener(handle)
      } catch (error) {
      }
    }

    return () => matcher.removeEventListener?.('change', handle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
