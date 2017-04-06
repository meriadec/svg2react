import * as fs from './fs'

export default function buildOptions (program) {
  return {
    outputDir: program.outputDir ? fs.resolveFile(program.outputDir) : process.cwd(),
    doubleQuotes: !!program.quotes,
  }
}
