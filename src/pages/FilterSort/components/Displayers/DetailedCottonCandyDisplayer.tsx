import InfoDisplayer from 'components/CharacterBox/components/InfoDisplayer'
import { Text } from 'components/Title'
import React from 'react'
import { SearchDisplayerProps } from '.'

export function DetailedCottonCandyDisplayer ({
  userUnit: {
    cc: {
      atk,
      hp,
      rcv,
    },
  },
}: SearchDisplayerProps) {
  const sum = atk + hp + rcv
  if (!sum) return null

  return (
    <InfoDisplayer anchorX="middle" anchorY="bottom">
      {atk > 0 && (
        <Text as="span" color="specific.ccAtk">
          {atk}
        </Text>
      )}
      {Boolean((atk && hp) || (atk && rcv)) && <Separator />}
      {hp > 0 && (
        <Text as="span" color="specific.ccHp">
          {hp}
        </Text>
      )}
      {Boolean(hp && rcv) && <Separator />}
      {rcv > 0 && (
        <Text as="span" color="specific.ccRcv">
          {rcv}
        </Text>
      )}
    </InfoDisplayer>
  )
}

const Separator = () => <Text as="span" color="white">/</Text>
