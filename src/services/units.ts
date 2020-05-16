import '../optcdb/common/data/units'
import '../optcdb/common/data/festival'
import '../optcdb/common/data/details'
import '../optcdb/common/data/aliases'
import '../optcdb/common/js/utils'

export type UnitType = 'STR' | 'DEX' | 'QCK' | 'INT' | 'PSY'

export type UnitClass = 'Fighter' | 'Shooter' | 'Slasher' | 'Striker' | 'Free Spirit' | 'Cerebral' | 'Powerhouse' | 'Driven' | 'Evolver' | 'Booster'

export type UnitStar = 1 | 2 | 3 | 4 | '4+' | 5 | '5+' | 6 | '6+'

export type Unit = {
  name: string
  type: UnitType | UnitType[2]
  class: UnitClass[] | UnitClass[][3]
  stars: UnitStar
  cost: number
  combo: number
  slots: number
  maxLevel: number
  maxEXP: number
  minHP: number
  minATK: number
  minRCV: number
  maxHP: number
  maxATK: number
  maxRCV: number
  limitHP: number
  limitATK: number
  limitRCV: number
  limitSlot: number
  limitCD: number
  limitexHP: number
  limitexATK: number
  limitexRCV: number
  limitexSlot: number
  limitexCD: number
  growth: {
    hp: number
    atk: number
    rcv: number
  }
  number: number
  limitStats: {
    hp: number[]
    atk: number[]
    rcv: number[]
    sailors: number[]
    captains: number[]
  }
  incomplete: boolean
  preview: boolean
}

(window as any).Utils.parseUnits(true)

export const units: Unit[] = (window as any).units
