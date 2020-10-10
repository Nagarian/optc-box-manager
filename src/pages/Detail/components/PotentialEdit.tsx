import ExpansionPanel from 'components/ExpansionPanel'
import PotentialAbilityInput from 'components/forms/PotentialAbilityInput'
import { PotentialIcon } from 'components/Icon'
import { UnitPotential } from 'models/units'
import { UserUnitPotentialAbility } from 'models/userBox'
import React from 'react'
import { InputLabel } from '.'

function Wrapper ({
  potential: { type, lvl, keyState },
  detail: { description, Name },
  onChange,
}: {
  potential: UserUnitPotentialAbility
  detail: UnitPotential
  onChange: (potential: UserUnitPotentialAbility) => void
}) {
  return (
    <InputLabel value={lvl} max={5} name={Name} descriptions={description}>
      <PotentialAbilityInput
        name={type}
        value={lvl}
        variant={type}
        onChange={e =>
          onChange({
            lvl: Number(e.target.value),
            type: type,
            keyState:
              keyState && (Number(e.target.value) > 0 ? 'unlocked' : 'locked'),
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
  details,
  onChange,
}: PotentialEditProps) {
  if (potentials.length === 0) {
    return null
  }

  return (
    <ExpansionPanel title="Potentials" icon={PotentialIcon}>
      {potentials.map(potential => (
        <Wrapper
          key={potential.type}
          potential={potential}
          detail={details.find(d => d.Name === potential.type)!}
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
