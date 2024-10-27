import { DescriptionHighlighter } from 'components/DescriptionHighlighter'
import { ExpansionPanel } from 'components/ExpansionPanel'
import { SupportInput } from 'components/forms/SupportInput'
import { SupportIcon } from 'components/Icon'
import { UnitSupport } from 'models/units'
import { UserUnitSupport } from 'models/userBox'
import { InputLabel } from '.'

type SupportEditProps = {
  detail?: UnitSupport
  support?: UserUnitSupport
  onChange: (support: UserUnitSupport) => void
}

export function SupportEdit({ support, detail, onChange }: SupportEditProps) {
  const { lvl = 0 } = support || {}

  const { Characters, description } = detail || {}

  return (
    <ExpansionPanel title="Support" disabled={!support} icon={SupportIcon}>
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
