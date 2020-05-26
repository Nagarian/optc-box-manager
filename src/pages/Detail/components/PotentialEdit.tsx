import ExpansionPanel from 'components/ExpansionPanel'
import PotentialAbilityInput from 'components/forms/PotentialAbilityInput'
import { UnitPotential } from 'models/units'
import { UserUnitPotentialAbility } from 'models/userBox'
import React from 'react'
import { InputLabel } from '.'

function Wrapper ({
  potential: { type, lvl },
  onChange,
}: {
  potential: UserUnitPotentialAbility
  onChange: (potential: UserUnitPotentialAbility) => void
}) {
  return (
    <InputLabel value={lvl} max={5}>
      <PotentialAbilityInput
        name={type}
        value={lvl}
        variant={type}
        onChange={e =>
          onChange({
            lvl: Number(e.target.value),
            type: type,
          })
        }
      />
    </InputLabel>
  )
}

type PotentialEditProps = {
  potentials: UserUnitPotentialAbility[]
  details: UnitPotential[]
  onChange: (potentials: UserUnitPotentialAbility[]) => void
}

export default function PotentialEdit ({
  potentials,
  onChange,
}: PotentialEditProps) {
  if (potentials.length === 0) {
    return null
  }

  return (
    <ExpansionPanel title="Potential Abilities">
      {potentials.map(potential => (
        <Wrapper
          potential={potential}
          onChange={potential =>
            onChange(
              potentials.map(p => (p.type === potential.type ? potential : p)),
            )
          }
        />
      ))}
    </ExpansionPanel>
  )
}
