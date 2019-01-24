# Markdown to Sanity

This tool can glob a folder of markdown files with yaml frontmatter (typically found in Gatsby blogs) and ouput a Sanity.io `.ndjson`-import file.

## Installation

As a global CLI tool:

```sh
npm i -g markdown-to-sanity

# or

yarn add --global markdown-to-sanity
```

As a project dependency:

```sh
npm i markdown-to-sanity

# or

yarn add markdown-to-sanity
```

## Usage

As CLI:
```sh
> markdown-to-sanity # follow the instructions
```

The CLI will write a `ndjson`-file you can use with `sanity dataset import`. [Learn more about importing data to Sanity](https://www.sanity.io/docs/data-store/importing-data).

In a project:
```js
const migrateFiles = require('markdown-to-sanity')

migrateFiles({
  inputPath: '~/Sites/gatsby-blog/src/pages',
  filename: 'production',
  outputPath: './'
})
```