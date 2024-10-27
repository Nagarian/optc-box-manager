import 'rc-slider/assets/index.css'
import { useTheme } from '@emotion/react'
import { DescriptionHighlighter } from 'components/DescriptionHighlighter'
import { ExpansionPanel } from 'components/ExpansionPanel'
import { LimitBreakIcon } from 'components/Icon'
import { Image } from 'components/Image'
import { Text } from 'components/Title'
import { LimitBreak, UnitCaptain, UnitDetail, UnitSailor } from 'models/units'
import { UserUnitLimitBreak } from 'models/userBox'
import Slider from 'rc-slider'
import { ReactNode } from 'react'
import { getLimitType, LimitBreakType } from 'services/limit'
import { InputLabel } from '..'
import CaptainImg from './images/captain.png'
import CooldownImg from './images/cooldown.png'
import KeyImg from './images/key.png'
import PotentialImg from './images/potential.png'
import SailorImg from './images/sailor.png'
import SocketImg from './images/socket.png'

type LimitBreakEditProps = {
  limitBreak?: UserUnitLimitBreak
  detail: UnitDetail
  onChange: (special: UserUnitLimitBreak) => void
}

export function LimitBreakEdit({
  limitBreak,
  detail,
  onChange,
}: LimitBreakEditProps) {
  const theme = useTheme()

  if (!limitBreak || !detail.limit?.length) {
    return detail.potential?.length ? (
      <ExpansionPanel title="Limit Break" icon={LimitBreakIcon} disabled />
    ) : null
  }

  const { lvl, lvlMax, keyLvlMax } = limitBreak

  const types = getLbTypes(detail.limit)

  const marks = types.reduce<Record<number, ReactNode>>((acc, { type }, i) => {
    if (type === 'stat') {
      return acc
    }

    const img = typeToImage(type)

    if (!img) {
      return acc
    }

    acc[i + 1] = (
      <Image
        src={img}
        size="2"
        style={{
          filter: lvl < i + 1 ? 'grayscale(0.6)' : undefined,
          position: 'absolute',
          transform: 'translateX(-50%)',
        }}
        marginTop={
          ['potential', 'sailor', 'socket'].includes(type)
            ? '-7rem'
            : ['key', 'captain'].includes(type)
              ? '1rem'
              : ['cooldown'].includes(type)
                ? types.filter(t => t.type !== 'stat').length > 10
                  ? '5rem'
                  : '1rem'
                : undefined
        }
      />
    )

    return acc
  }, {})

  return (
    <ExpansionPanel title="Limit Break" icon={LimitBreakIcon}>
      <InputLabel
        value={lvl}
        max={keyLvlMax ?? lvlMax}
        name="Limit Break Progression"
      >
        <Slider
          min={0}
          max={keyLvlMax ?? lvlMax}
          value={lvl}
          onChange={v =>
            onChange({
              ...limitBreak,
              lvl: Array.isArray(v) ? v[0] : v,
            })
          }
          marks={marks}
          style={{
            margin:
              types.filter(t => t.type !== 'stat').length > 10
                ? '6rem 2rem 9rem'
                : '6rem 2rem 6rem',
            width: 'auto',
          }}
          styles={{
            track: {
              backgroundColor:
                lvl > lvlMax ? theme.colors.red : theme.colors.primaryText,
            },
            handle: {
              borderColor:
                lvl > lvlMax ? theme.colors.red : theme.colors.primaryText,
            },
          }}
          activeDotStyle={{
            borderColor:
              lvl > lvlMax ? theme.colors.red : theme.colors.primaryText,
          }}
        />

        <LbProgression
          ats={types.filter(p => p.type === 'captain').map(p => p.at)}
          lvl={lvl}
          name="Captain amelioration"
          descriptions={CaptainDescription(detail.captain)}
        />

        <LbProgression
          ats={types.filter(p => p.type === 'sailor').map(p => p.at)}
          lvl={lvl}
          name="Sailor acquired"
          descriptions={[
            SailorDescription(
              types.slice(lvl).filter(p => p.type === 'sailor').length,
              detail.sailor,
            ),
          ]}
        />
      </InputLabel>
    </ExpansionPanel>
  )
}

function getLbTypes(
  limitBreak: LimitBreak[],
): { type: LimitBreakType; at: number }[] {
  return limitBreak.map(getLimitType).map((type, i) => ({ type, at: i + 1 }))
}

function typeToImage(lbType: LimitBreakType) {
  switch (lbType) {
    case 'potential':
      return PotentialImg
    case 'sailor':
      return SailorImg
    case 'socket':
      return SocketImg
    case 'captain':
      return CaptainImg
    case 'cooldown':
      return CooldownImg
    case 'key':
      return KeyImg
    case 'stat':
    default:
      return undefined
  }
}

function LbProgression({
  ats,
  lvl,
  name,
  descriptions,
}: {
  ats: number[]
  lvl: number
  name: ReactNode
  descriptions?: string[] | ReactNode[]
}) {
  return (
    <InputLabel
      value={ats.filter(v => v <= lvl).length + 1}
      max={ats.length + 1}
      descriptions={descriptions}
      name={name}
    />
  )
}

function SailorDescription(lockedCount: number, sailor: UnitSailor) {
  if (!sailor) return undefined

  const sailors: string[] = []

  if (typeof sailor === 'string') {
    sailors.push(sailor)
  } else {
    if ('combined' in sailor) sailors.push(sailor.combined)
    if ('base' in sailor && sailor.base) sailors.push(sailor.base)

    if (sailor.level1) {
      sailors.push(sailor.level1)
    }

    if (sailor.level2) {
      sailors.push(sailor.level2)
    }
  }

  return (
    <>
      {sailors.map((s, i) => (
        <Text key={i} color={i + 1 <= 2 - lockedCount ? undefined : 'grey'}>
          <DescriptionHighlighter value={s} />
        </Text>
      ))}
    </>
  )
}

function CaptainDescription(captain: UnitCaptain) {
  if (!captain) return []

  if (typeof captain === 'string') {
    return captain === 'None' ? [] : [captain]
  }

  return [
    'combined' in captain ? captain.combined : undefined,
    'base' in captain ? captain.base : undefined,
    ...Object.entries(captain)
      .filter(([key, value]) => key.startsWith('level'))
      .map(([key, value]) => value),
  ].filter(v => v)
}
