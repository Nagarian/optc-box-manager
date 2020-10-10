import ExpansionPanel from 'components/ExpansionPanel'
import { UnitDetail } from 'models/units'
import { UserUnitPirateFest } from 'models/userBox'
import React from 'react'
import { InputLabel } from '.'
import PirateFestInput from 'components/forms/PirateFestInput'
import { Text } from 'components/Title'
import { PirateFestIcon } from 'components/Icon'

type PirateFestEditProps = {
  detail?: UnitDetail
  pirateFest?: UserUnitPirateFest
  onChange: (support: UserUnitPirateFest) => void
}

export default function PirateFestEdit ({
  pirateFest: pf,
  detail,
  onChange,
}: PirateFestEditProps) {
  // if (!pirateFest) return null
  const pirateFest = pf ?? {
    abilityLvl: 0,
    specialLvl: 0,
  }

  const { abilityLvl, specialLvl } = pirateFest

  const { festAbility, festSpecial } = detail!

  return (
    <ExpansionPanel title="Pirate Rumble" icon={PirateFestIcon}>
      {(!festAbility || !festSpecial) &&
        <Text fontStyle="italic" color="red">
          Please take caution, at this time the database lacks of Pirate Rumble unit description,
          so the unit could or could not have Pirate Rumble-related Ability/Special.
          Nonetheless, we allow you to edit this statistic even if it was not present on the game.
        </Text>
      }
      <InputLabel
        value={specialLvl}
        max={10}
        name="Pirate Rumble Special"
        descriptions={
          festSpecial?.map(a => `**(${a.cooldown} seconds)** ${a.description}`) ??
          new Array(10).fill('Not available, please take caution')
        }
      >
        <PirateFestInput
          name="festSpecial"
          value={specialLvl}
          min={festSpecial ? 1 : 0}
          max={10}
          onChange={e =>
            onChange({
              ...pirateFest,
              specialLvl: Number(e.target.value),
            })
          }
        />
      </InputLabel>
      <InputLabel
        value={abilityLvl}
        max={5}
        name="Pirate Rumble Ability"
        descriptions={festAbility?.map(a => a.description) ?? new Array(5).fill('Not available, please take caution')}
      >
        <PirateFestInput
          name="festAbility"
          value={abilityLvl}
          min={festAbility ? 1 : 0}
          max={5}
          onChange={e =>
            onChange({
              ...pirateFest,
              abilityLvl: Number(e.target.value),
            })
          }
        />
      </InputLabel>
    </ExpansionPanel>
  )
}
