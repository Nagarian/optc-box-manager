const { DB } = require('./unitExtracter')
const { writeFileSync } = require('fs')
const Ajv = require('ajv').default
const oldSchema = require('../models/old-character-schema.json')
const { fixupVersusUnit } = require('./fixup')

const prettify = false
const excludeVS = true

function validate (db) {
  console.log('Validation of extracted DB data')
  const errors = getErrors(db)

  if (errors.length === 0) {
    console.log('No error detected')
    return true
  }

  console.log('unit in error:', new Set(errors.map(e => e.id)).size)
  console.log('errors count', errors.length)

  console.log('Errors by unit')
  const errorsByCharacters = new Set(errors.map(x => x.id))
  for (const id of errorsByCharacters) {
    console.error(`#${id} "${db.find(u => u.id === id)?.name}"`)

    const matching = errors
      .filter(e => e.id === id)
      .sort((a, b) => a.path.localeCompare(b.path))

    for (const path of new Set(matching.map(x => x.path))) {
      console.error(`  - ${path}`)

      for (const error of matching.filter(m => m.path === path)) {
        console.error(`    - ${error.message}`)
      }
    }
  }

  if (errorsByCharacters.size < 10) {
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

function getErrors (db) {
  const ajv = new Ajv({
    allowUnionTypes: true,
    allErrors: true,
    useDefaults: 'empty',
  })

  const validator = ajv.compile(oldSchema)

  const errors = []
  for (const unit of db) {
    if (excludeVS && (unit.detail?.VSCondition || unit.characters?.criteria)) continue

    const isValid = validator(unit)
    if (!isValid && validator.errors) {
      for (const error of validator.errors) {
        const add = error.params?.additionalProperty
        errors.push({
          id: unit.id,
          message: `${error.message} ${add ? JSON.stringify(add) : ''}`,
          path: error.instancePath,
        })
      }
    }
  }

  return errors
}

const DBFixed = DB.map(fixupVersusUnit)

writeFileSync('./public/db-old.json', prettify ? JSON.stringify(DBFixed, null, 2) : JSON.stringify(DBFixed))
const isValide = validate(DBFixed)

if (!isValide) {
  throw new Error('some validation errors occured')
}
