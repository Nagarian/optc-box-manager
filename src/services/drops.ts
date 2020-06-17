import { EventDrop, EventDropLight } from 'models/drops'
import preval from 'preval.macro'

export const FortnightDrops : EventDrop[] = preval`
  const { Fortnight } = require('../scripts/dropExtracter')
  module.exports = Fortnight
`

export const TreasureMapDrops : EventDropLight = preval`
  const { TM } = require('../scripts/dropExtracter')
  module.exports = TM
`

export const AmbushDrops : EventDropLight = preval`
  const { Ambush } = require('../scripts/dropExtracter')
  module.exports = Ambush
`

export const KizunaClashDrops : EventDropLight = preval`
  const { KK } = require('../scripts/dropExtracter')
  module.exports = KK
`

export const RaidDrops : EventDropLight = preval`
  const { Raid } = require('../scripts/dropExtracter')
  module.exports = Raid
`

export const ColiseumDrops : EventDropLight = preval`
  const { Coliseum } = require('../scripts/dropExtracter')
  module.exports = Coliseum
`

export const StoryDrops : EventDropLight = preval`
  const { Story } = require('../scripts/dropExtracter')
  module.exports = Story
`
