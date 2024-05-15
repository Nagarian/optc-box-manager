import { render, screen } from '@testing-library/react'
import { ExtendedUnit } from 'models/units'
import LevelDisplayer from './LevelDisplayer'

describe('Level Displayer', () => {
  test.each([
    { lvl: 0, step: 0, str: '0/1' },
    { lvl: 1, step: 1, str: '0/1' },
    { lvl: 2, step: 2, str: '0/2' },
    { lvl: 2, step: 3, str: '1/2' },
    { lvl: 3, step: 4, str: '0/2' },
    { lvl: 3, step: 5, str: '1/2' },
    { lvl: 4, step: 6, str: '0/3' },
    { lvl: 4, step: 7, str: '1/3' },
    { lvl: 4, step: 8, str: '2/3' },
    { lvl: 5, step: 9, str: /MAX/i },
  ])(
    'should display the right LB level case $lvl/$step = $str',
    ({ lvl, step, str }) => {
      render(
        <LevelDisplayer
          options={{ type: 'level LB' }}
          userUnit={{
            id: '04fdbb60-4b76-4ef1-9e95-f46851c69115',
            unit: {} as ExtendedUnit,
            potentials: [],
            cc: {
              hp: 180,
              atk: 180,
              rcv: 180,
            },
            sockets: [],
            level: {
              lvl: 1,
              lvlMax: 99,
              limitLvl: lvl,
              limitStepLvl: step,
            },
          }}
        />,
      )

      expect(screen.getByText(str)).toBeInTheDocument()
    },
  )
})
