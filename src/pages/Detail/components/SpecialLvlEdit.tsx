import { Box } from 'components/Box'
import { DescriptionHighlighter } from 'components/DescriptionHighlighter'
import { ExpansionPanel } from 'components/ExpansionPanel'
import { SpecialLevelInput } from 'components/forms/SpecialLevelInput'
import { SpecialLvlIcon } from 'components/Icon'
import { UnitDetail, UnitSpecial } from 'models/units'
import { UserUnitSpecial } from 'models/userBox'
import { ReactNode } from 'react'
import { InputLabel } from '.'

type SpecialLvlEditProps = {
  special?: UserUnitSpecial
  detail: UnitDetail
  onChange: (special: UserUnitSpecial) => void
}

export function SpecialLvlEdit({
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
        descriptions={[detail.special]}
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
