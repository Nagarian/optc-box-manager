import 'rc-slider/assets/index.css'
import { useTheme } from '@emotion/react'
import { ExpansionPanel } from 'components/ExpansionPanel'
import { LevelInput } from 'components/forms/LevelInput'
import { LevelIcon } from 'components/Icon'
import { levelLBFromStepLevel, levelLBMaxLevel } from 'components/LevelLB'
import { ExtendedUnit, UnitType } from 'models/units'
import { UserUnitLevel } from 'models/userBox'
import Slider from 'rc-slider'
import { InputLabel } from '.'

type LevelEditProps = {
  level?: UserUnitLevel
  unit: ExtendedUnit
  onChange: (level: UserUnitLevel) => void
}

export function LevelEdit({ level, unit, onChange }: LevelEditProps) {
  const theme = useTheme()

  if (!level) return null

  const { lvl, lvlMax, limitLvl, limitStepLvl } = level

  const type = (Array.isArray(unit.type) ? unit.type[0] : unit.type) as Exclude<
    UnitType,
    'DUAL' | 'VS'
  >

  return (
    <ExpansionPanel title="Level" icon={LevelIcon}>
      <InputLabel value={lvl} max={lvlMax} name="Level Exp">
        <LevelInput
          name="level-input"
          value={lvl}
          max={lvlMax}
          color={theme.colors.orb[type]}
          onChange={v =>
            onChange({
              ...level,
              lvl: v,
            })
          }
        />
      </InputLabel>

      {limitLvl !== undefined && limitStepLvl !== undefined && (
        <InputLabel
          value={limitLvl}
          max={5}
          name="Level Limit Break Progression"
        >
          <Slider
            min={0}
            max={9}
            value={limitStepLvl}
            onChange={v => {
              const stepLvl = Array.isArray(v) ? v[0] : v
              onChange({
                ...level,
                lvlMax: levelLBMaxLevel[levelLBFromStepLevel[stepLvl]],
                limitLvl: levelLBFromStepLevel[stepLvl],
                limitStepLvl: stepLvl,
              })
            }}
            marks={{
              1: {
                style: { color: theme.colors.text },
                label: '1',
              },
              2: {
                style: { color: theme.colors.text },
                label: '2',
              },
              4: {
                style: { color: theme.colors.text },
                label: '3',
              },
              6: {
                style: { color: theme.colors.text },
                label: '4',
              },
              9: {
                style: { color: theme.colors.text },
                label: '5',
              },
            }}
            style={{
              margin: `${theme.space[3]} ${theme.space[3]} ${theme.space[4]} ${theme.space[3]}`,
              width: 'auto',
            }}
            styles={{
              track: {
                backgroundColor: theme.colors.primaryText,
              },
              handle: {
                borderColor: theme.colors.primaryText,
              },
            }}
            activeDotStyle={{
              borderColor: theme.colors.primaryText,
            }}
          />
        </InputLabel>
      )}
    </ExpansionPanel>
  )
}
