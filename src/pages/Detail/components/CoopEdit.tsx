import { useTheme } from '@emotion/react'
import { Box } from 'components/Box'
import { Button } from 'components/Button'
import { ExpansionPanel } from 'components/ExpansionPanel'
import { DupeInput } from 'components/forms/DupeInput'
import { LuckInput } from 'components/forms/LuckInput'
import { RangeInput } from 'components/forms/RangeInput'
import { CoopCaptainSvg, CoopIcon, CoopSpecialSvg } from 'components/Icon'
import { ExtendedUnit } from 'models/units'
import { UserUnitCoop } from 'models/userBox'
import { InputLabel } from '.'

type LevelEditProps = {
  coop: UserUnitCoop
  unit: ExtendedUnit
  onChange: (level: UserUnitCoop) => void
}

export function CoopEdit({ coop, unit, onChange }: LevelEditProps) {
  const theme = useTheme()

  const { dupeConsumed, luck, captain, special } = coop

  return (
    <ExpansionPanel title="Coop stats" icon={CoopIcon}>
      <InputLabel
        value={dupeConsumed}
        max={100}
        skipMax
        variant="no-max"
        name="Dupe consumption"
      >
        <DupeInput
          name="dupe-input"
          value={dupeConsumed}
          onChange={v =>
            onChange({
              ...coop,
              dupeConsumed: v,
            })
          }
        />
      </InputLabel>
      <InputLabel value={luck} max={100} name="Luck">
        <LuckInput
          name="luck-input"
          value={luck}
          max={100}
          onChange={v =>
            onChange({
              ...coop,
              luck: v,
            })
          }
        />
      </InputLabel>
      {(captain === 0 || special === 0) && (
        <Box display="grid" placeItems="center">
          <Button
            placeSelf="center"
            fontSize="1"
            my="3"
            variant="secondary"
            onClick={() => onChange({ ...coop, captain: 1, special: 1 })}
          >
            Unlock coop stats
          </Button>
        </Box>
      )}
      {captain > 0 && (
        <InputLabel value={captain} max={5} name="Coop-Captain">
          <RangeInput
            name="coop-captain-input"
            value={captain}
            min={1}
            max={5}
            thumbSvg={CoopCaptainSvg}
            range={{ color: theme.colors.primaryText }}
            onChange={e =>
              onChange({ ...coop, captain: Number(e.target.value) })
            }
          />
        </InputLabel>
      )}
      {special > 0 && (
        <InputLabel value={special} max={5} name="Coop-Special">
          <RangeInput
            name="coop-special-input"
            value={special}
            min={1}
            max={5}
            thumbSvg={CoopSpecialSvg}
            range={{ color: theme.colors.primaryText }}
            onChange={e =>
              onChange({ ...coop, special: Number(e.target.value) })
            }
          />
        </InputLabel>
      )}
    </ExpansionPanel>
  )
}
