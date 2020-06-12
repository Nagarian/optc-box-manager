import { Text } from 'components/Title'
import { UserUnitCottonCandy } from 'models/userBox'
import React from 'react'
import InfoDisplayer from './InfoDisplayer'

export type CottonCandyDisplayerProps = {
  cc?: UserUnitCottonCandy
}
export default function CottonCandyDisplayer ({
  cc,
}: CottonCandyDisplayerProps) {
  if (!cc) return null
  const sum = cc.atk + cc.hp + cc.rcv
  if (!sum) return null

  return (
    <InfoDisplayer anchorX="middle" anchorY="top" color="yellow">
      +{sum}
    </InfoDisplayer>
  )
}

export function DetailedCottonCandyDisplayer ({
  cc,
}: CottonCandyDisplayerProps) {
  if (!cc) return null
  const sum = cc.atk + cc.hp + cc.rcv
  if (!sum) return null

  const { atk, hp, rcv } = cc
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
