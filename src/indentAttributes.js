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

export default function indentAttributes (svg) {
  return svg
    .split('\n')
    .reduce((acc, line) => {
      const r = line.match(/(<\/?)([^ ]*) ?([^/]*)(\/?>)/)
      if (!r) { return acc }
      const isClosing = r[1] === '</'
      const isAutoclosing = r[4] === '/>'
      const tag = r[2]
      const attrsStr = r[3]
      const indentLevel = line.match(/^( *)/)[1].length

      const indentParent = applyIndent(indentLevel)
      const indentChild = applyIndent(indentLevel + 2)

      const rAttr = attrsStr.match(/[^=]*="[^"]*"/g) || []

      const attributes = rAttr
        .map(str => {
          str = str.trim().replace(/"/g, '\'')
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

      return acc.concat((isClosing ? ([
        indentParent(`</${tag}>`),
      ]) : ([
        indentParent(`<${tag}`),
        attributes,
        !isClosing && tag === 'svg' ? indentChild('{...props}') : null,
        indentParent(isAutoclosing ? '/>' : '>'),
      ])).filter(e => e).join('\n'))
    }, [])
    .join('\n')
}
