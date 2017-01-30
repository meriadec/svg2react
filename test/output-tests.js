import expect from 'expect'
import path from 'path'
import fs from 'fs'

import convertSVG from '../src/convertSVG'

const SVG_FOLDER = path.resolve(__dirname, 'fixtures/svgs')
const EXPECTED_FOLDER = path.resolve(__dirname, 'fixtures/expected')

describe('output with default options', () => {

  const inputFiles = fs.readdirSync(SVG_FOLDER)

  inputFiles.forEach(file => {

    it(`testing output of ${file}`, async () => {
      const content = fs.readFileSync(
        path.resolve(SVG_FOLDER, file),
        { encoding: 'utf8' }
      )
      const actual = await convertSVG(content)
      const expectedFile = `${file.substr(0, file.indexOf('.'))}.js`
      const expected = fs.readFileSync(
        path.resolve(EXPECTED_FOLDER, expectedFile),
        { encoding: 'utf8' }
      )
      expect(actual).toEqual(expected)
    })

  })

})
