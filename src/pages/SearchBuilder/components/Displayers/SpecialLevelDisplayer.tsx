import { SpecialLvlIcon } from 'components/Icon'
import { InfoDisplayer } from 'components/InfoDisplayer'
import { Progression } from 'components/Progression'
import { SearchDisplayerProps } from '.'

export function SpecialLevelDisplayer({
  userUnit: { special },
}: SearchDisplayerProps<never>) {
  if (!special) return null

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom" anchorZ="top">
      <SpecialLvlIcon size="1" />
      <Progression value={special.lvl} max={special.lvlMax} color="white" />
    </InfoDisplayer>
  )
}
