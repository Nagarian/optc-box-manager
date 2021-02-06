import Box from 'components/Box'
import Button from 'components/Button'
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
          onChange={e => onChange(Number(e.target.value))}
        />

        <Box
          position="absolute"
          top="-100%"
          left="0"
          right="0"
          display="flex"
          justifyContent="space-between"
        >
          <Box display="flex">
            <PlusButton onChange={onChange} value={value} add={-1} max={max} />
            <PlusButton onChange={onChange} value={value} add={100} max={max} />
          </Box>
          <Box display="flex">
            <PlusButton onChange={onChange} value={value} add={30} max={max} />
            <PlusButton onChange={onChange} value={value} add={5} max={max} />
            <PlusButton onChange={onChange} value={value} add={1} max={max} />
          </Box>
        </Box>
      </Box>
    </InputLabel>
  )
}

const PlusButton = ({
  value,
  add,
  max,
  onChange,
}: {
  value: number
  add: number
  max: number
  onChange: (value: number) => void
}) => {
  return (
    <Button
      fontSize="1"
      px="2"
      variant="link"
      onClick={() =>
        onChange(
          add > 0 ? Math.min(value + add, max) : Math.max(value + add, 0),
        )
      }
    >
      {add > 0 ? `+${add}` : add}
    </Button>
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
