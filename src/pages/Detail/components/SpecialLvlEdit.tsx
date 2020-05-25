import SpecialLevelInput from 'components/forms/SpecialLevelInput'
import { UserUnitSpecial } from 'models/userBox'
import React from 'react'
import { InputLabel } from '.'

type CottonCandyEditProps = {
  special?: UserUnitSpecial
  onChange: (special: UserUnitSpecial) => void
}

export default function SpecialLvlEdit ({
  special,
  onChange,
}: CottonCandyEditProps) {
  if (!special) return null

  const { lvl, lvlMax } = special

  return (
    <InputLabel value={lvl} max={lvlMax}>
      <SpecialLevelInput
        name="support"
        max={lvlMax}
        value={lvl}
        onChange={e =>
          onChange({
            lvl: Number(e.target.value),
            lvlMax,
          })
        }
      />
    </InputLabel>
  )
}
