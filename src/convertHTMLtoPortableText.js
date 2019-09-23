const blockTools = require('@sanity/block-tools').default
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const HTMLpattern = /<[a-z][\s\S]*>/

/**
 *  block tools needs a schema definition to now what
 * types are available
 *  */
const defaultSchema = require('./defaultSchema')
const blockContentType = defaultSchema
  .get('blogPost')
  .fields.find(field => field.name === 'body').type

function convertHTMLtoPortableText (HTMLDoc) {
  if (!HTMLpattern.test(HTMLDoc)) {
    return []
  }
  const rules = [
    {
      // Special case for code blocks (wrapped in pre and code tag)
      deserialize (el, next, block) {
        if (el.tagName.toLowerCase() !== 'pre') {
          return undefined
        }
        const codeElement = el.children[0]
        const codeElementNodes =
        codeElement && codeElement.tagName.toLowerCase() === 'code'
            ? codeElement.childNodes
            : el.childNodes
        let code = ''
        codeElementNodes.forEach(node => {
          code += node.textContent
        })

        let language = 'text';
        if(codeElement.className){
          language = codeElement.className.split("-")[1];
        }
        return block({
          _type: 'code',
          code: code,
          language: language
        })
      }
    },
    {
      deserialize (el, next, block) {
        if (el.tagName === 'IMG') {
          return {
            _type: 'img',
            asset: {
              src: `${el.getAttribute('src').replace(/^\/\//, 'https://')}`,
              alt: `${el.getAttribute('alt')}`
            }
          }
        }

        if (
          el.tagName.toLowerCase() === 'p' &&
          el.childNodes.length === 1 &&
          el.childNodes.tagName &&
          el.childNodes[0].tagName.toLowerCase() === 'img'
        ) {
          return {
            _type: 'img',
            asset: {
              src: `${el.getAttribute('src').replace(/^\/\//, 'https://')}`,
              alt: `${el.getAttribute('alt')}`
            }
          }
        }
        // Only convert block-level images, for now
        return undefined
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