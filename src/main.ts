import { Event, Image, Leafer } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'

import floorImage from './images/floor1-sheet0.png'
import wallImage from './images/wall-sheet.jpg'

import crateSheet0 from './images/crate-sheet0.jpg'
import crateSheet1 from './images/crate-sheet1.jpg'

import dropPoint from './images/drop-point.png'

import playerImage from './images/player.png'

import sokobanStore from './store/store'
import { CellType, Position } from './type'

const cellSize = 40

const { mapData } = sokobanStore

console.log(sokobanStore.mapData)

const leafer = new Leafer({ view: window })

const bgMap = new Flow({
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

const targets = mapData.targets.map(
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

const boxsMap = new Map()

const boxesUi = mapData.boxes.map(item => {
  const box = new Image({
    x: item.x * cellSize,
    y: item.y * cellSize,
    url: crateSheet0,
    width: cellSize,
    height: cellSize
  })

  boxsMap.set(item.id, box)
  return box
})

console.log(boxsMap)

export const updateBox = box => {
  boxsMap.get(box.id).set({ x: box.x * cellSize, y: box.y * cellSize })
}

const playerUi = new Image({
  x: mapData.player.x * cellSize,
  y: mapData.player.y * cellSize,
  url: playerImage,
  width: cellSize,
  height: cellSize
})

export const updatePlayer = () => {
  playerUi.set({ x: mapData.player.x * cellSize, y: mapData.player.y * cellSize })
}

leafer.add(bgMap)
leafer.addMany(...targets, ...boxesUi)
leafer.add(playerUi)

document.onkeydown = evt => {
  sokobanStore.movePlayer(evt)
}
