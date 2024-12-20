import { GatherIslandType } from 'models/gatherIsland'
import GatherFacilitiesDb from './data/db-gather-island.json'
import FacilityIcon1 from './data/saisyujima_t_facility_001.png'
import FacilityIcon2 from './data/saisyujima_t_facility_002.png'
import FacilityIcon3 from './data/saisyujima_t_facility_003.png'
import FacilityIcon4 from './data/saisyujima_t_facility_004.png'
import FacilityIcon5 from './data/saisyujima_t_facility_005.png'
import FacilityIcon6 from './data/saisyujima_t_facility_006.png'
import FacilityIcon7 from './data/saisyujima_t_facility_007.png'
import FacilityIcon8 from './data/saisyujima_t_facility_008.png'
import FacilityIcon9 from './data/saisyujima_t_facility_009.png'
import FacilityIcon10 from './data/saisyujima_t_facility_010.png'
import FacilityIcon11 from './data/saisyujima_t_facility_011.png'

export function getGatherFacilityDb(
  type: GatherIslandType,
):
  | DbGatherIslandEntityExtended<number>
  | DbGatherIslandEntityExtended<DbGatherIslandComplexValue> {
  const data = (GatherFacilitiesDb as DbGatherIsland)[type]

  return {
    ...data,
    icon: Icons[type],
  }
}

const Icons: Record<GatherIslandType, string> = {
  gemTree: FacilityIcon1,
  berryCave: FacilityIcon2,
  trainingGround: FacilityIcon3,
  meatRoaster: FacilityIcon4,
  fishingSpot: FacilityIcon5,
  treasureHunters: FacilityIcon6,
  guidingMine: FacilityIcon7,
  springOfVitality: FacilityIcon8,
  monumentOfFerocity: FacilityIcon9,
  monumentOfHealing: FacilityIcon10,
  monumentOfEndurance: FacilityIcon11,
}

type DbGatherIslandComplexValue = {
  superSuccess: number
  success: number
  failure: number
}

type DbGatherIslandEntityLevel<T> = {
  value: T
  cost: number
}

type DbGatherIslandEntity<T> = {
  title: string
  description: string
  levels: DbGatherIslandEntityLevel<T>[]
}

type DbGatherIslandEntityExtended<T> = DbGatherIslandEntity<T> & {
  icon: string
}

type DbGatherIsland = Record<
  Exclude<GatherIslandType, 'fishingSpot' | 'treasureHunters' | 'guidingMine'>,
  DbGatherIslandEntity<number>
> &
  Record<
    Extract<
      GatherIslandType,
      'fishingSpot' | 'treasureHunters' | 'guidingMine'
    >,
    DbGatherIslandEntity<DbGatherIslandComplexValue>
  >
