import { SearchSortCriteria } from 'models/search'
import { SearchDisplayerCriteria } from '../Displayers'
import { SearchFilterUserUnits } from '../Filters/UserUnits'
import { useEffect } from 'react'
import { syncPotentials } from './syncPotentials'
import { syncSupport } from './syncSupport'
import { syncSpecialLevel } from './syncSpecialLevel'
import { syncLimitBreak } from './syncLimitBreak'
import { syncCottonCandy } from './syncCottonCandy'

export type SyncerResult = [
  SearchSortCriteria[] | undefined,
  SearchDisplayerCriteria | undefined,
]

export type Syncer = (
  filters: SearchFilterUserUnits,
  sorts: SearchSortCriteria[],
  displayer: SearchDisplayerCriteria | undefined,
) => SyncerResult

export function useSyncer (
  filters: SearchFilterUserUnits,
  sorts: SearchSortCriteria[],
  displayer: SearchDisplayerCriteria | undefined,
  syncApplier: (result: SyncerResult) => void,
) {
  useEffect(() => {
    syncApplier(syncPotentials(filters, sorts, displayer))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.byUserPotential])

  useEffect(() => {
    syncApplier(syncSupport(filters, sorts, displayer))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.byUserSupport])

  useEffect(() => {
    syncApplier(syncSpecialLevel(filters, sorts, displayer))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.byUserSpecial])

  useEffect(() => {
    syncApplier(syncLimitBreak(filters, sorts, displayer))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.byUserLimitBreak])

  useEffect(() => {
    syncApplier(syncCottonCandy(filters, sorts, displayer))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.byUserCottonCandy])
}