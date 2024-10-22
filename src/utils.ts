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
