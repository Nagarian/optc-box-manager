import { useTheme } from '@emotion/react'
import { ExpansionPanel } from 'components/ExpansionPanel'
import { RangeInput } from 'components/forms/RangeInput'
import { PirateFestIcon, PirateFestSvg } from 'components/Icon'
import { ShipEventLevel, ShipLevel } from 'models/ships'
import { InputLabel } from 'pages/Detail/components'
import { useMemo, useState } from 'react'
import { shipDetailToMarkdown } from 'services/userShips'

type ShipEventDisplayerProps = {
  levels: ShipLevel[]
  eventLevels?: ShipEventLevel[]
}
export function ShipEventDisplayer({
  levels,
  eventLevels = [],
}: ShipEventDisplayerProps) {
  const theme = useTheme()
  const [lvl, setLvl] = useState<number>(1)

  const all = useMemo<ShipEventLevel[]>(() => {
    return [
      ...levels.map(l => ({
        description: 'Outside event',
        ability: l.ability,
        special: l.special,
      })),
      ...eventLevels,
    ]
  }, [levels, eventLevels])

  const descriptions = useMemo<string[]>(() => {
    return all.map(e => `${e.description}\n\n${shipDetailToMarkdown(e, true)}`)
  }, [all])

  if (!eventLevels.length) {
    return undefined
  }

  return (
    <ExpansionPanel title="Event override" icon={PirateFestIcon}>
      <InputLabel
        value={lvl}
        max={levels.length + eventLevels.length}
        name="Event step"
        descriptions={descriptions}
        skipMax
      >
        <RangeInput
          value={lvl}
          onChange={e => setLvl(e.currentTarget.valueAsNumber)}
          min={1}
          max={all.length}
          thumbSvg={PirateFestSvg}
          range={{
            color: theme.colors.primaryText,
          }}
        />
      </InputLabel>
    </ExpansionPanel>
  )
}
