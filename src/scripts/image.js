// @ts-check
const { Utils } = require('./DBLoader')

/**
 * @callback ImageComposerFunc
 * @param { number } id
 * @returns { string }
 */

const getImage = (
  /** @type ImageComposerFunc */ func,
) => (
  /** @type number */ id,
) => {
  try {
    const imagePath = func(id)
    return imagePath
      ?.replace('/api/images', 'https://optc-db.github.io/api/images')
      .replace('http:', 'https:')
  } catch (error) {
    console.trace('Invalid unit :', id)
    return 'https://onepiece-treasurecruise.com/wp-content/themes/onepiece-treasurecruise/images/noimage.png'
  }
}

function sleep (/** @type number */ ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

module.exports = {
  getUnitThumbnail: getImage(Utils.getThumbnailUrl),
  getUnitFullPicture: getImage(Utils.getBigThumbnailUrl),
}
