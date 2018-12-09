/* eslint-disable no-console */
const fs = require('fs')

function writeToFile ({ filename, sanityDocuments, outputPath }) {
  const path = `${outputPath}/${filename.split('.ndjson')[0]}`

  const preparedDocuments = sanityDocuments.reduce(
    (acc, doc) => `${acc  }${JSON.stringify(doc)}\n`
  , '')

  return fs.writeFile(`${path}.ndjson`, preparedDocuments, (err, data) => {
    if (err) {
      throw new Error(err)
    }
    console.log(
      `Wrote ${sanityDocuments.length} documents to ${filename}.ndjson`
    )
  })
}

module.exports = writeToFile
