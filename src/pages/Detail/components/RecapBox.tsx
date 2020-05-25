import Box from 'components/Box'
import CharacterBox from 'components/CharacterBox'
import { CottonCandyIcon, SpecialLvlIcon, SupportIcon } from 'components/Icon'
import PotentialAbility from 'components/PotentialAbility'
import { SubTitle, Title } from 'components/Title'
import { ExtendedUnit } from 'models/units'
import { UserUnit } from 'models/userBox'
import React from 'react'
import styled from 'styled-components'
import { SpaceProps } from 'styled-system'
import { Max } from '.'

const Container = styled(Box)`
  display: grid;
  grid-template-areas:
    'title title'
    'num info'
    'icon info';
    place-items: center;
`

const Element = styled.div`
  display: flex;
  align-items: center;
`

export default function RecapBox ({
  unit,
  userUnit,
  ...rest
}: {
  unit: ExtendedUnit
  userUnit: UserUnit
} & SpaceProps) {
  const {
    potentials,
    special,
    support,
    cc: { atk, hp, rcv },
  } = userUnit

  return (
    <Container>
      <Title gridArea="title">{unit.name}</Title>
      <SubTitle gridArea="num">N°{unit.id}</SubTitle>
      <CharacterBox
        gridArea="icon"
        alignSelf="start"
        unit={unit}
        userUnit={userUnit}
      />
      <Box gridArea="info">
        {special && (
          <Element>
            <SpecialLvlIcon size="2" />
            {special.lvl === special.lvlMax
              ? <Max />
              : `${special.lvl}/${special.lvlMax}`}
          </Element>
        )}

        <Element>
          <CottonCandyIcon size="2" color="specific.ccAtk" />
          {atk === 100 ? <Max /> : '+' + atk}

          <CottonCandyIcon size="2" color="specific.ccHp" />
          {hp === 100 ? <Max /> : '+' + hp}

          <CottonCandyIcon size="2" color="specific.ccRcv" />
          {rcv === 100 ? <Max /> : '+' + rcv}
        </Element>

        {potentials.length > 0 && (
          <Element>
            {potentials.map(({ type, lvl }, i) => (
              <Element key={i}>
                <PotentialAbility size="2" type={type} />
                {lvl === 5 ? <Max /> : `${lvl}/${5}`}
              </Element>
            ))}
          </Element>
        )}

        {support && (
          <Element>
            <SupportIcon size="2" color="specific.support" />
            {support.lvl === 5
              ? <Max />
              : support.lvl === 0
                ? 'not unlocked'
                : `${support.lvl}/${5}`}
          </Element>
        )}
      </Box>
    </Container>
  )
}
