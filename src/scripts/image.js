// @ts-check
import { Utils } from './DBLoader.js'

/**
 * @callback ImageComposerFunc
 * @param { number } id
 * @returns { string }
 */

const getImage =
  (/** @type ImageComposerFunc */ func) => (/** @type number */ id) => {
    const imagePath = func(id)
    return imagePath
      ?.replace(
        '/api/images',
        'https://2shankz.github.io/optc-db.github.io/api/images',
      )
      .replace('http:', 'https:')
  }

export const getUnitThumbnail = getImage(Utils.getThumbnailUrl)
export const getUnitFullPicture = getImage(Utils.getBigThumbnailUrl)
