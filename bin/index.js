#!/usr/bin/env node

const inquirer = require('inquirer')
const { PathPrompt } = require('inquirer-path')
inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'))
inquirer.prompt.registerPrompt('path', PathPrompt)

const writeToFile = require('../src/writeToFile')
const migrateFiles = require('../src/migrateFiles')

async function run () {
  const answers = await inquirer.prompt([
    /* Pass your questions in here */
    {
      type: 'path',
      name: 'inputPath',
      default: process.cwd(),
      message: 'The absolute path to your folder with markdown files',
      excludePath: nodePath => nodePath.startsWith('node_modules'),
    },
    {
      type: 'string',
      name: 'filename',
      default: 'production',
      message: `Filename for the import file`
    },
    {
      type: 'path',
      name: 'outputPath',
      default: process.cwd(),
      directoryOnly: true,
      message: `Output path for the import file`
    }
  ])
  const { inputPath, filename, outputPath } = answers
  const sanityDocuments = await migrateFiles(inputPath, filename, outputPath)
  writeToFile({ filename, sanityDocuments, outputPath })
}

run()
