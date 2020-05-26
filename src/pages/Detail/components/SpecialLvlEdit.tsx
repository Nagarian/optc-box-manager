import ExpansionPanel from 'components/ExpansionPanel'
import SpecialLevelInput from 'components/forms/SpecialLevelInput'
import { UnitDetail, UnitSpecial } from 'models/units'
import { UserUnitSpecial } from 'models/userBox'
import React, { ReactNode } from 'react'
import { InputLabel } from '.'

type SpecialLvlEditProps = {
  special?: UserUnitSpecial
  detail: UnitDetail
  onChange: (special: UserUnitSpecial) => void
}

function MultiStageSpecial (special: UnitSpecial): ReactNode[] {
  return Array.isArray(special)
    ? [
      <ul>
        {special.map(({ description }, i) => (
          <li key={i}>
            <strong>Stage {i + 1}: </strong>
            {description}
          </li>
        ))}
      </ul>,
    ]
    : [special]
}

export default function SpecialLvlEdit ({
  special,
  detail,
  onChange,
}: SpecialLvlEditProps) {
  if (!special) return null

  const { lvl, lvlMax } = special

  return (
    <ExpansionPanel title="Special">
      <InputLabel
        value={lvl}
        max={lvlMax}
        name={detail.specialName}
        descriptions={MultiStageSpecial(detail.special) as any}
      >
        {special.lvlMax > 1 && (
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
        )}
      </InputLabel>
    </ExpansionPanel>
  )
}
