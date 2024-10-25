import { Leafer } from 'leafer-ui'

import GameStore from './store/store'
import { createContext, createElement } from './utils'

// const leafer = new Leafer({ view: document.querySelector('#root') })
// export const gameStore = new GameStore(leafer)
// gameStore.initLoad()

// const p = new Flow({ width: 100, height: 100, fill: 'red', cursor: 'pointer', children: [] })
// leafer.add(p)
// console.log(p.findId('asd'))

const ctx = createContext()

const ass = () => {
  console.log(ctx.value)

  return createElement(
    'button',
    {
      id: 'child',
      onClick: () => {
        console.log(ctx.value)
        console.log('clicked')
      }
    },
    '点我'
  )
}

const dd = ctx.Provider({
  children: ass(),
  value: 456
})

const root = document.querySelector('#root')
root.appendChild(dd)
