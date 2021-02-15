import { MyUserBox } from 'models/userBox'
import Backup from './components/Backup'
import { ClearCache } from './components/ClearCache'
import { ThemeChooser } from './components/ThemeChooser'

type AppManagementProps = {
  myUserBox: MyUserBox
}
export default function AppManagement ({ myUserBox }: AppManagementProps) {
  return (
    <>
      <ThemeChooser />
      <ClearCache />
      <Backup myUserBox={myUserBox} />
    </>
  )
}
