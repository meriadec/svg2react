import repeat from 'lodash/repeat'
import camelCase from 'lodash/camelCase'

function strToStyle (str) {
  const props = str.substring('style="'.length, str.length - 1).split(';')
  const indent = applyIndent(2)
  return [
    'style={{',
    ...props.map(p => {
      const [key, val] = p.split(':')
      return indent(`${camelCase(key)}: '${val}',`)
    }),
    '}}',
  ]
}

function applyIndent (indentLevel) {
  return function (str) {
    return `${repeat(' ', indentLevel)}${str}`
  }
}

export default function indentAttributes (svg, options) {
  return svg
    .split('\n')
    .reduce((acc, line) => {
      const r = line.match(/^(.*?)(<\/?)([^ ]*) ?([^/]*)(\/?>)(.*?)$/)
      if (!r) { return line.trim() ? acc.concat(line) : acc }
      const prefix = r[1].replace(/ *$/, '')
      const suffix = r[6].replace(/ *$/, '')
      const isClosing = r[2] === '</'
      const isAutoclosing = r[5] === '/>'
      const tag = r[3]
      const attrsStr = r[4]
      const indentLevel = line.match(/^( *)/)[1].length

      const indentParent = applyIndent(indentLevel)
      const indentChild = applyIndent(indentLevel + 2)

      const rAttr = attrsStr.match(/[^=]*="[^"]*"/g) || []

      const attributes = rAttr
        .map(str => {
          str = str.trim()
          if (!options.doubleQuotes) {
            str = str.replace(/"/g, '\'')
          }
          const [key, val] = str.split('=')
          if (key === 'class') { return null }
          if (key === 'style') {
            return strToStyle(str)
              .map(indentChild)
              .join('\n')
          }
          return indentChild(`${camelCase(key)}=${val}`)
        })
        .filter(e => e)
        .join('\n')

      const preSuffix = (prefix ? acc.concat(prefix) : acc).concat((isClosing ? ([
        indentParent(`</${tag}>`),
      ]) : ([
        indentParent(`<${tag}`),
        attributes,
        !isClosing && tag === 'svg' ? indentChild('{...props}') : null,
        indentParent(isAutoclosing ? '/>' : '>'),
      ])).filter(e => e).join('\n'))
      return suffix ? preSuffix.concat((isAutoclosing ? suffix : indentChild(suffix))) : preSuffix
    }, [])
    .join('\n')
}
