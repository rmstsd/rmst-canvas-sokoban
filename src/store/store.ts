import { calcPositionMap, directionKeyboards } from './position'
import { CellType, MapData, Position } from '../type'
import { gameLevels, testMapData } from '../testData'
import GameMap from './_class'

import { Box, Event, Image, Leafer, PointerEvent } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'

import floorImage from '../images/floor1-sheet0.png'
import wallImage from '../images/wall-sheet.jpg'
import crateSheet0 from '../images/crate-sheet0.jpg'
import crateSheet1 from '../images/crate-sheet1.jpg'
import dropPoint from '../images/drop-point.png'
import playerImage from '../images/player.png'

import { cellSize } from '../constant'

class GameStore {
  constructor() {}

  gameMap: GameMap

  leafer: Leafer

  level = 0
  gameLevels = structuredClone(gameLevels) as MapData[]

  initLoad() {
    this.gameMap = new GameMap(this.gameLevels[this.level])

    document.onkeydown = evt => {
      gameStore.movePlayer(evt)
    }
  }

  updateBoxUi(box: Position) {
    this.leafer.findId(box.id).set({ x: box.x * cellSize, y: box.y * cellSize })
  }

  updatePlayerUi(player: Position) {
    this.leafer.findId(`player`).set({ x: player.x * cellSize, y: player.y * cellSize })
  }

  renderGame() {
    document.onkeydown = evt => {
      this.movePlayer(evt)
    }

    this.leafer.removeAll()
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
    }
  }
}

export default GameStore

export const gameStore = new GameStore()
