const units = []
JSON.stringify(
  units.map(el => ({
    ...el,
    potentials: el.potentials?.map(e => ({ ...e, lvl: 0 })),
    limitBreak: el.limitBreak && {
      ...el.limitBreak,
      lvl: 0,
    },
    special: el.special && {
      ...el.special,
      lvl: 1,
    },
    support: el.support && {
      ...el.support,
      lvl: 0,
    },
    cc: {
      hp: 0,
      atk: 0,
      rcv: 0,
    },
  })),
)
