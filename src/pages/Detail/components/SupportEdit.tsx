import ExpansionPanel from 'components/ExpansionPanel'
import SupportInput from 'components/forms/SupportInput'
import { UnitSupport } from 'models/units'
import { UserUnitSupport } from 'models/userBox'
import React from 'react'
import { InputLabel } from '.'
import DescriptionHighlighter from 'components/DescriptionHighlighter'

type SupportEditProps = {
  detail?: UnitSupport
  support?: UserUnitSupport
  onChange: (support: UserUnitSupport) => void
}

export default function SupportEdit ({
  support,
  detail,
  onChange,
}: SupportEditProps) {
  if (!support) return null

  const { lvl } = support!

  const { Characters, description } = detail!

  return (
    <ExpansionPanel title="Support">
      <InputLabel
        value={lvl}
        max={5}
        name={
          <>
            <strong>For: </strong>
            <DescriptionHighlighter value={Characters} />
          </>
        }
        descriptions={description}
      >
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
    </ExpansionPanel>
  )
}
