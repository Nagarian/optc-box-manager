import ExpansionPanel from 'components/ExpansionPanel'
import SupportInput from 'components/forms/SupportInput'
import { UnitSupport } from 'models/units'
import { UserUnitSupport } from 'models/userBox'
import React from 'react'
import { InputLabel } from '.'

type SupportEditProps = {
  supportDetail?: UnitSupport
  support?: UserUnitSupport
  onChange: (support: UserUnitSupport) => void
}

export default function SupportEdit ({
  support,
  supportDetail,
  onChange,
}: SupportEditProps) {
  if (!support) return null

  const { lvl } = support!

  const { Characters, description } = supportDetail!

  return (
    <ExpansionPanel title="Support">
      <InputLabel value={lvl} max={5}>
        <SupportInput
          name="support"
          value={lvl}
          onChange={e =>
            onChange({
              lvl: Number(e.target.value),
            })
          }
        />
      </InputLabel>

      <p>{Characters}</p>
      {description.map((desc, i) => (
        <p key={i}>
          {i}: {desc}
        </p>
      ))}
    </ExpansionPanel>
  )
}
