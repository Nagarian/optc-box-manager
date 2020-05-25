import ExpansionPanel from 'components/ExpansionPanel'
import SpecialLevelInput from 'components/forms/SpecialLevelInput'
import { UserUnitSpecial } from 'models/userBox'
import React from 'react'
import { InputLabel } from '.'

type SpecialLvlEditProps = {
  special?: UserUnitSpecial
  onChange: (special: UserUnitSpecial) => void
}

export default function SpecialLvlEdit ({
  special,
  onChange,
}: SpecialLvlEditProps) {
  if (!special || special.lvlMax === 1) return null

  const { lvl, lvlMax } = special

  return (
    <ExpansionPanel title="Special">
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
    </ExpansionPanel>
  )
}
