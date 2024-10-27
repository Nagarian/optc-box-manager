import { ExpansionPanel } from 'components/ExpansionPanel'
import { InkInput } from 'components/forms/InkInput'
import { InkIcon } from 'components/Icon'
import { UserUnitInk } from 'models/userBox'
import { InputLabel } from '.'

type InkEditProps = {
  ink?: UserUnitInk
  onChange: (support: UserUnitInk) => void
}

export function InkEdit({ ink, onChange }: InkEditProps) {
  if (!ink) return null

  const { lvl } = ink || {}

  return (
    <ExpansionPanel title="Ink Effects" disabled={!ink} icon={InkIcon}>
      <InputLabel value={lvl} max={2} name="Ink Effects">
        <InkInput
          name="ink"
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
