import { MyUserBox } from 'models/userBox'
import { Backup } from './components/Backup'
import { ClearCache } from './components/ClearCache'
import { GameVersion } from './components/GameVersion'
import { ThemeChooser } from './components/ThemeChooser'

type AppManagementProps = {
  myUserBox: MyUserBox
}
export function AppManagement({ myUserBox }: AppManagementProps) {
  return (
    <>
      <ThemeChooser />
      <GameVersion />
      <ClearCache />
      <Backup myUserBox={myUserBox} />
    </>
  )
}
