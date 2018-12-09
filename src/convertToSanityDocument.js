const convertHTMLtoPortableText = require('./convertHTMLtoPortableText')
async function convertToSanityDocument({data, contents}) {
  const { title, date, spoiler } = data.frontmatter
  const portableText = convertHTMLtoPortableText(contents)

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
