import 'optcdb/common/data/units'
import 'optcdb/common/data/festival'
import 'optcdb/common/data/details'
import 'optcdb/common/data/aliases'
import 'optcdb/common/js/utils'

import { Unit, ExtendedUnit } from 'models/units'

const Utils = () => (window as any).Utils
const Units = () => (window as any).units as Unit[]

const noImage =
  'https://onepiece-treasurecruise.com/wp-content/themes/onepiece-treasurecruise/images/noimage.png'

const getImage = (func: (id: number) => string) => (id: number): string => {
  try {
    const imagePath = func(id)
    return imagePath?.replace('../res', 'https://optc-db.github.io/res/')
  } catch (error) {
    console.trace('Invalid unit :', id)
    return noImage
  }
}

export const DBUnit = {
  getUnitThumbnail: getImage(Utils().getThumbnailUrl),

  getUnitFullPicture: getImage(Utils().getBigThumbnailUrl),

  getAllUnits: () => {
    if (Array.isArray(Units()?.[0])) {
      Utils().parseUnits(false)
    }

    return Units()
      .slice(1)
      .filter(
        (unit) =>
          unit.name &&
          !unit.name.includes('Limit Break') &&
          !unit.name.includes('Dual Unit'),
      )
      .filter((unit) => unit.class !== 'Booster' && unit.class !== 'Evolver')
      .map<ExtendedUnit>((unit) => ({
        ...unit,
        images: {
          thumbnail: DBUnit.getUnitThumbnail(unit.number),
          full: DBUnit.getUnitFullPicture(unit.number),
        },
      }))
  },
}
