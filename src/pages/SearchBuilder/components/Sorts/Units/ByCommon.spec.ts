import { unitsMock } from 'mocks/UnitMock'
import { byLBLvlMax } from './ByCommon'

describe('Sort Unit byLBLvlMax', () => {
  it('Should sort', () => {
    const units = unitsMock()
    expect([...units].sort(byLBLvlMax)).toEqual([
      units[3],
      units[1],
      units[0],
      units[2],
    ])
  })
})
