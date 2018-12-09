const { readFile } = require('fs')

async function extractMDfromFile(filePath) {
  const mdContent = await new Promise((resolve, reject) => readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      throw Error(err)
    }
    return resolve(data)
  }))
  return mdContent
}

module.exports = extractMDfromFile