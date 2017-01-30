#!/usr/bin/env node

import 'babel-polyfill'

import program from 'commander'

import { version } from '../package.json'
import convertFile from './convertFile'
import buildOptions from './buildOptions'

program
  .version(version)
  .usage('[options] <file> [otherFiles...]')
  .option('-d, --output-dir [dir]', 'Output directory')
  .parse(process.argv)

if (!program.args.length) {
  console.log('No file specified.') // eslint-disable-line no-console
  process.exit(1)
}

const files = program.args
const options = buildOptions(program)

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
