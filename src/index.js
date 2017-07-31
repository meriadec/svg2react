#!/usr/bin/env node

import 'babel-polyfill'

import program from 'commander'

import { version } from '../package.json'
import convertFile from './convertFile'
import buildOptions from './buildOptions'
import glob from 'glob'
import fs from 'fs'

program
  .version(version)
  .usage('[options] <file> [otherFiles...]')
  .option('-d, --output-dir [dir]', 'Output directory')
  .option('-q, --quotes', 'Use double quotes instead of simple quotes for surround attributes')
  .parse(process.argv)

if (!program.args.length) {
  console.log('No file specified.') // eslint-disable-line no-console
  process.exit(1)
}

let files = program.args
const options = buildOptions(program)

if (files.length === 1 && !fs.existsSync(files[0])) {
  files = glob.sync(files[0])
}
files
  .reduce(
    (promise, file) => promise.then(
      () => convertFile(file, options)
    ),
    Promise.resolve()
  )
  .catch(err => {
    console.log(err.stack) // eslint-disable-line no-console
    process.exit(1)
  })
