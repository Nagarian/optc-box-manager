const { DB } = require('./unitExtracter')
const { writeFileSync } = require('fs')
const Ajv = require('ajv').default

const prettify = false

function process (validator, units, excludeVS, name) {
  let errors = []
  for (const unit of units) {
    if (excludeVS && (unit.detail?.VSCondition || unit.characters?.criteria)) continue

    const isValid = validator(unit)
    if (!isValid) {
      errors = [...errors, { id: unit.id, errors: validator.errors }]
    }
  }

  const err = errors.flatMap(er => er.errors).map(e => e.dataPath + ' ' + e.message)

  console.log([...(new Set(err))].map(e => [e, err.filter(er => er === e).length]))

  console.log('unit in error:', errors.length)
  console.log('errors count', errors.flatMap(er => er.errors).length)

  writeFileSync(`./public/errors-${name}.json`, JSON.stringify(errors, null, 2))

  writeFileSync(`./public/db-${name}.json`, prettify ? JSON.stringify(units, null, 2) : JSON.stringify(units))

  return errors
}

const oldSchema = require('../models/old-character-schema.json')
const { fixupVersusUnit } = require('./fixup')

const ajv = new Ajv({
  allowUnionTypes: true,
  allErrors: true,
  useDefaults: 'empty',
})

const oldValidator = ajv.compile(oldSchema)

const DBFixed = DB.map(fixupVersusUnit)

const oldErrors = process(oldValidator, DBFixed, true, 'old')

if (oldErrors.length) {
  throw new Error('some validation errors occured')
}
