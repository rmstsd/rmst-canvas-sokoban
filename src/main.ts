import { Leafer } from 'leafer-ui'

import GameStore from './store/store'

const gameStore = new GameStore()
gameStore.initLoad()

const leafer = new Leafer({ view: window })
gameStore.leafer = leafer

gameStore.renderGame()
