import path from 'path'

import convertSVG from './convertSVG'
import * as fs from './fs'

export default async function convertFile (filePath, options) {

  filePath = fs.resolveFile(filePath)

  const content = await fs.readFile(filePath)
  const converted = await convertSVG(content, options)

  const fileName = fs.finalFileName(filePath)
  const finalFilePath = path.resolve(options.outputDir, fileName)

  await fs.writeFile(finalFilePath, converted)

}
