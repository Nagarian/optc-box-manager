const { DB } = require('./unitExtracter')
const { writeFileSync } = require('fs')
const Ajv = require('ajv').default

const prettify = false

function process (validator, units, excludeVS, name) {
  const errors = []
  for (const unit of units) {
    if (excludeVS && (unit.detail?.VSCondition || unit.characters?.criteria)) continue

    const isValid = validator(unit)
    if (!isValid) {
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

  writeFileSync(`./public/db-${name}.json`, prettify ? JSON.stringify(units, null, 2) : JSON.stringify(units))

  validate(errors)

  return errors
}

function validate (errors) {
  console.log('unit in error:', new Set(errors.filter(e => e.id)).size)
  console.log('errors count', errors.length)

  const messageTypes = new Set(errors.map(x => x.message))

  for (const messageType of messageTypes) {
    const matching = errors.filter(e => e.message === messageType)

    console.error(`- ${messageType} (${matching.length} occurence)`)

    const groupByPath = new Set(matching.map(m => m.path))

    for (const group of groupByPath) {
      const ids = matching.filter(e => e.path === group).map(e => e.id)

      console.error(
        `  - ${group} (${ids.length} occurence) ${JSON.stringify(ids)}`,
      )
    }
  }

  return errors.length === 0
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
