import { Flow } from '@leafer-in/flow'
import { Rect, Box, Image, IUI, Text, Group } from 'leafer-ui'

const h = (...rest) => {
  const [LeaferClassOrCustomFunction, props, ...children] = rest

  if (typeof LeaferClassOrCustomFunction === 'string') {
    return LeaferClassOrCustomFunction
  }

  const innerProps = { ...props, children: children.flat().filter(Boolean) }

  if ([Rect, Flow, Box, Text, Image, Group].includes(LeaferClassOrCustomFunction)) {
    return new LeaferClassOrCustomFunction({ ...props, children: innerProps.children })
  }

  if (LeaferClassOrCustomFunction === Fragment) {
    return innerProps.children
  }

  return LeaferClassOrCustomFunction(innerProps)
}

export default h

export class Fragment {}
