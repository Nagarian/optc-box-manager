import { Ship } from '../models/ships'
import { details } from '../optc-ships/src/data/details'
import { ShipInfo } from '../optc-ships/src/types/Ship'
import { writeFileSync } from 'fs'
import { createGenerator, Config } from 'ts-json-schema-generator'
import Ajv from 'ajv'

function cleanNoValue(value?: string) {
  return value !== '-' ? value : undefined
}

function cleanDescription(value: string) {
  return value
    .replaceAll(/(STR|DEX|QCK|INT|PSY)/g, '[$1]')
    .replaceAll(/\[\[(STR|DEX|QCK|INT|PSY)\]\]/g, '[$1]')
    .replace(/\[THRESHOLD_DAMAGE_CUT\]/, 'threshold damage cut')
    .replace(/\[ATK_UP\]/, 'attack up')
    .replace(/\[EOT_HEAL\]/, 'end of turn heal')
    .replace(/\[EOT_HEAL_TO_DAMAGE\]/, 'eot heal slot to damage')

    .replaceAll(/\<hr\/?\>/gi, '\n---\n')
    .replaceAll(/\<br\/?\>/gi, '\n\n')
    .replaceAll(/\<\/?[uo]l\>/gi, '\n\n')
    .replaceAll(/\<li\>/gi, '- ')
    .replaceAll(/\<\/li\>/gi, '\n')
    .replaceAll(/(\s?)\<b\>(\s?)/gi, ' **')
    .replaceAll(/(\s?)\<\/b\>(\s?)/gi, '** ')
    .replaceAll(/(\s?)\<i\>(\s?)/gi, ' *')
    .replaceAll(/(\s?)\<\/em\>(\s?)/gi, '* ')
}

const shipImagesHost = 'https://optc-ships.vercel.app'

function remapShip(id: number, ship: ShipInfo): Ship {
  if (ship.period) {
    return {
      id: Number(id),
      name: ship.name,
      obtention: ship.obtain,
      notes: ship.note,
      images: {
        full: `${shipImagesHost}/full/ship_${id.toString().padStart(4, '0')}_full.png`,
        thumbnail: `${shipImagesHost}/icon/ship_${id.toString().padStart(4, '0')}_thumbnail.png`,
      },
      levels: [
        {
          cola: 0,
          superCola: 0,
          ability: {
            description: cleanDescription(ship.effect[ship.effect.length - 1]),
          },
          special:
            ship.special && cleanNoValue(ship.special[ship.special.length - 1])
              ? {
                  cooldown: Number(ship.cd![ship.cd!.length - 1]),
                  description: cleanDescription(
                    ship.special[ship.special.length - 1],
                  ),
                }
              : undefined,
        },
      ],
      events: ship.period.slice(0, -1).map((p, i) => ({
        description: cleanDescription(ship.period![i]),
        ability: {
          description: cleanDescription(ship.effect[i]),
        },
        special:
          ship.special && cleanNoValue(ship.special[i])
            ? {
                cooldown: Number(ship.cd![i]),
                description: cleanDescription(ship.special[i]),
              }
            : undefined,
      })),
      skills: undefined,
    }
  }

  return {
    id: id,
    name: ship.name,
    obtention: ship.obtain,
    notes: ship.note,
    images: {
      full: `${shipImagesHost}/full/ship_${id.toString().padStart(4, '0')}_full.png`,
      thumbnail: `${shipImagesHost}/icon/ship_${id.toString().padStart(4, '0')}_thumbnail.png`,
    },
    levels: ship.effect.map((c, i) => ({
      cola: ship.cola?.[i] ?? 0,
      superCola: ship.superCola?.[i] ?? 0,
      ability: {
        description: cleanDescription(ship.effect[i]),
      },
      special:
        ship.special && cleanNoValue(ship.special[i])
          ? {
              cooldown: Number(ship.cd![i]),
              description: cleanDescription(ship.special[i]),
            }
          : undefined,
    })),
    skills:
      ship.specialEffect1 && ship.specialEffect2 && ship.modification
        ? [
            {
              condition:
                'Modification result of rank 4 or aboce for all HP/ATK/RCV',
              description: cleanDescription(ship.specialEffect1),
              ability: {
                description: cleanDescription(ship.modification.effect[0]),
              },
              special: cleanNoValue(ship.modification.special[0])
                ? {
                    cooldown: Number(ship.modification.cd[0]),
                    description: cleanDescription(ship.modification.special[0]),
                  }
                : undefined,
            },
            {
              condition:
                'Modification result of rank 5 or aboce for all HP/ATK/RCV',
              description: cleanDescription(ship.specialEffect2),
              ability: {
                description: cleanDescription(ship.modification.effect[1]),
              },
              special: cleanNoValue(ship.modification.special[1])
                ? {
                    cooldown: Number(ship.modification.cd[1]),
                    description: cleanDescription(ship.modification.special[1]),
                  }
                : undefined,
            },
          ]
        : undefined,
  }
}

const DB = Object.entries(details).map(([id, ship]) =>
  remapShip(Number(id), ship),
)

const config: Config = {
  path: './src/models/ships.ts',
  tsconfig: './tsconfig.json',
  type: 'Ship',
}

console.log('Generate schema validation')
const oldSchema = createGenerator(config).createSchema(config.type)

console.log('Schema validation generated')

console.log('Create validator')
const ajv = new Ajv({
  allowUnionTypes: true,
  allErrors: true,
  useDefaults: 'empty',
})
const validator = ajv.compile(oldSchema)
console.log('Validator created')

function validate(db: Ship[]) {
  console.log('Validation of extracted DB data')
  const errors = getErrors(db)

  if (errors.length === 0) {
    console.log('No error detected')
    return true
  }

  console.log('unit in error:', new Set(errors.map(e => e.id)).size)
  console.log('errors count', errors.length)

  console.log('Errors by unit')
  const errorsByShips = new Set(errors.map(x => x.id))
  for (const id of errorsByShips) {
    const shipInError = db.find(u => u.id === id)
    console.error(`#${id} "${shipInError?.name}"`)

    const matchingIdErrors = errors
      .filter(e => e.id === id)
      .sort((a, b) => a.path.localeCompare(b.path))

    for (const path of new Set(matchingIdErrors.map(x => x.path))) {
      console.error(`  - ${path}`)

      const messages = matchingIdErrors
        .filter(m => m.path === path)
        .map(m => m.message)

      for (const message of messages) {
        console.error(`    - ${message}`)
      }

      let obj: any = shipInError
      for (const walkthrough of path.split('/').filter(p => !!p)) {
        obj = obj[walkthrough]
      }
      if (!messages[0].startsWith('must NOT have additional properties')) {
        console.error('      Found values: ', obj)
      }
    }
  }

  if (errorsByShips.size < 10) {
    return false
  }

  console.log('Errors by type')
  for (const messageType of new Set(errors.map(x => x.message))) {
    const matching = errors.filter(e => e.message === messageType)

    console.error(`- ${messageType} (${matching.length} occurences)`)

    for (const path of new Set(matching.map(m => m.path))) {
      const ids = matching.filter(e => e.path === path).map(e => e.id)

      console.error(
        `  - ${path} (${ids.length} occurences) ${JSON.stringify(ids)}`,
      )
    }
  }

  if (false || process.env.DEBUG) {
    for (const id of new Set(errors.map(x => x.id))) {
      console.log(JSON.stringify(db.find(u => u.id === id)))
    }
  }

  return false
}

type ShipError = {
  id: number
  message: string
  path: string
}

function getErrors(db: Ship[]) {
  const errors: ShipError[] = []
  for (const unit of db) {
    const isValid = validator(unit)
    if (!isValid && validator.errors) {
      for (const error of validator.errors) {
        const add = error.params?.additionalProperty
        errors.push({
          id: (unit as any).id,
          message: `${error.message} ${add ? JSON.stringify(add) : ''}`,
          path: error.instancePath,
        })
      }
    }
  }

  return errors
}

const prettify = false
writeFileSync(
  './public/db-ships.json',
  JSON.stringify(DB, null, prettify ? 2 : undefined),
)

const isValid = validate(DB)

if (!isValid) {
  throw new Error('some validation errors occured')
}
