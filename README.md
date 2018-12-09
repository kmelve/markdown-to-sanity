# Remark to Sanity

This tool can glob a folder of markdown files with yaml frontmatter (typically found in Gatsby blogs) and ouput a Sanity.io `.ndjson`-import file.


## Installation

As a global CLI tool:

```sh
npm i -g remark-to-sanity

# or

yarn add --global remark-to-sanity
```

As a project dependency:

```sh
npm i remark-to-sanity

# or

yarn add remark-to-sanity
```




## Usage

As CLI:
```sh
> remark-to-sanity # follow the instructions
```

The CLI will write a `ndjson`-file you can use with `sanity dataset import`. [Learn more about importing data to Sanity](https://www.sanity.io/docs/data-store/importing-data).

In a project:
```js
const migrateFiles = require('remark-to-sanity')

migrateFiles({
  inputPath: '~/Sites/gatsby-blog/src/pages',
  filename: 'production',
  outputPath: './'
})
```