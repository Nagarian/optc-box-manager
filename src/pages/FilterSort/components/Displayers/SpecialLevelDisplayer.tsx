import InfoDisplayer from 'components/CharacterBox/components/InfoDisplayer'
import { SpecialLvlIcon } from 'components/Icon'
import Progression from 'components/Progression'
import { SearchDisplayerProps } from '.'

export default function SpecialLevelDisplayer ({
  userUnit: {
    special,
  },
}: SearchDisplayerProps) {
  if (!special) return null

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom" anchorZ="top">
      <SpecialLvlIcon size="1" />
      <Progression value={special.lvl} max={special.lvlMax} color="white" />
    </InfoDisplayer>
  )
}
