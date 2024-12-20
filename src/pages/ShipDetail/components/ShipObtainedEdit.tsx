import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { BellyIcon } from 'components/Icon'
import { Text } from 'components/Title'
import { UserShip } from 'models/shipBox'

type ShipObtainedEditProps = {
  userShip: UserShip
  onChange: (userShip: UserShip) => void
}

export function ShipObtainedEdit({
  userShip,
  onChange,
}: ShipObtainedEditProps) {
  if (userShip.obtained) {
    return undefined
  }

  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      placeItems="center"
      placeContent="center"
      gap="2"
      flex="1"
      px="4"
      pb="4"
      minWidth="100%"
    >
      <Button
        onClick={() => onChange({ ...userShip, obtained: true })}
        icon={BellyIcon}
      >
        Unlocked
      </Button>
      {userShip.ship.levels.length >= 10 && (
        <Button
          onClick={() => onChange({ ...userShip, obtained: true, level: 10 })}
          icon={BellyIcon}
        >
          Unlocked at lvl 10
        </Button>
      )}
      <Text
        fontSize="2"
        textAlign="center"
        flex="1 1 100%"
      >{`How to obtain it: ${userShip.ship.obtention}`}</Text>
    </Box>
  )
}
