export default content => {
  const indented = content
    .split('\n')
    .map(line => `  ${line}`)
    .join('\n')
  return `import React from 'react'

export default props => (
${indented}
)
`
}
