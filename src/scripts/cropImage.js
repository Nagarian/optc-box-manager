import sharp from 'sharp'
import { resolve } from 'path'
import { readdir, mkdir } from 'fs/promises'

/**
 * Character Sizing, it's used for the finale cropped version
 * @typedef {({
 *  top: number,
 *  left: number,
 *  width: number,
 *  height: number,
 *  originalSize: number,
 *  croppedWidth: number
 *  croppedHeight: number,
 * })} CharacterDesiredSize
 */

/**
 * Temporary structure
 * @typedef {({ id: number, path: string })} CharacterFile
 */

/**
 *
 * @param {string} version
 * @returns {Promise<CharacterFile[]>}
 */
async function retrievePictures (version) {
  async function getFiles (dir) {
    const dirents = await readdir(dir, { withFileTypes: true })
    const files = await Promise.all(dirents.map((dirent) => {
      const res = resolve(dir, dirent.name)
      return dirent.isDirectory() ? getFiles(res) : res
    }))

    return Array.prototype.concat(...files)
  }

  const dirCont = await getFiles(`./src/optcdb/api/images/thumbnail/${version}`)
  return dirCont
    .filter(file => file.match(/.*(\\|\/)\d{4}\.(png?)/ig))
    .map(file => ({
      path: file,
      id: parseInt(/.*(\\|\/)(?<charid>\d{4})\.(png?)/ig.exec(file).groups.charid),
    }))
}

/**
 *
 * @param {CharacterFile[]} files
 * @param {CharacterDesiredSize} size
 * @param {string} version
 */
async function computeMatrice (files, size, version) {
  const filename = `${version}-${size.croppedWidth}x${size.croppedHeight}`
  const grid = {
    horizontal: 100,
    vertical: (Math.ceil(Math.max(...files.map(f => f.id)) / 100)),
  }

  console.log(`Computation of ${filename} pictures: start processing`)
  console.time(`Computation of ${filename} pictures`)

  const pictures = await Promise.all(files
    .map(async (file) => {
      const buffer = await sharp(file.path)
        .extract({ ...size })
        .resize({ width: size.croppedWidth })
        .toBuffer()
      return {
        id: file.id,
        input: buffer,
        left: ((file.id - 1) % grid.horizontal) * size.croppedWidth,
        top: (Math.ceil(file.id / grid.horizontal) - 1) * size.croppedHeight,
      }
    }))

  console.timeLog(`Computation of ${filename} pictures`, 'retrieval done - start rendering')

  mkdir('./public/characters/', { recursive: true })

  await sharp({
    create: {
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
      width: size.croppedWidth * grid.horizontal,
      height: size.croppedHeight * grid.vertical,
    },
  })
    .composite(pictures)
    .png()
    .toFile(`./public/characters/${filename}.png`)

  console.timeEnd(`Computation of ${filename} pictures`)
}

const globalFiles = await retrievePictures('glo')
const japanFiles = await retrievePictures('jap')

const gloExWrongIds = {
  2768: 5048,
  2769: 5049,
  2770: 5050,
  2771: 5051,
}

const fixedGlobalFiles = globalFiles
  .map(f => gloExWrongIds[f.id]
    ? ({ id: gloExWrongIds[f.id], path: f.path })
    : f,
  )

const size = {
  top: 28,
  left: 28,
  width: 62,
  height: 56,
  originalSize: 112,
  croppedWidth: 10,
  croppedHeight: 0,
}
size.croppedHeight = Math.floor((size.croppedWidth * size.height) / size.width)

// await computeMatrice(globalFiles, size, 'global')
await computeMatrice(japanFiles, size, 'japan')
await computeMatrice(fixedGlobalFiles, size, 'global-fixed')
