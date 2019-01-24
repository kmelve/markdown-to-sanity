const convertHTMLtoPortableText = require('./convertHTMLtoPortableText')
const {format} = require('date-fns')
function convertToSanityDocument({data = {}, contents}) {
  const { title, date } = data.frontmatter || {}
  const portableText = convertHTMLtoPortableText(contents)

  const doc = {
    _type: 'post',
    _createdAt: format(new Date(date)),
    publishedAt: format(new Date(date)),
    title,
    body: portableText
  }
  return doc
}

module.exports = convertToSanityDocument
