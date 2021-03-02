import { ExtendedUnit } from 'models/units'
import OptcDb from '../../public/db-old.json'

describe('Database compliance ', () => {
  const db = OptcDb as ExtendedUnit[]

  describe('Global units ID', () => {
    const globalUnitMapping = {
      'Monkey D. Luffy, Kung Fu Training': 3333,
      'Monkey D. Luffy, To Become a True Kung Fu Master': 3334,
      'Monkey D. Garp [Neo]': 3339,
      'Garp the Fist [Neo]': 3340,
      'Nefertari Vivi, Wake of an Endless Dream - Princess of Alabasta': 3347,
      'Nefertari Vivi, Wake of an Endless Dream - Pirate Queen': 3348,
      'Portgas D. Ace, Wake of an Endless Dream - Whitebeard Pirates': 3349,
      'Portgas D. Ace, Wake of an Endless Dream - High Seas Pirate': 3350,
      'Emporio Ivankov [Neo]': 3351,
      'Emporio Ivankov [Neo], Queen of Kamabakka Queendom (Retired)': 3352,
      'Edward Newgate [Neo], Rival of the Pirate King': 3353,
      'Edward Newgate [Neo], Grand Pirate Whitebeard': 3354,
      'Monkey D. Luffy [Neo], Star of Hope': 3356,
      'Nightmare Luffy [Neo], Warrior of Hope': 3357,
      'Demon Bamboo Vergo [Neo]': 3358,
      'Demon Bamboo Vergo [Neo], Donquiote Family Senior Executive': 3359,
      'Charlotte Pudding, White Summer Sweets': 3360,
      'Charlotte Pudding, Devilish White Swimsuit': 3361,
      'Iron Mask Duval [Neo]': 3366,
      'Duval [Neo], Flying Fish Riders Leader': 3367,
      'Duval [Neo], Rosy Life Riders Leader': 3368,
      'Usopp & Chopper, Ex-Weakling Duo': 3370,
      'Coby [EXTRA], Navy HQ Petty Officer': 3371,
      'War Hero Coby [EXTRA], Navy HQ Petty Officer': 3372,
      'Sergeant Helmeppo [EXTRA]': 3373,
      'Sengoku, Fatherly Buddha': 3374,
      'Heracles-un [Neo]': 3375,
      'Heracles-un [Neo], Hero of the Forest': 3376,
      Condoriano: 3380,
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
