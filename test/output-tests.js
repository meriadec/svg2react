import expect from 'expect'
import path from 'path'
import fs from 'fs'

import convertSVG from '../src/convertSVG'

const FIXTURES_FOLDER = path.resolve(__dirname, 'fixtures')

describe('output with default options', () => {

  const inputFiles = fs.readdirSync(FIXTURES_FOLDER)

  inputFiles.forEach(file => {

    if (file.endsWith('.js')) { return }

    it(`testing output of ${file}`, async () => {
      const content = fs.readFileSync(
        path.resolve(FIXTURES_FOLDER, file),
        { encoding: 'utf8' }
      )
      const actual = await convertSVG(content)
      const expectedFile = `${file.substr(0, file.indexOf('.'))}.js`
      const expected = fs.readFileSync(
        path.resolve(FIXTURES_FOLDER, expectedFile),
        { encoding: 'utf8' }
      )
      expect(actual).toEqual(expected)
    })

  })

})
