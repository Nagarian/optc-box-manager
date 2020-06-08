import { ExtendedUnit, LimitBreak } from 'models/units'

export const unitsMock = () => [
  {
    id: 3,
    type: 'STR',
    stars: 5,
    name: 'Luffy',
    detail: {
      limit: [{ description: '' }, { description: '' }],
    },
  } as ExtendedUnit,
  {
    id: 2,
    type: 'DEX',
    stars: 6,
    name: 'Zoro',
    detail: {
      limit: [] as LimitBreak[],
    },
  } as ExtendedUnit,
  {
    id: 1,
    type: 'STR',
    stars: 6,
    name: 'Ace',
    detail: {
      limit: [{ description: '' }, { description: '' }, { description: '' }],
    },
  } as ExtendedUnit,
  {
    id: 4,
    type: 'QCK',
    stars: '6+',
    name: 'Sanji',
    detail: {},
  } as ExtendedUnit,
]
