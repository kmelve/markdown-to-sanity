const blockTools = require('@sanity/block-tools').default
const jsdom = require('jsdom')
const { JSDOM } = jsdom

/**
 *  block tools needs a schema definition to now what
 * types are available
 *  */
const defaultSchema = require('./defaultSchema')
const blockContentType = defaultSchema
  .get('blogPost')
  .fields.find(field => field.name === 'body').type

function convertHTMLtoPortableText (HTMLDoc) {
  const rules = [
    {
      // Special case for code blocks (wrapped in pre and code tag)
      deserialize (el, next, block) {
        if (el.tagName.toLowerCase() !== 'pre') {
          return undefined
        }
        const code = el.children[0]
        const childNodes =
          code && code.tagName.toLowerCase() === 'code'
            ? code.childNodes
            : el.childNodes
        let text = ''
        childNodes.forEach(node => {
          text += node.textContent
        })
        /**
         * use `block()` to add it to the
         * root array, instead of as
         * children of a block
         *  */

        return block({
          _type: 'code',
          text: text
        })
      }
    }
  ]
  /**
   * Since we're in a node context, we need
   * to give block-tools JSDOM in order to
   * parse the HTML DOM elements
   */
  return blockTools.htmlToBlocks(HTMLDoc, blockContentType, {
    rules,
    parseHtml: html => new JSDOM(html).window.document
  })
}

module.exports = convertHTMLtoPortableText
