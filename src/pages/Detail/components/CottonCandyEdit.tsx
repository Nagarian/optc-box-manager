import ExpansionPanel from 'components/ExpansionPanel'
import CottonCandyInput from 'components/forms/CottonCandyInput'
import { UserUnitCottonCandy } from 'models/userBox'
import React from 'react'
import { InputLabel } from '.'

type CottonCandyType = 'atk' | 'rcv' | 'hp'

function Wrapper ({
  type,
  value,
  onChange,
}: {
  type: CottonCandyType
  value: number
  onChange: (value: number) => void
}) {
  return (
    <InputLabel value={value} max={100} name={type.toUpperCase()}>
      <CottonCandyInput
        name={type}
        variant={type}
        value={value}
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
  return (
    <ExpansionPanel title="Cotton Candies">
      <Wrapper
        type="atk"
        value={cc.atk}
        onChange={v => onChange({ ...cc, atk: v })}
      />
      <Wrapper
        type="hp"
        value={cc.hp}
        onChange={v => onChange({ ...cc, hp: v })}
      />
      <Wrapper
        type="rcv"
        value={cc.rcv}
        onChange={v => onChange({ ...cc, rcv: v })}
      />
    </ExpansionPanel>
  )
}
