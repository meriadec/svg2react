import flow from 'lodash/flow'

import applySVGO from './applySVGO'
import reactTemplate from './reactTemplate'
import indentAttributes from './indentAttributes'

export default async function convertSVG (svg, options = {}) {

  const cleaned = await applySVGO(svg, options)

  return flow([
    c => indentAttributes(c, options),
    c => reactTemplate(c, options),
  ])(cleaned)

}
