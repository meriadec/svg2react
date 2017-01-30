import fs from 'fs'
import path from 'path'

export function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf8' }, (err, file) => {
      if (err) { return reject(err) }
      resolve(file)
    })
  })
}

export function writeFile (path, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, err => {
      if (err) { return reject(err) }
      resolve()
    })
  })
}

export function finalFileName (filePath) {
  let final = filePath.substr(filePath.lastIndexOf('/') + 1)
  final = final.replace(/\.svg$/, '')
  final = `${final}.js`
  return final
}

export function resolveFile (p) {
  if (!p.startsWith('/') && !p.startsWith('~')) {
    p = path.resolve(process.cwd(), p)
  }
  return p
}
