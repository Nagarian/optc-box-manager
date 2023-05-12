import ExpansionPanel from 'components/ExpansionPanel'
import SpecialLevelInput from 'components/forms/SpecialLevelInput'
import { UnitDetail, UnitSpecial } from 'models/units'
import { UserUnitSpecial } from 'models/userBox'
import { ReactNode } from 'react'
import { InputLabel } from '.'
import DescriptionHighlighter from 'components/DescriptionHighlighter'
import { SpecialLvlIcon } from 'components/Icon'

type SpecialLvlEditProps = {
  special?: UserUnitSpecial
  detail: UnitDetail
  onChange: (special: UserUnitSpecial) => void
}

function MultiStageSpecial (special: UnitSpecial): ReactNode[] {
  if (Array.isArray(special)) {
    return [
      <ul>
        {special.map(({ description }, i) => (
          <li key={i}>
            <strong>Stage {i + 1}: </strong>
            <DescriptionHighlighter value={description} />
          </li>
        ))}
      </ul>,
    ]
  }

  if (typeof special === 'string') return [special]

  if (typeof special !== 'object') {
    return []
  }

  if ('llbbase' in special) {
    return MultiStageSpecial(special.llbbase)
  }

  return [
    <ul>
      {Object.entries(special)
        .filter(([key, value]) => typeof value === 'string')
        .map(([key, value], i) => (
          <li key={i}>
            <strong>{key}: </strong>
            <DescriptionHighlighter value={value} />
          </li>
        ))}
    </ul>,
  ]
}

export default function SpecialLvlEdit ({
  special,
  detail,
  onChange,
}: SpecialLvlEditProps) {
  if (!special) return null

  const { lvl, lvlMax } = special

  return (
    <ExpansionPanel title="Special" icon={SpecialLvlIcon}>
      <InputLabel
        value={lvl}
        max={lvlMax}
        name={detail.specialName}
        descriptions={MultiStageSpecial(detail.special) as any}
      >
        {special.lvlMax > 1 && (
          <SpecialLevelInput
            name="support"
            max={lvlMax}
            value={lvl}
            onChange={e =>
              onChange({
                lvl: Number(e.target.value),
                lvlMax,
              })
            }
          />
        )}
      </InputLabel>
    </ExpansionPanel>
  )
}
