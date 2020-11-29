import ExpansionPanel from 'components/ExpansionPanel'
import SupportInput from 'components/forms/SupportInput'
import { UnitSupport } from 'models/units'
import { UserUnitSupport } from 'models/userBox'
import { InputLabel } from '.'
import DescriptionHighlighter from 'components/DescriptionHighlighter'
import { SupportIcon } from 'components/Icon'

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
  const { lvl } = support || {}

  const { Characters, description } = detail || {}

  return (
    <ExpansionPanel title="Support" disabled={!support} icon={SupportIcon}>
      <InputLabel
        value={lvl!}
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
