const { DB } = require('./unitExtracter')
const { writeFile } = require('fs')

writeFile('./public/db.json', JSON.stringify(DB), (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('Database extracted')
  }
})
