import ExpansionPanel from 'components/ExpansionPanel'
import CottonCandyInput from 'components/forms/CottonCandyInput'
import { UserUnitCottonCandy } from 'models/userBox'
import React from 'react'
import { InputLabel } from '.'
import { useUserSettings } from 'hooks/useUserSettings'

type CottonCandyType = 'atk' | 'rcv' | 'hp'

function Wrapper ({
  type,
  value,
  onChange,
  max,
}: {
  type: CottonCandyType
  value: number
  onChange: (value: number) => void,
  max: number
}) {
  return (
    <InputLabel value={value} max={max} name={type.toUpperCase()}>
      <CottonCandyInput
        name={type}
        variant={type}
        value={value}
        max={max}
        onChange={e => onChange(Number(e.target.value))}
      />
    </InputLabel>
  )
}

type CottonCandyEditProps = {
  cc: UserUnitCottonCandy
  onChange: (uucc: UserUnitCottonCandy) => void
}

export default function CottonCandyEdit ({
  cc,
  onChange,
}: CottonCandyEditProps) {
  const { ccLimit } = useUserSettings()
  return (
    <ExpansionPanel title="Cotton Candies">
      <Wrapper
        type="hp"
        value={cc.hp}
        onChange={v => onChange({ ...cc, hp: v })}
        max={ccLimit}
      />
      <Wrapper
        type="atk"
        value={cc.atk}
        onChange={v => onChange({ ...cc, atk: v })}
        max={ccLimit}
      />
      <Wrapper
        type="rcv"
        value={cc.rcv}
        onChange={v => onChange({ ...cc, rcv: v })}
        max={ccLimit}
      />
    </ExpansionPanel>
  )
}
