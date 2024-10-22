import { Flow } from '@leafer-in/flow'
import { Box, Group, Image, PointerEvent, Rect, Text } from 'leafer-ui'

import { gameStore } from './store/store'
import { CellType } from './type'

import editStore from './store/edit'
import Button from './components/Button'
import { findById } from './utils'
import PlayZoneUi from './components/PlayZoneUi'
import Edit from './pages/Edit'

gameStore.initLoad()

const App = () => {
  return <Edit></Edit>
}

export default App
