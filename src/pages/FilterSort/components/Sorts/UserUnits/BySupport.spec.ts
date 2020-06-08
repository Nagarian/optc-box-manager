import { uuSupportMock } from 'mocks/UserUnitMock'
import { bySupportLvl } from './BySupport'

describe('Sort UserUnit BySupportLvl', () => {
  it('Should sort', () => {
    const userUnits = uuSupportMock()
    expect([
      ...userUnits,
    ].sort(bySupportLvl)).toEqual([
      userUnits[4],
      userUnits[3],
      userUnits[1],
      userUnits[2],
      userUnits[0],
    ])
  })
})
