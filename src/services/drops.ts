import { EventDrop } from 'models/drops'
import preval from 'preval.macro'

export const FortnightDrops : EventDrop[] = preval`
  const { Fortnight } = require('../scripts/dropExtracter')
  module.exports = Fortnight
`
