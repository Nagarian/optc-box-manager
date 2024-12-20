import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { DeleteIcon, OpenInDBIcon } from 'components/Icon'
import { Popup } from 'components/Popup'
import { UserShip } from 'models/shipBox'
import { useState } from 'react'
import { UserShipFactory } from 'services/userShips'
import { ShipEventDisplayer } from './components/ShipEventDisplayer'
import { ShipLevelEdit } from './components/ShipLevelEdit'
import { ShipModificationEdit } from './components/ShipModificationEdit'
import { ShipObtainedEdit } from './components/ShipObtainedEdit'
import { ShipRecapBox } from './components/ShipRecapBox'

type ShipDetailProps = {
  userShip: UserShip
  onCancel: () => void
  onValidate: (updated: UserShip) => void
}

export function ShipDetail({
  onCancel,
  onValidate,
  userShip: original,
}: ShipDetailProps) {
  const [userShip, setUserShip] = useState<UserShip>(() => original)
  const {
    ship: { id, events, levels },
  } = userShip

  return (
    <Popup
      onCancel={onCancel}
      onValidate={() =>
        userShip.obtained || original.obtained
          ? onValidate(userShip)
          : onCancel()
      }
      customAction={
        <>
          {original.obtained && (
            <Button
              variant="danger"
              onClick={() => setUserShip(UserShipFactory(userShip.ship))}
              icon={DeleteIcon}
              title="Delete"
            />
          )}
          <Button
            href={`https://optc-ships.vercel.app/view/${id}`}
            variant="secondary"
            icon={OpenInDBIcon}
            title="See on OPTC-Ship"
          />
        </>
      }
    >
      <ShipRecapBox userShip={userShip} original={original} marginBottom="4" />

      <Box display="flex" flexWrap="wrap">
        <ShipObtainedEdit userShip={userShip} onChange={setUserShip} />

        <ShipLevelEdit userShip={userShip} onChange={setUserShip} />

        <ShipEventDisplayer levels={levels} eventLevels={events} />

        <ShipModificationEdit userShip={userShip} onChange={setUserShip} />
      </Box>
    </Popup>
  )
}
