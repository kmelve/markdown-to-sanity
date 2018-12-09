const globby = require('globby');

async function globMDFiles(path) {
  const options = {
    cwd: path
  }
  const files = await globby(`**/*.md`, options)
  // return an array of absolute paths
  return files.map(file => `${path}/${file}`)
}

module.exports = globMDFiles