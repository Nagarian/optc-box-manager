import styled from '@emotion/styled'
import { Box } from 'components/Box'
import { DescriptionHighlighter } from 'components/DescriptionHighlighter'
import { ExpansionPanel } from 'components/ExpansionPanel'
import { ShipLevelInput } from 'components/forms/ShipLevelInput'
import { SpecialLvlIcon } from 'components/Icon'
import { SubTitle } from 'components/Title'
import { UserShip } from 'models/shipBox'
import { useMemo } from 'react'
import { shipDetailToMarkdown } from 'services/userShips'

type ShipModificationEditProps = {
  userShip: UserShip
  onChange: (userShip: UserShip) => void
}
export function ShipModificationEdit({
  userShip,
  onChange,
}: ShipModificationEditProps) {
  const {
    obtained,
    level,
    modification,
    ship: { skills, levels },
  } = userShip

  const descriptions = useMemo(() => {
    if (!skills) {
      return []
    }

    return [
      shipDetailToMarkdown(levels[levels.length - 1], true),
      shipDetailToMarkdown(skills[0], true),
      shipDetailToMarkdown(skills[1], true),
    ]
  }, [skills, levels])

  if (!skills || !modification) {
    return undefined
  }

  const { skillsLvl } = modification

  return (
    <ExpansionPanel title="Modification rank" icon={SpecialLvlIcon}>
      {obtained && level < levels.length && (
        <SubTitle color="red" pt="3" pb="2">
          You need to first upgrade your ship to its last level to be able to
          update that metric
        </SubTitle>
      )}

      <DescriptionLevel isUnlocked={!obtained || skillsLvl >= 1}>
        <SubTitle fontSize="2" pt="3" pb="2">
          {skills[0].condition}
        </SubTitle>
        <DescriptionHighlighter
          originalDiff={descriptions[0]}
          value={descriptions[1]}
        />
      </DescriptionLevel>

      <DescriptionLevel isUnlocked={!obtained || skillsLvl >= 2}>
        <SubTitle fontSize="2" p="2">
          {skills[1].condition}
        </SubTitle>
        <DescriptionHighlighter
          originalDiff={descriptions[1]}
          value={descriptions[2]}
        />
      </DescriptionLevel>

      {obtained && level === levels.length && (
        <>
          <ShipLevelInput
            value={modification}
            type="hp"
            onChange={mod =>
              onChange({
                ...userShip,
                modification: mod,
              })
            }
          />
          <ShipLevelInput
            value={modification}
            type="atk"
            onChange={mod =>
              onChange({
                ...userShip,
                modification: mod,
              })
            }
          />
          <ShipLevelInput
            value={modification}
            type="rcv"
            onChange={mod =>
              onChange({
                ...userShip,
                modification: mod,
              })
            }
          />
        </>
      )}
    </ExpansionPanel>
  )
}

type DescriptionLevelProps = { isUnlocked: boolean }

const DescriptionLevel = styled(Box)<DescriptionLevelProps>`
  filter: ${p => !p.isUnlocked && 'brightness(0.5)'};
`
