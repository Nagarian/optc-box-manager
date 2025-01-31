import { Button } from 'components/Button'
import { Changelog } from 'components/Changelog'
import {
  GatherIslandIcon,
  Icon,
  NewsCooIcon,
  SettingsIcon,
  ShareIcon,
  SkillBookIcon,
  TreasureIcon,
} from 'components/Icon'
import { Popup } from 'components/Popup'
import { MyShipBox } from 'models/shipBox'
import { MyUserBox } from 'models/userBox'
import { AppManagement } from 'pages/AppManagement'
import { Credits } from 'pages/Credits'
import { ExportFor } from 'pages/ExportFor'
import { GatherIsland } from 'pages/GatherIsland'
import { ReactNode, useState } from 'react'

type SettingsProps = {
  onClose: () => void
  myUserBox: MyUserBox
  myShipBox: MyShipBox
}

export function Settings({ onClose, myUserBox, myShipBox }: SettingsProps) {
  return (
    <Popup title="Extras" onClose={onClose}>
      <SettingAction title="Credits" icon={TreasureIcon}>
        <Credits />
      </SettingAction>

      <SettingAction title="Changelog" icon={NewsCooIcon}>
        <Changelog />
      </SettingAction>

      <Button
        my="1"
        href="https://github.com/Nagarian/optc-box-manager/wiki"
        icon={SkillBookIcon}
      >
        Wiki
      </Button>

      <SettingAction title="Export For" icon={ShareIcon}>
        <ExportFor myUserBox={myUserBox} />
      </SettingAction>

      <SettingAction title="Settings" icon={SettingsIcon}>
        <AppManagement myUserBox={myUserBox} myShipBox={myShipBox} />
      </SettingAction>

      <SettingAction icon={GatherIslandIcon} title="Gather Island">
        <GatherIsland />
      </SettingAction>
    </Popup>
  )
}

type SettingActionProps = {
  title: string
  icon?: Icon
  children: ReactNode
}
function SettingAction({ title, icon, children }: SettingActionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Button my="1" icon={icon} onClick={() => setIsOpen(true)}>
        {title}
      </Button>

      {isOpen && (
        <Popup onClose={() => setIsOpen(false)} title={title}>
          {children}
        </Popup>
      )}
    </>
  )
}
