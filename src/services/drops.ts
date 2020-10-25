import { BookEventDrop } from 'models/drops'
import preval from 'preval.macro'

export const BookQuestDrops : BookEventDrop[] = preval`
  const { BookQuests } = require('../scripts/dropExtracter')
  module.exports = BookQuests
`
