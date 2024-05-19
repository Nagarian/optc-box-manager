import styled from '@emotion/styled'
import Box from 'components/Box'
import CharacterBox from 'components/CharacterBox'
import { UnitClassIcon } from 'components/Class'
import {
  CoopCaptainIcon,
  CoopSpecialIcon,
  CottonCandyIcon,
  LevelTextIcon,
  LockIcon,
  PirateFestAbilityIcon,
  PirateFestBothIcon,
  PirateFestSpecialIcon,
  SpecialLvlIcon,
  SupportIcon,
} from 'components/Icon'
import { LevelLB } from 'components/LevelLB'
import { Luck } from 'components/Luck'
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

type RecapBoxProps = {
  userUnit: UserUnit
  original: UserUnit
}

export default function RecapBox({
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
    coop,
  } = userUnit

  const { ccLimit } = useUserSettings()

  return (
    <Box
      display="grid"
      placeItems="center"
      gridTemplateColumns={['1fr 1fr', '1fr minmax(auto, 12rem) 1fr']}
      gap="1"
      gridTemplateAreas={[
        `'icon title'
         'info info'`,
        `'title title title'
         'full  icon  info'`,
      ]}
      {...rest}
    >
      <Title gridArea="title">{unit.name}</Title>
      <Box
        gridArea="full"
        placeSelf="stretch"
        backgroundImage={`url(${unit.images.full})`}
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
        backgroundPosition="center"
        display={['none', 'grid']}
        placeContent="end"
      />
      <Box
        gridArea="icon"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <SubTitle>N°{unit.id}</SubTitle>
        <CharacterBox userUnit={userUnit} />
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
        gridTemplateColumns="repeat(6, 1fr)"
        alignSelf="center"
        gridTemplateAreas={`
          "lvl lvl llb llb luk luk"
          "spe cch cca ccr luc lus"
          "sup so1 so2 so3 so4 so5"
          "po1 po2 po3 pfa pfs pfg"
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
          <Element gridArea="spe" title="Special">
            <SpecialLvlIcon size="2" />
            <Progression
              value={special.lvl}
              max={special.lvlMax}
              isDirty={special.lvl !== original.special?.lvl}
            />
          </Element>
        )}

        <Element gridArea="luk" justifyContent="center">
          <Luck lvl={coop.luck} isDirty={coop.luck !== original.coop.luck} />
        </Element>

        <Element gridArea="luc" justifyContent="center">
          <CoopCaptainIcon size="2" />
          {coop.captain > 0 ? (
            <Progression
              value={coop.captain}
              max={5}
              isDirty={coop.captain !== original.coop.captain}
            />
          ) : (
            <LockIcon size="0" mt="1" />
          )}
        </Element>

        <Element gridArea="lus" justifyContent="center">
          <CoopSpecialIcon size="2" />
          {coop.special > 0 ? (
            <Progression
              value={coop.special}
              max={5}
              isDirty={coop.special !== original.coop.special}
            />
          ) : (
            <LockIcon size="0" mt="1" />
          )}
        </Element>

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

        <Element gridArea="cch" title="Cotton Candy HP">
          <CottonCandyIcon size="2" color="specific.ccHp" />
          <Progression
            value={hp}
            max={ccLimit.hp}
            isDirty={hp !== original.cc.hp}
            prefix="+"
            variant="no-max"
          />
        </Element>

        <Element gridArea="cca" title="Cotton Candy ATK">
          <CottonCandyIcon size="2" color="specific.ccAtk" />
          <Progression
            value={atk}
            max={ccLimit.atk}
            isDirty={atk !== original.cc.atk}
            prefix="+"
            variant="no-max"
          />
        </Element>

        <Element gridArea="ccr" title="Cotton Candy RCV">
          <CottonCandyIcon size="2" color="specific.ccRcv" />
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
            <Element gridArea="pfs" title="Pirate Rumble Special">
              <PirateFestSpecialIcon size="2" />
              <Progression
                value={pirateFest.specialLvl}
                max={10}
                isDirty={
                  pirateFest.specialLvl !== original.pirateFest?.specialLvl
                }
              />
            </Element>
            <Element gridArea="pfa" title="Pirate Rumble Ability">
              <PirateFestAbilityIcon size="2" />
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
          <Element gridArea="pfg" title="Pirate Rumble GP">
            <PirateFestBothIcon size="2" />
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
    </Box>
  )
}

function UnitClassesDisplayer({
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

function SingleUnitClassesDisplayer({
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

export function RecapBoxLight({
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
      <Box marginLeft="2" display="grid" onClick={() => onClick?.(userUnit)}>
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

type ElementType = GridRowProps &
  GridColumnProps &
  GridAreaProps &
  FlexboxProps &
  FontSizeProps
const Element = styled.div<ElementType>`
  display: flex;
  flex-direction: column;
  ${flexbox}
  place-items: center;
  text-align: center;
  margin: ${p => p.theme.space[1]};
  ${gridRow}
  ${gridColumn}
  ${gridArea}
  ${fontSize}
`
