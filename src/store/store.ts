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

    const { mapData } = this.gameMap
    const { leafer } = this

    const bgMapUi = new Flow({
      flow: 'y',
      children: mapData.bgMap.map(row => {
        const flow = new Flow({
          children: row.map(cell => {
            const renderCell = cell => {
              if (cell.type === CellType.Floor) {
                return floorImage
              }

              if (cell.type === CellType.Wall) {
                return wallImage
              }

              return null
            }

            const image = new Image({ url: renderCell(cell), width: cellSize, height: cellSize })
            return image
          })
        })

        return flow
      })
    })

    const targetsUi = mapData.targets.map(
      item =>
        new Flow({
          x: item.x * cellSize,
          y: item.y * cellSize,
          width: cellSize,
          height: cellSize,
          flowAlign: 'center',
          children: [new Image({ url: dropPoint, width: cellSize / 2, height: cellSize / 2 })]
        })
    )

    const boxesUi = mapData.boxes.map(item => {
      return new Image({
        id: item.id,
        x: item.x * cellSize,
        y: item.y * cellSize,
        url: crateSheet0,
        width: cellSize,
        height: cellSize
      })
    })

    const playerUi = new Image({
      id: 'player',
      x: mapData.player.x * cellSize,
      y: mapData.player.y * cellSize,
      url: playerImage,
      width: cellSize,
      height: cellSize
    })

    const playZoneUi = new Box({ children: [bgMapUi, ...targetsUi, ...boxesUi, playerUi] })

    const ctrlUi = new Flow({
      x: 100,
      y: 100,
      children: [
        new Box({
          id: 'prev-level',
          x: 100,
          y: 100,
          fill: '#FF4B4B',
          cornerRadius: 20,
          children: [{ tag: 'Text', text: '上一关', fill: 'black', padding: [10, 20] }],
          event: {
            [PointerEvent.CLICK]: () => {
              const prevLevel = this.level - 1
              if (prevLevel >= 0) {
                this.level = prevLevel
                this.gameMap = new GameMap(this.gameLevels[this.level])
                this.renderGame()
              }
            }
          }
        }),
        { id: 'level', tag: 'Text', fontSize: 16, text: String(this.level + 1), fill: 'black', padding: [10, 20] },
        new Box({
          id: 'next-level',
          x: 100,
          y: 100,
          fill: '#FF4B4B',
          cornerRadius: 20,
          children: [{ tag: 'Text', text: '下一关', fill: 'black', padding: [10, 20] }],
          event: {
            [PointerEvent.CLICK]: () => {
              const nextLevel = this.level + 1
              if (nextLevel < this.gameLevels.length) {
                this.level = nextLevel
                this.gameMap = new GameMap(this.gameLevels[this.level])
                this.renderGame()
              }
            }
          }
        })
      ]
    })

    const body = new Flow({ flow: 'y', children: [playZoneUi, ctrlUi] })
    leafer.add(body)
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
