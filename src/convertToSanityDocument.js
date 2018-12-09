const blockTools = require('@sanity/block-tools').default
const convertToPortableText = require('./convertHTMLtoPortableText')
const jsdom = require('jsdom')
const {JSDOM} = jsdom

const defaultSchema = require('./defaultSchema')

const blockContentType = defaultSchema.get('blogPost').fields.find(field => field.name === 'body')
  .type

function convertToSanityDocument({data, contents}) {
  const { title, date, spoiler } = data.frontmatter
  const HTMLdocument = `<html>
  <body>
    <em>Hei</em>
    <pre><code>const foo = 'bar'</code></pre>
  </body>
</html>`

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

  const portableText = blockTools.htmlToBlocks(HTMLdocument, blockContentType, {rules})



  const doc = {
    _type: 'post',
    date: new Date(date).toUTCString(),
    publishedAt: new Date(date).toUTCString(),
    title,
    spoiler,
    body: portableText
  }
  return doc/* .filter(block => block._type !== "block") */
}

module.exports = convertToSanityDocument
