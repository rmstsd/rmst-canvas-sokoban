import { calcPositionMap, directionKeyboards } from './position'
import { MapData, Position } from '../type'
import { gameLevels } from '../testData'
import GameMap from './_class'

import { Leafer } from 'leafer-ui'

import { cellSize } from '../constant'
import Play from '@/pages/Play'
import WonUi from '@/components/WonUi'
import Edit from '@/pages/Edit'
import editStore from './editStore'
import EditStore from './editStore'
import { createContext } from '@/utils'

export const EditContext = createContext()

class GameStore {
  constructor(private leafer: Leafer) {}

  gameMap: GameMap

  level = 0
  gameLevels = structuredClone(gameLevels) as MapData[]

  initLoad() {
    document.addEventListener('keydown', this.keydown)

    this.gameMap = new GameMap(this.gameLevels[this.level])

    const gameUi = Play({ gameStore: this })
    this.leafer.add(gameUi)
  }

  destroy() {
    document.removeEventListener('keydown', this.keydown)
  }

  keydown = (evt: KeyboardEvent) => {
    this.movePlayer(evt)
  }

  editMap() {
    const editStore = new EditStore(this.leafer)
    editStore.gameMap = new GameMap(structuredClone(this.gameMap.mapData))
    const editUi = (
      <EditContext.Provider value={editStore}>
        <Edit editStore={editStore} />
      </EditContext.Provider>
    )

    this.leafer.add(editUi)
  }

  updateBoxUi(box: Position) {
    this.leafer.findId(box.id).set({ x: box.x * cellSize, y: box.y * cellSize })
  }

  updatePlayerUi(player: Position) {
    this.leafer.findId(`player`).set({ x: player.x * cellSize, y: player.y * cellSize })
  }

  movePlayer(evt: KeyboardEvent) {
    if (!directionKeyboards.includes(evt.key)) return
    evt.preventDefault()

    if (this.gameMap.isWon()) {
      return
    }

    const { mapData } = this.gameMap

    if (!mapData.player) {
      return
    }

    const { calcPosition } = calcPositionMap[evt.key]
    const nextPosition = calcPosition(mapData.player)
    console.log(nextPosition)

    if (this.gameMap.isWall(nextPosition)) {
      return
    }

    const nextBox = this.gameMap.findBox(nextPosition)
    if (nextBox) {
      const nextNextPosition = calcPosition(nextPosition)
      if (this.gameMap.isWall(nextNextPosition) || this.gameMap.findBox(nextNextPosition)) {
        return
      }

      nextBox.x = nextNextPosition.x
      nextBox.y = nextNextPosition.y
      this.updateBoxUi(nextBox)
    }

    mapData.player = nextPosition
    this.updatePlayerUi(mapData.player)

    if (this.gameMap.isWon()) {
      console.log('won')

      const playZoneUi = this.leafer.findId('playZoneUi')
      const wonUi = <WonUi width={playZoneUi.width} height={playZoneUi.height}></WonUi>
      playZoneUi.add(wonUi)
    }
  }
}

export default GameStore
