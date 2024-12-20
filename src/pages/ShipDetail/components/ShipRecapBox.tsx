import { BoatBox } from 'components/BoatBox'
import { Box } from 'components/Box'
import { DescriptionHighlighter } from 'components/DescriptionHighlighter'
import { Image } from 'components/Image'
import { Progression } from 'components/Progression'
import { ShipMedal } from 'components/ShipMedal'
import { ShipSkill } from 'components/ShipSkill'
import { SubTitle, Title } from 'components/Title'
import { UserShip } from 'models/shipBox'
import { userShipToMarkdown } from 'services/userShips'
import { SpaceProps } from 'styled-system'

type ShipRecapBoxProps = {
  userShip: UserShip
  original: UserShip
}
export function ShipRecapBox({
  userShip,
  original,
  ...rest
}: ShipRecapBoxProps & SpaceProps) {
  const {
    ship: { id, name, images, levels, skills },
    obtained,
    level,
    modification,
  } = userShip

  return (
    <Box
      display="grid"
      placeItems="center"
      gridTemplateColumns={['auto 1fr', '1fr minmax(auto, 12rem) 1fr']}
      gridTemplateRows="auto 1fr"
      gap="1"
      gridTemplateAreas={[
        `'icon title'
           'icon info'`,
        `'title title title'
           'full  icon  info'`,
      ]}
      {...rest}
    >
      <Title gridArea="title">{name}</Title>
      <Box
        gridArea="full"
        display={['none', 'grid']}
        placeContent="end"
        style={{
          filter: obtained ? undefined : 'brightness(0.5)',
        }}
      >
        <Image
          src={images.full}
          size="100%"
          alt={`Ship "${name}" full picture`}
        />
      </Box>
      <Box
        gridArea="icon"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <SubTitle>N°{id}</SubTitle>
        <BoatBox userShip={userShip} />
        {modification && (
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            placeContent="center"
          >
            <ShipSkill isUnlocked={modification.skillsLvl >= 1} size="2" />
            <ShipSkill isUnlocked={modification.skillsLvl >= 2} size="2" />
          </Box>
        )}
      </Box>
      <Box gridArea="info" display="flex" flexDirection="column" gap="2">
        {modification && (
          <Box
            display="grid"
            gridTemplateColumns="1fr 1fr 1fr"
            placeItems="center"
            gap="2"
          >
            <ShipMedal
              type="hp"
              stat={modification.hp}
              isDirty={modification.hp !== original.modification?.hp}
              width="100%"
            />
            <ShipMedal
              type="atk"
              stat={modification.atk}
              isDirty={modification.atk !== original.modification?.atk}
              width="100%"
            />
            <ShipMedal
              type="rcv"
              stat={modification.rcv}
              isDirty={modification.rcv !== original.modification?.rcv}
              width="100%"
            />
          </Box>
        )}
        {obtained && (
          <Progression
            max={levels.length}
            value={level}
            prefix="Level: "
            isDirty={level !== original.level}
          />
        )}
        <DescriptionHighlighter value={userShipToMarkdown(userShip)} />
      </Box>
    </Box>
  )
}
