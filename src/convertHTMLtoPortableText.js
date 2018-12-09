const blockTools = require('@sanity/block-tools').default
const jsdom = require('jsdom')
const {JSDOM} = jsdom

const defaultSchema = require('./defaultSchema')

const blockContentType = defaultSchema.get('blogPost').fields.find(field => field.name === 'body')
  .type


function convertHTMLtoPortableText(HTMLDoc) {
  console.log(HTMLDoc)
  const rules = [
    {
      // Special case for code blocks (wrapped in pre and code tag)
      deserialize(el, next, block) {
        if (el.tagName.toLowerCase() !== 'pre') {
          return undefined
        }
        const code = el.children[0]
        const childNodes =
          code && code.tagName.toLowerCase() === 'code' ? code.childNodes : el.childNodes
        let text = ''
        childNodes.forEach(node => {
          text += node.textContent
        })
        return block({
          _type: 'code',
          text: text
        })
      }
    }
  ]

  return blockTools.htmlToBlocks(HTMLDoc, blockContentType, {
    rules,
    parseHtml: html => new JSDOM(html).window.document
  })

}

module.exports = convertHTMLtoPortableText