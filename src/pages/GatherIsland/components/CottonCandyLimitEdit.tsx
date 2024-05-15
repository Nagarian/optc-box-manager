import Box from 'components/Box'
import CottonCandyInput from 'components/forms/CottonCandyInput'
import { useUserSettings } from 'hooks/useUserSettings'
import { CottonCandyType } from 'models/userBox'
import { InputLabel } from 'pages/Detail/components'

const cottonCandyLimitMarksHash = [
  1, 3, 5, 7, 10, 12, 14, 16, 18, 30, 32, 34, 36, 38, 45, 47, 49, 51, 53, 60,
  62, 64, 66, 68, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100,
]

export default function CottonCandyLimitEdit() {
  const { userSetting, setUserSetting } = useUserSettings()
  const {
    cottonCandiesMaximumLevel: { atk, hp, rcv },
  } = userSetting

  const handleChange = (type: CottonCandyType, value: number) => {
    setUserSetting({
      ...userSetting,
      cottonCandiesMaximumLevel: {
        ...userSetting.cottonCandiesMaximumLevel,
        [type]: value,
      },
    })
  }

  return (
    <Box marginY="1">
      <CottonCandyLimitInput
        type="hp"
        name="Monument of Endurance"
        value={hp}
        onChange={v => handleChange('hp', v)}
      />
      <CottonCandyLimitInput
        type="atk"
        name="Monument of Ferocity"
        value={atk}
        onChange={v => handleChange('atk', v)}
      />
      <CottonCandyLimitInput
        type="rcv"
        name="Monument of Healing"
        value={rcv}
        onChange={v => handleChange('rcv', v)}
      />
    </Box>
  )
}

type CottonCandyLimitInputProps = {
  value: number
  name: string
  type: CottonCandyType
  onChange: (value: number) => void
}
function CottonCandyLimitInput({
  value,
  type,
  name,
  onChange,
}: CottonCandyLimitInputProps) {
  const hashValue = cottonCandyLimitMarksHash.indexOf(value) + 1

  return (
    <InputLabel
      value={hashValue}
      max={cottonCandyLimitMarksHash.length}
      name={name}
      descriptions={cottonCandyLimitMarksHash.map(
        v =>
          `Upgrade the max capacity of Cotton Candy ${type.toUpperCase()} to ${100 + v}`,
      )}
    >
      <CottonCandyInput
        max={cottonCandyLimitMarksHash.length}
        value={hashValue}
        name={`cc-${type}`}
        variant={type}
        onChange={v => onChange(cottonCandyLimitMarksHash[v - 1] ?? 0)}
        list="CottonCandyLimit"
        hideAdders
      />
    </InputLabel>
  )
}
