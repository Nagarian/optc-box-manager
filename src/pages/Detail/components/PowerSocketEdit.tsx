import Box from 'components/Box'
import Button from 'components/Button'
import ExpansionPanel from 'components/ExpansionPanel'
import ImageInput from 'components/forms/ImageInput'
import PowerSocketInput from 'components/forms/PowerSocketInput'
import { SkillBookIcon } from 'components/Icon'
import PowerSocket from 'components/PowerSocket'
import Progression from 'components/Progression'
import { ExtendedUnit, PowerSockets } from 'models/units'
import { UserUnitPowerSocket } from 'models/userBox'
import { useState } from 'react'
import { InputLabel } from '.'

type PowerSocketEditProps = {
  powerSockets: UserUnitPowerSocket[]
  unit: ExtendedUnit
  onChange: (PowerSockets: UserUnitPowerSocket[]) => void
}

export default function PowerSocketEdit ({
  powerSockets,
  unit,
  onChange,
}: PowerSocketEditProps) {
  const [currentIndex, setCurrentIndex] = useState<number>()
  const changeHandler = (uu: UserUnitPowerSocket) => {
    if (currentIndex === undefined) {
      return
    }

    const arr = [...powerSockets]
    arr.splice(currentIndex, 1, uu)
    onChange(arr)
  }

  const defaultSocketLvl =
    powerSockets[0]?.lvl >= 1 && powerSockets[0]?.lvl < 5 ? 1 : 5

  return (
    <ExpansionPanel
      title="Power Sockets"
      icon={SkillBookIcon}
      disabled={!powerSockets.length}
    >
      <UserPowerSocketDispayer
        powerSockets={powerSockets}
        selectedIndex={currentIndex}
        onClick={i => setCurrentIndex(i)}
      />

      {currentIndex !== undefined && (
        <PowerSocketEditor
          defaultSocketLvl={defaultSocketLvl}
          userUnitSocket={powerSockets[currentIndex]}
          onChange={changeHandler}
        />
      )}
    </ExpansionPanel>
  )
}

type PowerSocketEditorProps = {
  defaultSocketLvl: number
  userUnitSocket: UserUnitPowerSocket
  onChange: (uu: UserUnitPowerSocket) => void
}

function PowerSocketEditor ({
  defaultSocketLvl,
  userUnitSocket: { type, lvl },
  onChange,
}: PowerSocketEditorProps) {
  return (
    <InputLabel value={lvl} max={5} name={type ?? 'Choose a power'}>
      <Box
        display="grid"
        gridTemplateColumns="repeat(5, 1fr)"
        placeItems="center"
      >
        {PowerSockets.map(powerSocketType => (
          <ImageInput
            key={powerSocketType}
            type="radio"
            name="uu-socket-type"
            checked={type === powerSocketType}
            onChange={() =>
              onChange({ lvl: lvl || defaultSocketLvl, type: powerSocketType })
            }
          >
            <PowerSocket
              type={powerSocketType}
              size="2"
              hideChrome
              margin="1"
            />
          </ImageInput>
        ))}
      </Box>

      <Box marginY="1">
        <PowerSocketInput
          name={type}
          value={lvl}
          variant={type}
          disabled={!type}
          onChange={e =>
            onChange({
              type,
              lvl: Number(e.target.value),
            })
          }
        />
      </Box>
    </InputLabel>
  )
}

type UserPowerSocketDispayerProps = {
  powerSockets: UserUnitPowerSocket[]
  selectedIndex?: number
  onClick?: (index: number) => void
}
export function UserPowerSocketDispayer ({
  powerSockets,
  selectedIndex,
  onClick,
}: UserPowerSocketDispayerProps) {
  return (
    <Box display="flex" justifyContent="space-evenly">
      {powerSockets.map(({ type, lvl }, i) => (
        <Button
          key={i}
          variant="link"
          onClick={() => onClick?.(i)}
          px="1"
          py="1"
          fontSize="1"
        >
          <Box display="flex" flexDirection="column">
            <PowerSocket type={type} size="2" isFocused={selectedIndex === i} />
            <Progression value={lvl} max={5} />
          </Box>
        </Button>
      ))}
    </Box>
  )
}
