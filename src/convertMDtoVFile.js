const unified = require('unified')
const frontmatter = require('remark-frontmatter')
const extract = require('remark-extract-frontmatter')
const markdown = require('remark-parse')
const html = require('remark-html')
const yaml = require('yaml').parse

async function convertMDtoVFile (markdownContent) {
  const VFile = await unified()
    .use(markdown)
    .use(frontmatter)
    .use(extract, { name: 'frontmatter', yaml: yaml })
    .use(html)
    .process(markdownContent)
  return VFile
}

module.exports = convertMDtoVFile
