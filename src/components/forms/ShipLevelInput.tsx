import { useTheme } from '@emotion/react'
import { ShipyardBottleSvg } from 'components/Icon'
import { ShipMedal } from 'components/ShipMedal'
import { UserShipModification } from 'models/shipBox'
import { InputLabel } from 'pages/Detail/components'
import { getShipStatRank } from 'services/userShips'
import { RangeInputPlus, RangeInputPlusProps } from './RangeInputPlus'

type ShipLevelInputProps = {
  type: Exclude<keyof UserShipModification, 'skillsLvl'>
  value: UserShipModification
  onChange: (userShipModification: UserShipModification) => void
}

type LocalProps = Omit<
  RangeInputPlusProps,
  | 'adders'
  | 'min'
  | 'max'
  | 'thumbSvg'
  | 'range'
  | 'value'
  | 'onChange'
  | 'type'
>

export function ShipLevelInput({
  color,
  type,
  value,
  onChange,
  ...p
}: ShipLevelInputProps & LocalProps) {
  const theme = useTheme()
  return (
    <InputLabel
      name={<ShipMedal type={type} stat={value[type]} width="5" />}
      value={value[type].rank}
      max={5}
    >
      <RangeInputPlus
        {...p}
        min={1}
        max={150}
        value={value[type].value}
        onChange={v => onChange(updateModification(value, type, v))}
        adders={[-1, 1, 5, 30, 50, 100]}
        thumbSvg={ShipyardBottleSvg}
        range={{
          color: color ?? theme.colors.primaryText,
        }}
      />
    </InputLabel>
  )
}

function updateModification(
  modification: UserShipModification,
  type: keyof UserShipModification,
  value: number,
): UserShipModification {
  if (type === 'skillsLvl') {
    throw new Error('not allowed')
  }

  const rank = getShipStatRank({
    rank: 0,
    value,
  })

  const updated: UserShipModification = {
    ...modification,
    [type]: {
      value,
      rank,
    },
  }

  updated.skillsLvl = Math.max(
    0,
    Math.min(updated.hp.rank - 3, updated.atk.rank - 3, updated.rcv.rank - 3),
  )

  return updated
}
