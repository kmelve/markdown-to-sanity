const globMDFiles = require('./globMDFiles')
const extractMDfromFile = require('./extractMDfromFile')
const convertMDtoVFile = require('./convertMDtoVFile')
const convertToSanityDocument = require('./convertToSanityDocument')

async function migrateFiles (inputPath, filename, outputPath) {
  const files = await globMDFiles(inputPath)
  const mdDocuments = await Promise.all(files.map(extractMDfromFile))
  const VFiles = await Promise.all(mdDocuments.map(convertMDtoVFile))
  const sanityDocuments = await Promise.all(VFiles.map(convertToSanityDocument))
  return sanityDocuments
}

module.exports = migrateFiles
