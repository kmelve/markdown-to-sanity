const fs = require('fs')

function writeToFile ({ filename, sanityDocuments, outputPath }) {
  const preparedDocuments = sanityDocuments.map(
    doc => `${JSON.stringify(doc)}\n`
  )
  return fs.writeFile(
    `${outputPath + filename.split('.ndjson')[0]}.ndjson`,
    preparedDocuments,
    (err, data) => {
      if (err) {
        throw new Error(err)
      }
      return `Wrote ${sanityDocuments.length} documents to ${filename}.ndjson`
    }
  )
}

module.exports = writeToFile
