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
