import { UserUnit } from 'models/userBox'

export const uuSupportMock = (): UserUnit[] => [
  {
    id: 'uu1',
    support: {
      lvl: 5,
    },
  } as UserUnit,
  {
    id: 'uu2',
    support: {
      lvl: 1,
    },
  } as UserUnit,
  {
    id: 'uu3',
    support: {
      lvl: 4,
    },
  } as UserUnit,
  {
    id: 'uu4',
    support: {
      lvl: 0,
    },
  } as UserUnit,
  {
    id: 'uu5',
  } as UserUnit,
]
