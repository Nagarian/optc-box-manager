import InfoDisplayer from 'components/CharacterBox/components/InfoDisplayer'
import { SupportIcon } from 'components/Icon'
import Progression from 'components/Progression'
import { SearchDisplayerProps } from '.'

export default function SupportDisplayer({
  userUnit: { support },
}: SearchDisplayerProps<never>) {
  if (!support || support.lvl === 0) return null

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom" anchorZ="top">
      <SupportIcon size="1" />
      <Progression value={support.lvl} max={5} color="white" />
    </InfoDisplayer>
  )
}
