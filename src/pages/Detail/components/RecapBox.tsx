import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import CharacterBox from 'components/CharacterBox'
import { UnitClassIcon } from 'components/Class'
import {
  CottonCandyIcon,
  PirateFestAbilityIcon,
  PirateFestBothIcon,
  PirateFestSpecialIcon,
  SpecialLvlIcon,
  SupportIcon,
} from 'components/Icon'
import { PirateFestStyleIcon } from 'components/PirateFestStyle'
import PotentialAbility from 'components/PotentialAbility'
import PowerSocket from 'components/PowerSocket'
import Progression, { Max } from 'components/Progression'
import { SubTitle, Text, Title } from 'components/Title'
import { useUserSettings } from 'hooks/useUserSettings'
import { ExtendedUnit, UnitClass } from 'models/units'
import { UserUnit } from 'models/userBox'
import React from 'react'
import styled from 'styled-components'
import {
  flexDirection,
  FlexDirectionProps,
  gridArea,
  GridAreaProps,
  gridColumn,
  GridColumnProps,
  gridRow,
  GridRowProps,
  SpaceProps,
} from 'styled-system'

const Container = styled(Box)`
  display: grid;
  grid-template-areas:
    'title title'
    'icon info';
  place-items: center;
`

const Element = styled.div<GridRowProps & GridColumnProps & GridAreaProps & FlexDirectionProps>`
  display: flex;
  ${flexDirection}
  place-items: center;
  text-align: center;
  margin: ${themeGet('space.1')};
  ${gridRow}
  ${gridColumn}
  ${gridArea}
`
Element.defaultProps = {
  flexDirection: 'column',
}

export default function RecapBox ({
  userUnit,
  ...rest
}: {
  userUnit: UserUnit
} & SpaceProps) {
  const {
    unit,
    potentials,
    special,
    support,
    pirateFest,
    sockets,
    cc: { atk, hp, rcv },
  } = userUnit

  const { ccLimit } = useUserSettings()

  return (
    <Container {...rest}>
      <Title gridArea="title">{unit.name}</Title>
      <Box
        gridArea="icon"
        // alignSelf="start"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <SubTitle>N°{unit.id}</SubTitle>
        <CharacterBox unit={unit} userUnit={userUnit} />
        {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
        <Text margin="1" textAlign="center">
          {unit.stars}⭐ - {unit.dropLocations.join(', ')}
        </Text>
        <Box display="flex" alignItems="center">
          <UnitClassesDisplayer unit={unit} />
          {unit.pirateFest.class && (
            <PirateFestStyleIcon
              type={unit.pirateFest.class}
              size="1"
              margin="2"
            />
          )}
        </Box>
      </Box>

      <Box
        gridArea="info"
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        justifySelf="flex-start"
        alignSelf="center"
        gridTemplateAreas={`
          "spe cch cca ccr sup"
          "po1 po2 po3 pfs pfa"
          "so1 so2 so3 so4 so5"
        `}
      >
        {special && (
          <Element gridArea="spe">
            <SpecialLvlIcon size="2" />
            <Progression value={special.lvl} max={special.lvlMax} />
          </Element>
        )}

        {support && (
          <Element gridArea="sup">
            <SupportIcon size="2" />
            <Progression value={support.lvl} max={5} />
          </Element>
        )}

        <Element gridArea="cch">
          <CottonCandyIcon
            size="2"
            color="specific.ccHp"
            title="Cotton Candy HP"
          />
          {hp === ccLimit.hp ? <Max /> : '+' + hp}
        </Element>

        <Element gridArea="cca">
          <CottonCandyIcon
            size="2"
            color="specific.ccAtk"
            title="Cotton Candy ATK"
          />
          {atk === ccLimit.atk ? <Max /> : '+' + atk}
        </Element>

        <Element gridArea="ccr">
          <CottonCandyIcon
            size="2"
            color="specific.ccRcv"
            title="Cotton Candy RCV"
          />
          {rcv === ccLimit.rcv ? <Max /> : '+' + rcv}
        </Element>

        {potentials.length > 0 &&
          potentials.map(({ type, lvl }, i) => (
            <Element key={i} gridArea={`po${i + 1}`}>
              <PotentialAbility size="2" type={type} />
              <Progression value={lvl} max={5} />
            </Element>
          ))}

        {pirateFest && (
          <>
            <Element gridArea="pfs">
              <PirateFestSpecialIcon size="2" title="Pirate Rumble Special" />
              <Progression value={pirateFest.specialLvl} max={10} />
            </Element>
            <Element gridArea="pfa">
              <PirateFestAbilityIcon size="2" title="Pirate Rumble Ability" />
              <Progression value={pirateFest.abilityLvl} max={5} />
            </Element>
          </>
        )}

        {sockets.length > 0 &&
          sockets.map(({ type, lvl }, i) => (
            <Element gridArea={`so${i + 1}}`}>
              <PowerSocket type={type} size="2" />
              <Progression value={lvl} max={5} />
            </Element>
          ))}
      </Box>
    </Container>
  )
}

function UnitClassesDisplayer ({
  unit: { class: classes },
}: {
  unit: ExtendedUnit
}) {
  if (!classes) {
    return null
  }

  if (typeof classes === 'string') {
    return <UnitClassIcon type={classes} size="1" margin="1" />
  }

  if (classes.length < 3) {
    return (
      <Box display="flex">
        {(classes as UnitClass[]).map(c => (
          <UnitClassIcon key={c} type={c} size="1" margin="1" />
        ))}
      </Box>
    )
  }

  return (
    <Box display="flex">
      {(classes as UnitClass[][]).map((c, i) => (
        <Box
          key={i}
          display="flex"
          flexDirection="column"
          marginLeft={i + 1 === classes.length ? 1 : 0}
        >
          {c.map(subClasses => (
            <UnitClassIcon
              key={subClasses}
              type={subClasses}
              size="1"
              margin="0.2rem"
            />
          ))}
        </Box>
      ))}
    </Box>
  )
}

export function RecapBoxLight ({
  userUnit,
  onClick,
  ...rest
}: {
  userUnit: UserUnit
  onClick?: (unit: UserUnit) => void
} & SpaceProps) {
  const { unit, potentials, special, support, pirateFest } = userUnit

  return (
    <Box display="flex" {...rest}>
      <CharacterBox
        gridArea="icon"
        unit={unit}
        userUnit={userUnit}
        onClick={() => onClick?.(userUnit)}
        placeSelf="center"
      />
      <Box
        gridArea="info"
        marginLeft="2"
        display="grid"
        onClick={() => onClick?.(userUnit)}
      >
        {special && (
          <Element gridRow="1" flexDirection="row">
            <SpecialLvlIcon size="2" />
            <Progression value={special.lvl} max={special.lvlMax} />
          </Element>
        )}

        {support && (
          <Element gridRow="1" flexDirection="row">
            <SupportIcon size="2" />
            <Progression value={support.lvl} max={5} />
          </Element>
        )}

        {pirateFest?.specialLvl && (
          <Element gridRow="1" flexDirection="row">
            <PirateFestBothIcon size="2" />

            <Box display="flex" flexDirection="column">
              <Progression value={pirateFest.specialLvl} max={10} />
              <Progression value={pirateFest.abilityLvl} max={5} />
            </Box>
          </Element>
        )}

        {potentials.length > 0 &&
          potentials.map(({ type, lvl }, i) => (
            <Element key={i} gridRow="2" flexDirection="row">
              <PotentialAbility size="2" type={type} />
              <Progression value={lvl} max={5} />
            </Element>
          ))}
      </Box>
    </Box>
  )
}
