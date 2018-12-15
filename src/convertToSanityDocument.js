const convertHTMLtoPortableText = require('./convertHTMLtoPortableText')

function convertToSanityDocument({data = {}, contents}) {
  const { title, date, spoiler } = data.frontmatter || {}
  const portableText = convertHTMLtoPortableText(contents)

  const doc = {
    _type: 'post',
    _createdAt: new Date(date).toUTCString(),
    publishedAt: new Date(date).toUTCString(),
    title,
    spoiler,
    body: portableText
  }
  return doc
}

module.exports = convertToSanityDocument
