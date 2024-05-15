import Box from 'components/Box'
import Button from 'components/Button'
import { InputHTMLAttributes } from 'react'
import RangeInput, { RangeInputProps } from './RangeInput'

export type RangeInputPlusProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value' | 'max' | 'min'
> &
  RangeInputProps & {
    value: number
    min: number
    max: number
    onChange: (n: number) => void
    adders: number[]
  }

export function RangeInputPlus({
  value,
  min,
  max,
  adders,
  onChange,
  ...p
}: RangeInputPlusProps) {
  const middle = Math.floor(adders.length / 2)

  return (
    <Box position="relative">
      <RangeInput
        {...p}
        value={value}
        min={min}
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
          {adders
            .filter((_, i) => i < middle)
            .map(adder => (
              <PlusButton
                key={adder}
                onChange={onChange}
                value={value}
                add={adder}
                min={min}
                max={max}
              />
            ))}
        </Box>
        <Box display="flex">
          {adders
            .filter((_, i) => i >= middle)
            .map(adder => (
              <PlusButton
                key={adder}
                onChange={onChange}
                value={value}
                add={adder}
                min={min}
                max={max}
              />
            ))}
        </Box>
      </Box>
    </Box>
  )
}

const PlusButton = ({
  value,
  add,
  min,
  max,
  onChange,
}: {
  value: number
  add: number
  min: number
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
          add >= min ? Math.min(value + add, max) : Math.max(value + add, min),
        )
      }
    >
      {add >= min ? `+${add}` : add}
    </Button>
  )
}
