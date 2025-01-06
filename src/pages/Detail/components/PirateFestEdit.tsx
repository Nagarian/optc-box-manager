import { ExpansionPanel } from 'components/ExpansionPanel'
import { PirateFestInput } from 'components/forms/PirateFestInput'
import { PirateFestBothIcon } from 'components/Icon'
import { UnitDetail } from 'models/units'
import { UserUnitPirateFest } from 'models/userBox'
import { InputLabel } from '.'

type PirateFestEditProps = {
  detail?: UnitDetail
  pirateFest?: UserUnitPirateFest
  onChange: (support: UserUnitPirateFest) => void
}

export function PirateFestEdit({
  pirateFest: pf,
  detail,
  onChange,
}: PirateFestEditProps) {
  if (!pf) return null

  const pirateFest = pf ?? {
    abilityLvl: 0,
    specialLvl: 0,
  }

  const { abilityLvl, specialLvl, gplvl } = pirateFest

  if (!detail) {
    return undefined
  }

  const { festAbility, festSpecial, festGPBurst, festGPLeader } = detail

  return (
    <ExpansionPanel title="Pirate Rumble" icon={PirateFestBothIcon}>
      <InputLabel
        value={specialLvl}
        max={10}
        name="Pirate Rumble Special"
        descriptions={
          festSpecial?.map(
            a => `**(${a.cooldown} seconds)** ${a.description}`,
          ) ?? new Array(10).fill('Not available, please take caution')
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
        descriptions={
          festAbility?.map(a => a.description) ??
          new Array(5).fill('Not available, please take caution')
        }
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
      {!!gplvl && (
        <InputLabel
          value={gplvl}
          max={5}
          name="Pirate Rumble GP"
          descriptions={
            festGPBurst?.map(
              (a, i) =>
                `### Leader:\n\n ${festGPLeader?.[i].description}\n\n### Burst [${a.use} uses]\n\nCondition: ${a.condition}\n\n${a.description}`,
            ) ?? new Array(10).fill('Not available, please take caution')
          }
        >
          <PirateFestInput
            name="festGP"
            value={gplvl}
            min={festGPBurst ? 1 : 0}
            max={5}
            onChange={e =>
              onChange({
                ...pirateFest,
                gplvl: Number(e.target.value),
              })
            }
          />
        </InputLabel>
      )}
    </ExpansionPanel>
  )
}
