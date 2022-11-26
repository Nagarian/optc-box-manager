
import { LimitBreak } from 'models/units'

export type LimitBreakType =
  | 'stat'
  | 'key'
  | 'socket'
  | 'potential'
  | 'sailor'
  | 'cooldown'
  | 'captain'

export function getLimitType ({ description }: LimitBreak) : LimitBreakType {
  if (description.startsWith('LOCKED WITH KEY')) {
    return 'key'
  }

  if (description === 'Acquire 1 additional Socket slot') {
    return 'socket'
  }

  if (description.startsWith('Acquire Potential')) {
    return 'potential'
  }

  if (description.startsWith('Acquire new Captain Ability')) {
    return 'captain'
  }

  if (description.startsWith('Acquire Sailor Ability')) {
    return 'sailor'
  }

  if (description.startsWith('Reduce base Special Cooldown')) {
    return 'cooldown'
  }

  return 'stat'
}
