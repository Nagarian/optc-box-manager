import { Box } from 'components/Box'
import { Progression } from 'components/Progression'
import LuckBgImg from './images/character_detail_box_luck.png'
import LuckMax from './images/fight_together_text_luck_max_s.png'

type LuckProps = {
  lvl: number
  isDirty?: boolean
}

export function Luck({ lvl, isDirty = false }: LuckProps) {
  return (
    <Box
      as="span"
      display="grid"
      placeItems="center"
      width="100%"
      padding="1"
      pl="3"
      background={`url(${LuckBgImg})`}
      backgroundSize="contain"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      title="Luck level"
    >
      <Progression
        value={lvl}
        max={100}
        maxIcon={LuckMax}
        variant="no-max"
        color="primaryText"
        isDirty={isDirty}
      />
    </Box>
  )
}
