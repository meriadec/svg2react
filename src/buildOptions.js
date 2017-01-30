import * as fs from './fs'

export default function buildOptions (program) {
  return {
    outputDir: fs.resolveFile(program.outputDir) || process.cwd(),
  }
}
