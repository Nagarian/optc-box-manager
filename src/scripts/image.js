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
      ?.replace('../res', 'https://optc-db.github.io/res/')
      .replace('http:', 'https:')
  } catch (error) {
    console.trace('Invalid unit :', id)
    return 'https://onepiece-treasurecruise.com/wp-content/themes/onepiece-treasurecruise/images/noimage.png'
  }
}

async function downloadCharacters (
  /** @type { import('models/old-units').ExtendedUnit[] } */ DBUnits,
) {
  const { createWriteStream } = require('fs')
  const http = require('https')

  for (const unit of DBUnits) {
    http.get(unit.images.thumbnail, res => {
      res.pipe(createWriteStream(`characters_images/${unit.id}.png`))
    })
    await sleep(1000)
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
  downloadCharacters,
}
