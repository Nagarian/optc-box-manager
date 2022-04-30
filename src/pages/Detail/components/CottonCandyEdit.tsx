import Box from 'components/Box'
import ExpansionPanel from 'components/ExpansionPanel'
import CottonCandyInput from 'components/forms/CottonCandyInput'
import { CottonCandyIcon } from 'components/Icon'
import { useUserSettings } from 'hooks/useUserSettings'
import { CottonCandyType, UserUnitCottonCandy } from 'models/userBox'
import { InputLabel } from '.'

function Wrapper ({
  type,
  value,
  onChange,
  max,
}: {
  type: CottonCandyType
  value: number
  onChange: (value: number) => void
  max: number
}) {
  return (
    <InputLabel value={value} max={max} name={type.toUpperCase()}>
      <Box position="relative">
        <CottonCandyInput
          name={type}
          variant={type}
          value={value}
          max={max}
          onChange={onChange}
        />
      </Box>
    </InputLabel>
  )
}

type CottonCandyEditProps = {
  cc: UserUnitCottonCandy
  onChange: (uucc: UserUnitCottonCandy) => void
}

export default function CottonCandyEdit ({
  cc,
  onChange,
}: CottonCandyEditProps) {
  const { ccLimit } = useUserSettings()
  return (
    <ExpansionPanel title="Cotton Candies" icon={CottonCandyIcon}>
      <Wrapper
        type="hp"
        value={cc.hp}
        onChange={v => onChange({ ...cc, hp: v })}
        max={ccLimit.hp}
      />
      <Wrapper
        type="atk"
        value={cc.atk}
        onChange={v => onChange({ ...cc, atk: v })}
        max={ccLimit.atk}
      />
      <Wrapper
        type="rcv"
        value={cc.rcv}
        onChange={v => onChange({ ...cc, rcv: v })}
        max={ccLimit.rcv}
      />
    </ExpansionPanel>
  )
}
