import styled from '@emotion/styled'
import { themeGet } from '@styled-system/theme-get'
import Box from 'components/Box'
import CharacterBox from 'components/CharacterBox'
import { UnitClassIcon } from 'components/Class'
import {
  CottonCandyIcon,
  LevelTextIcon,
  PirateFestAbilityIcon,
  PirateFestBothIcon,
  PirateFestSpecialIcon,
  SpecialLvlIcon,
  SupportIcon,
} from 'components/Icon'
import { LevelLB } from 'components/LevelLB'
import { PirateFestStyleIcon } from 'components/PirateFestStyle'
import PotentialAbility from 'components/PotentialAbility'
import PowerSocket from 'components/PowerSocket'
import Progression from 'components/Progression'
import { SubTitle, Text, Title } from 'components/Title'
import { useUserSettings } from 'hooks/useUserSettings'
import { ExtendedUnit, SingleUnitClass } from 'models/units'
import { UserUnit } from 'models/userBox'
import { LevelDisplayerOption } from 'pages/FilterSort/components/Displayers/LevelDisplayer'
import {
  flexbox,
  FlexboxProps,
  FlexDirectionProps,
  fontSize,
  FontSizeProps,
  gridArea,
  GridAreaProps,
  gridColumn,
  GridColumnProps,
  gridRow,
  GridRowProps,
  MarginProps,
  SpaceProps,
} from 'styled-system'

const Container = styled(Box)`
  display: grid;
  grid-template-areas:
    'title title'
    'icon info';
  place-items: center;
`

const Element = styled.div<
  GridRowProps & GridColumnProps & GridAreaProps & FlexboxProps & FontSizeProps
>`
  display: flex;
  ${flexbox}
  place-items: center;
  text-align: center;
  margin: ${themeGet('space.1')};
  ${gridRow}
  ${gridColumn}
  ${gridArea}
  ${fontSize}
`
Element.defaultProps = {
  flexDirection: 'column',
}

type RecapBoxProps = {
  userUnit: UserUnit
  original: UserUnit
}

export default function RecapBox ({
  userUnit,
  original,
  ...rest
}: RecapBoxProps & SpaceProps) {
  const {
    unit,
    potentials,
    special,
    support,
    pirateFest,
    sockets,
    cc: { atk, hp, rcv },
    level,
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
        <CharacterBox userUnit={userUnit} />
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
          "lvl lvl llb llb pfg"
        `}
      >
        <Element
          gridArea="lvl"
          flexDirection="row"
          justifyContent="center"
          fontSize="2"
        >
          <LevelTextIcon />
          <Progression
            value={level.lvl}
            max={level.lvlMax}
            variant="spaced"
            isDirty={level.lvl !== original.level.lvl}
          />
        </Element>

        {level.limitLvl !== undefined && level.limitStepLvl !== undefined && (
          <Element gridArea="llb" fontSize="2" justifyContent="center">
            <LevelLB
              limitLvl={level.limitLvl}
              limitStepLvl={level.limitStepLvl}
              isDirty={level.limitStepLvl !== original.level.limitStepLvl}
            />
          </Element>
        )}

        {special && (
          <Element gridArea="spe">
            <SpecialLvlIcon size="2" />
            <Progression
              value={special.lvl}
              max={special.lvlMax}
              isDirty={special.lvl !== original.special?.lvl}
            />
          </Element>
        )}

        {support && (
          <Element gridArea="sup">
            <SupportIcon size="2" />
            <Progression
              value={support.lvl}
              max={5}
              isDirty={support.lvl !== original.support?.lvl}
            />
          </Element>
        )}

        <Element gridArea="cch">
          <CottonCandyIcon
            size="2"
            color="specific.ccHp"
            title="Cotton Candy HP"
          />
          <Progression
            value={hp}
            max={ccLimit.hp}
            isDirty={hp !== original.cc.hp}
            prefix="+"
            variant="no-max"
          />
        </Element>

        <Element gridArea="cca">
          <CottonCandyIcon
            size="2"
            color="specific.ccAtk"
            title="Cotton Candy ATK"
          />
          <Progression
            value={atk}
            max={ccLimit.atk}
            isDirty={atk !== original.cc.atk}
            prefix="+"
            variant="no-max"
          />
        </Element>

        <Element gridArea="ccr">
          <CottonCandyIcon
            size="2"
            color="specific.ccRcv"
            title="Cotton Candy RCV"
          />
          <Progression
            value={rcv}
            max={ccLimit.rcv}
            isDirty={rcv !== original.cc.rcv}
            prefix="+"
            variant="no-max"
          />
        </Element>

        {potentials.length > 0 &&
          potentials.map(({ type, lvl }, i) => (
            <Element key={i} gridArea={`po${i + 1}`}>
              <PotentialAbility size="2" type={type} />
              <Progression
                value={lvl}
                max={5}
                isDirty={lvl !== original.potentials[i]?.lvl}
              />
            </Element>
          ))}

        {pirateFest && (
          <>
            <Element gridArea="pfs">
              <PirateFestSpecialIcon size="2" title="Pirate Rumble Special" />
              <Progression
                value={pirateFest.specialLvl}
                max={10}
                isDirty={
                  pirateFest.specialLvl !== original.pirateFest?.specialLvl
                }
              />
            </Element>
            <Element gridArea="pfa">
              <PirateFestAbilityIcon size="2" title="Pirate Rumble Ability" />
              <Progression
                value={pirateFest.abilityLvl}
                max={5}
                isDirty={
                  pirateFest.abilityLvl !== original.pirateFest?.abilityLvl
                }
              />
            </Element>
          </>
        )}

        {pirateFest && pirateFest.gplvl && (
          <Element gridArea="pfg">
            <PirateFestBothIcon size="2" title="Pirate Rumble GP" />
            <Progression
              value={pirateFest.gplvl}
              max={5}
              isDirty={pirateFest.gplvl !== original.pirateFest?.gplvl}
            />
          </Element>
        )}

        {sockets.length > 0 &&
          sockets.map(({ type, lvl }, i) => (
            <Element key={i} gridArea={`so${i + 1}}`}>
              <PowerSocket type={type} size="2" />
              <Progression
                value={lvl}
                max={5}
                isDirty={
                  lvl !== original.sockets[i]?.lvl ||
                  type !== original.sockets[i]?.type
                }
              />
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

  if (typeof classes === 'string' || classes.length < 3) {
    return <SingleUnitClassesDisplayer classes={classes as SingleUnitClass} />
  }

  return (
    <Box display="flex">
      {(classes as SingleUnitClass[]).map((c, i) => (
        <SingleUnitClassesDisplayer
          key={i}
          classes={c}
          flexDirection="column"
          marginLeft={i + 1 === classes.length ? 1 : 0}
          small
        />
      ))}
    </Box>
  )
}

function SingleUnitClassesDisplayer ({
  classes,
  small,
  ...props
}: FlexDirectionProps &
  MarginProps & {
    classes: SingleUnitClass
    small?: boolean
  }) {
  if (!classes) {
    return null
  }

  if (typeof classes === 'string') {
    return (
      <UnitClassIcon type={classes} size="1" margin={small ? '0.2rem' : '1'} />
    )
  }

  return (
    <Box display="flex" {...props}>
      {classes.map(c => (
        <UnitClassIcon
          key={c}
          type={c}
          size="1"
          margin={small ? '0.2rem' : '1'}
        />
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
  const { potentials, special, support, pirateFest } = userUnit

  return (
    <Box display="flex" {...rest}>
      <CharacterBox
        gridArea="icon"
        userUnit={userUnit}
        onClick={() => onClick?.(userUnit)}
        placeSelf="center"
        displayer={{
          type: 'level',
          options: { type: 'level LB' } as LevelDisplayerOption,
        }}
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
              {pirateFest.gplvl && (
                <Progression value={pirateFest.gplvl} max={5} />
              )}
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
