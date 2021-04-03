import { ExtendedUnit } from 'models/units'
import OptcDb from '../../public/db-old.json'

describe('Database compliance ', () => {
  const db = OptcDb as ExtendedUnit[]

  describe('Global units ID', () => {
    const globalUnitMapping = {
      'Monkey D. Luffy, Kung Fu Training': 3333,
      'Monkey D. Luffy, To Become a True Kung Fu Master': 3334,
      'Nefertari Vivi, Wake of an Endless Dream - Princess of Alabasta': 3347,
      'Nefertari Vivi, Wake of an Endless Dream - Pirate Queen': 3348,
      'Portgas D. Ace, Wake of an Endless Dream - Whitebeard Pirates': 3349,
      'Portgas D. Ace, Wake of an Endless Dream - High Seas Pirate': 3350,
      'Charlotte Pudding, White Summer Sweets': 3360,
      'Charlotte Pudding, Devilish White Swimsuit': 3361,
      'Usopp & Chopper, Ex-Weakling Duo': 3370,
      'Coby [EXTRA], Navy HQ Petty Officer': 3371,
      'War Hero Coby [EXTRA], Navy HQ Petty Officer': 3372,
      'Sergeant Helmeppo [EXTRA]': 3373,
      'Sengoku, Fatherly Buddha': 3374,
      'Law & Chopper, Dynamic Doctor Duo': 3381,
      'Local Sea Monster, Man-Eating Monster': 3382,
      'Makino, Proprietor of a Relaxed Tavern': 3383,
    }

    Object.entries(globalUnitMapping).map(([name, id]) =>
      it(`"${name}" should be at ID ${id}`, () => {
        const selectedUnit = db.find(unit => unit.name === name)

        expect(selectedUnit).toBeDefined()
        expect(selectedUnit!.dbId).toEqual(id)
      }),
    )
  })
})
