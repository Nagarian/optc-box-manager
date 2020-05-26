import Box from 'components/Box'
import ExpansionPanel from 'components/ExpansionPanel'
import SupportInput from 'components/forms/SupportInput'
import { SubTitle } from 'components/Title'
import { UnitSupport } from 'models/units'
import { UserUnitSupport } from 'models/userBox'
import React from 'react'
import { InputLabel } from '.'

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
      <Box my="2">
        <SubTitle fontSize="1">
          <strong>For: </strong>
          {Characters}
        </SubTitle>
        <p>
          <strong>max: </strong>
          {description[description.length - 1]}
        </p>
        {lvl > 0 && lvl < 5 && (
          <p>
            <strong>Level {lvl}: </strong>
            {description[lvl - 1]}
          </p>
        )}
      </Box>

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
    </ExpansionPanel>
  )
}
