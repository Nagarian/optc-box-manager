import CottonCandyInput from 'components/forms/CottonCandyInput'
import { UserUnitCottonCandy } from 'models/userBox'
import React from 'react'
import styled from 'styled-components'

const Displayer = styled.label`
  display: flex;
  align-items: center;
`
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
    <Displayer>
      <CottonCandyInput
        name={type}
        variant={type}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
      {value}
    </Displayer>
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
    <>
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
    </>
  )
}
