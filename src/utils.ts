import { IUI } from 'leafer-ui'

export function findById(iui: IUI, id: string): IUI {
  if (iui.__._id === id) {
    return iui
  } else {
    for (const child of iui.children) {
      let result = findById(child, id)
      if (result) {
        return result
      }
    }
  }
}

export function uuid() {
  return crypto.randomUUID()
}

export function closestById(el: IUI, id: string) {
  let p = el
  while (p) {
    if (p.id === id) {
      return p
    }

    p = p.parent
  }

  return null
}

export function createElement(tagName: string, props: any, children: any) {
  const element = document.createElement(tagName)

  for (const key in props) {
    if (props.hasOwnProperty(key)) {
      element.setAttribute(key, props[key])
    }
    if (key === 'onClick') {
      element.onclick = props[key]
    }
  }

  if (children) {
    if (typeof children === 'string') {
      element.textContent = children
    } else {
      element.appendChild(children)
    }
  }

  return element
}

export const createContext = () => {
  const context = {
    value: null,
    Provider: ({ value, children = null }) => {
      context.value = value

      return children
    }
  }

  return context
}
