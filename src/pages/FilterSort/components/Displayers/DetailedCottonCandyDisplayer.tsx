import InfoDisplayer from 'components/CharacterBox/components/InfoDisplayer'
import { Text } from 'components/Title'
import { SearchDisplayerProps } from '.'

export function DetailedCottonCandyDisplayer ({
  userUnit: {
    cc: { atk, hp, rcv },
  },

}: SearchDisplayerProps) {
  const sum = atk + hp + rcv
  if (!sum) return null

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom" anchorZ="top">
      {hp > 0 && (
        <Text as="span" color="specific.ccHp">
          {hp}
        </Text>
      )}
      {hp > 0 && atk > 0 && <Separator />}
      {atk > 0 && (
        <Text as="span" color="specific.ccAtk">
          {atk}
        </Text>
      )}
      {((atk > 0 && rcv > 0) || (hp > 0 && rcv > 0)) && <Separator />}
      {rcv > 0 && (
        <Text as="span" color="specific.ccRcv">
          {rcv}
        </Text>
      )}
    </InfoDisplayer>
  )
}

const Separator = () => (
  <Text as="span" color="white">
    /
  </Text>
)
