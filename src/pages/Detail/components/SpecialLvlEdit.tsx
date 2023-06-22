import ExpansionPanel from 'components/ExpansionPanel'
import SpecialLevelInput from 'components/forms/SpecialLevelInput'
import { UnitDetail, UnitSpecial } from 'models/units'
import { UserUnitSpecial } from 'models/userBox'
import { ReactNode } from 'react'
import { InputLabel } from '.'
import DescriptionHighlighter from 'components/DescriptionHighlighter'
import { SpecialLvlIcon } from 'components/Icon'
import Box from 'components/Box'

type SpecialLvlEditProps = {
  special?: UserUnitSpecial
  detail: UnitDetail
  onChange: (special: UserUnitSpecial) => void
}

function MultiStageSpecial (special: UnitSpecial): ReactNode[] {
  if (typeof special === 'string') {
    return [<DescriptionHighlighter value={special} />]
  }

  if (typeof special !== 'object') {
    return []
  }

  if (Array.isArray(special)) {
    return [
      <Box as="ul" display="grid" gridAutoFlow="row" gap="2">
        {special.map(({ description }, i) => (
          <li key={i}>
            <strong>Stage {i + 1}: </strong>
            <DescriptionHighlighter value={description} />
          </li>
        ))}
      </Box>,
    ]
  }

  return [
    <Box as="ul" display="grid" gridAutoFlow="row" gap="2">
      {Object.entries(special)
        .filter(([key, value]) => !!value)
        .map(([key, value], i) => (
          <li key={i}>
            <strong>{key}: </strong>
            {MultiStageSpecial(value!)}
          </li>
        ))}
    </Box>,
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
        descriptions={MultiStageSpecial(detail.special)}
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
