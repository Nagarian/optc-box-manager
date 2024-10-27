import { Box } from 'components/Box'
import { Progression } from 'components/Progression'
import { Text } from 'components/Title'
import LevelLimitBreakImg from './images/level-limitbreak.png'

type LevelLBProps = {
  limitLvl: number
  limitStepLvl: number
  isDirty?: boolean
}

const stepMax = [1, 1, 2, 2, 3]
const stepLevelMax = [0, 0, 0, 1, 0, 1, 0, 1, 2]
export const levelLBFromStepLevel = [0, 1, 2, 2, 3, 3, 4, 4, 4, 5]
export const levelLBMaxLevel = [99, 105, 110, 120, 130, 150]

export function LevelLB({
  limitLvl,
  limitStepLvl,
  isDirty = false,
}: LevelLBProps) {
  return (
    <Box
      as="span"
      display="grid"
      gridTemplateColumns="1fr 4fr"
      placeItems="center"
      width="100%"
      minWidth="8ch"
      padding="1"
      background={`url(${LevelLimitBreakImg})`}
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      title="Level limit break"
    >
      <Text color={limitLvl === 5 ? 'primaryText' : 'white'}>{limitLvl}</Text>
      <Progression
        value={stepLevelMax[limitStepLvl]}
        max={stepMax[limitLvl]}
        color="white"
        isDirty={isDirty}
      />
    </Box>
  )
}
