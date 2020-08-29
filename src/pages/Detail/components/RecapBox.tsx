import Box from 'components/Box'
import CharacterBox from 'components/CharacterBox'
import { CottonCandyIcon, SpecialLvlIcon, SupportIcon } from 'components/Icon'
import PotentialAbility from 'components/PotentialAbility'
import Progression, { Max } from 'components/Progression'
import { SubTitle, Title, Text } from 'components/Title'
import { UserUnit } from 'models/userBox'
import React from 'react'
import styled from 'styled-components'
import { SpaceProps } from 'styled-system'
import { UnitClassIcon } from 'components/Class'
import { UnitClass, ExtendedUnit } from 'models/units'

const Container = styled(Box)`
  display: grid;
  grid-template-areas:
    'title title'
    'icon info';
  place-items: center;
`

const Element = styled.div`
  display: flex;
  align-items: center;
`

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
    cc: { atk, hp, rcv },
  } = userUnit

  return (
    <Container {...rest}>
      <Title gridArea="title">{unit.name}</Title>
      <Box
        gridArea="icon"
        alignSelf="start"
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
        <UnitClassesDisplayer unit={unit} />
      </Box>
      <Box gridArea="info">
        {special && (
          <Element>
            <SpecialLvlIcon size="2" />
            <Progression value={special.lvl} max={special.lvlMax} />
          </Element>
        )}

        <Element>
          <CottonCandyIcon
            size="2"
            color="specific.ccHp"
            title="Cotton Candy HP"
          />
          {hp === 100 ? <Max /> : '+' + hp}

          <CottonCandyIcon
            size="2"
            color="specific.ccAtk"
            title="Cotton Candy ATK"
          />
          {atk === 100 ? <Max /> : '+' + atk}

          <CottonCandyIcon
            size="2"
            color="specific.ccRcv"
            title="Cotton Candy RCV"
          />
          {rcv === 100 ? <Max /> : '+' + rcv}
        </Element>

        {potentials.length > 0 && (
          <Element>
            {potentials.map(({ type, lvl }, i) => (
              <Element key={i}>
                <PotentialAbility size="2" type={type} />
                <Progression value={lvl} max={5} />
              </Element>
            ))}
          </Element>
        )}

        {support && (
          <Element>
            <SupportIcon size="2" />
            {support.lvl === 5 ? (
              <Max />
            ) : support.lvl === 0 ? (
              'not unlocked'
            ) : (
              `${support.lvl}/${5}`
            )}
          </Element>
        )}
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
        <Box display="flex" flexDirection="column" marginLeft={i + 1 === classes.length ? 1 : 0}>
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
  const { unit, potentials, special, support } = userUnit

  return (
    <Box display="flex" {...rest}>
      <CharacterBox
        gridArea="icon"
        unit={unit}
        userUnit={userUnit}
        onClick={() => onClick?.(userUnit)}
      />
      <Box
        gridArea="info"
        marginLeft="2"
        flex="1"
        onClick={() => onClick?.(userUnit)}
      >
        {special && (
          <Element>
            <SpecialLvlIcon size="2" />
            <Progression value={special.lvl} max={special.lvlMax} />

            {support && (
              <Element>
                <SupportIcon size="2" />
                {support.lvl === 5 ? (
                  <Max />
                ) : support.lvl === 0 ? (
                  'not unlocked'
                ) : (
                  `${support.lvl}/${5}`
                )}
              </Element>
            )}
          </Element>
        )}

        {potentials.length > 0 && (
          <Element>
            {potentials.map(({ type, lvl }, i) => (
              <Element key={i}>
                <PotentialAbility size="2" type={type} />
                <Progression value={lvl} max={5} />
              </Element>
            ))}
          </Element>
        )}
      </Box>
    </Box>
  )
}
