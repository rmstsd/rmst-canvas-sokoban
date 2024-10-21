import { Leafer } from 'leafer-ui'
import App from './App'
import { gameStore } from './store/store'

const leafer = new Leafer({ view: document.querySelector('#root') })
leafer.add(<App />)
gameStore.leafer = leafer
