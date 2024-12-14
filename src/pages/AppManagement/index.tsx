import { MyShipBox } from 'models/shipBox'
import { MyUserBox } from 'models/userBox'
import { AccountRecoveryPanel } from './components/AccountRecovery'
import { Backup } from './components/Backup'
import { ClearCache } from './components/ClearCache'
import { GameVersion } from './components/GameVersion'
import { ThemeChooser } from './components/ThemeChooser'

type AppManagementProps = {
  myUserBox: MyUserBox
  myShipBox: MyShipBox
}
export function AppManagement({ myUserBox, myShipBox }: AppManagementProps) {
  return (
    <>
      <ThemeChooser />
      <GameVersion />
      <ClearCache />
      <AccountRecoveryPanel />
      <Backup myUserBox={myUserBox} myShipBox={myShipBox} />
    </>
  )
}
