import 'rc-slider/assets/index.css'
import { useTheme } from '@emotion/react'
import { Box } from 'components/Box'
import { ExpansionPanel } from 'components/ExpansionPanel'
import { SpecialLvlIcon } from 'components/Icon'
import { Image } from 'components/Image'
import { Text } from 'components/Title'
import { UserShip } from 'models/shipBox'
import { InputLabel } from 'pages/Detail/components'
import Slider from 'rc-slider'
import { ReactNode, useMemo } from 'react'
import { shipDetailToMarkdown } from 'services/userShips'
import CokeIcon from './images/dockyard_icon_coke.png'
import SuperCokeIcon from './images/dockyard_icon_super_coke.png'

type ShipLevelEditProps = {
  userShip: UserShip
  onChange: (userShip: UserShip) => void
}

export function ShipLevelEdit({ userShip, onChange }: ShipLevelEditProps) {
  const theme = useTheme()
  const {
    level,
    ship: { levels },
  } = userShip
  const lvl = level

  const marks = levels.reduce<Record<number, ReactNode>>(
    (acc, { cola, superCola, special }, i) => {
      acc[i + 1] = (
        <Box
          display="grid"
          gridAutoFlow="row"
          style={{
            filter: lvl < i + 1 ? 'grayscale(0.6)' : undefined,
          }}
          marginTop="1rem"
          gap="2"
          justifyItems="center"
        >
          {special && <SpecialLvlIcon size="2" marginTop="-7rem" />}
          {cola > 0 && (
            <Box
              as="span"
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="1"
            >
              <Image src={CokeIcon} alt="Cola" />
              <Text color="primaryText">{cola}</Text>
            </Box>
          )}
          {superCola > 0 && (
            <Box
              as="span"
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="1"
            >
              <Image src={SuperCokeIcon} alt="Super-Cola" />
              <Text color="primaryText">{superCola}</Text>
            </Box>
          )}
        </Box>
      )

      return acc
    },
    {},
  )

  const descriptions = useMemo(
    () => levels.map(l => shipDetailToMarkdown(l, true)),
    [levels],
  )

  return (
    <ExpansionPanel title="Ship level" icon={SpecialLvlIcon}>
      <InputLabel
        value={lvl}
        max={levels.length}
        name="Ship level Progression"
        descriptions={descriptions}
        isExtended={lvl > 10}
      >
        {levels.length > 1 && (
          <Slider
            min={1}
            max={levels.length}
            value={lvl}
            onChange={v =>
              onChange({
                ...userShip,
                level: Array.isArray(v) ? v[0] : v,
              })
            }
            marks={marks}
            style={{
              margin: levels.find(l => l.special)
                ? '6rem 2rem 16rem'
                : '2rem 2rem 16rem',
              width: 'auto',
            }}
            styles={{
              track: {
                backgroundColor:
                  lvl > 10 ? theme.colors.red : theme.colors.primaryText,
              },
              handle: {
                borderColor:
                  lvl > 10 ? theme.colors.red : theme.colors.primaryText,
              },
            }}
            activeDotStyle={{
              borderColor:
                lvl > 10 ? theme.colors.red : theme.colors.primaryText,
            }}
          />
        )}
      </InputLabel>
    </ExpansionPanel>
  )
}
