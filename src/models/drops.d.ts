import { UnitType } from './units'

export type BaseDropEvent = {
  name: string
  dropID: string
  thumb: number
  global?: boolean
  nakama?: number
  gamewith?: number
  [additionalKey: string]: number[]
}

export type BaseDrops = { [eventType: string]: BaseDropEvent[] }

export type EventDrop = {
  id: string
  name: string
  icon: string
  units: number[]
  manual: number[]
}

export type EventDropLight = number[]

export type BookEventDrop = EventDrop & {
  category: UnitType
}
