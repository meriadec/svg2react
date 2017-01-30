import SVGO from 'svgo'
import merge from 'lodash/merge'

export default function applySVGO (svg, options = {}) {

  const svgoOptions = merge({
    js2svg: {
      pretty: true,
      indent: 2,
    },
    plugins: [
      { removeXMLNS: true },
      { removeDimensions: true },
      { convertStyleToAttrs: false },
      { removeStyleElement: true },
      { sortAttrs: true },
    ],
  }, options.svgo || {})

  return new Promise((resolve) => {

    const svgo = new SVGO(svgoOptions)

    svgo.optimize(svg, res => resolve(res.data))

  })
}
