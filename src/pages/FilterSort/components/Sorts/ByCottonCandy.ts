import { UserUnitSort } from 'models/search'
import { UserUnitCottonCandy } from 'models/userBox'

const ccSum = ({ atk, hp, rcv }: UserUnitCottonCandy) => atk + hp + rcv

export const byCottonCandy: UserUnitSort = (userUnit1, userUnit2) =>
  ccSum(userUnit1.cc) - ccSum(userUnit2.cc)

export const byCCAtk: UserUnitSort = (userUnit1, userUnit2) =>
  userUnit1.cc.atk - userUnit2.cc.atk

export const byCCHp: UserUnitSort = (userUnit1, userUnit2) =>
  userUnit1.cc.hp - userUnit2.cc.hp

export const byCCRcv: UserUnitSort = (userUnit1, userUnit2) =>
  userUnit1.cc.rcv - userUnit2.cc.rcv
