const globMDFiles = require('./globMDFiles')
const extractMDfromFile = require('./extractMDfromFile')
const convertMDtoVFile = require('./convertMDtoVFile')
const convertToSanityDocument = require('./convertToSanityDocument')
const blogPath = '/Users/knutmelvaer/Sites/overreacted.io/src/pages'
// convert then into HTML

// output as ndjson

async function run() {
  const files = await globMDFiles(blogPath)
  const mdDocuments = await Promise.all(files.map(extractMDfromFile))
  const VFiles = await Promise.all(mdDocuments.slice(1,2).map(convertMDtoVFile))
  const sanityDocuments = await Promise.all(VFiles.map(convertToSanityDocument))

  return {/* HTMLdocuments, */ sanityDocuments}
}

run().then(data => console.log(data))