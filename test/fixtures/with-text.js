import React from 'react'

export default props => (
  <svg
    viewBox='0 0 32 32'
    {...props}
  >
    <path
      d='M16 32c8.837 0 16-7.163 16-16S24.837 0 16 0 0 7.163 0 16s7.163 16 16 16zm0-29c7.18 0 13 5.82 13 13s-5.82 13-13 13S3 23.18 3 16 8.82 3 16 3z'
    />
    <text
      x='16'
      y='16'
      textAnchor='middle'
    >
      This is a
      <tspan
        textAnchor='end'
      >
        test</tspan>
    </text>
    <text
      x='16'
      y='16'
      textAnchor='middle'
    >
      This is a test
    </text>
    <text
      x='16'
      y='16'
      textAnchor='middle'
    >
      <tspan>This</tspan
      >
         is a test
    </text>
  </svg>
)
