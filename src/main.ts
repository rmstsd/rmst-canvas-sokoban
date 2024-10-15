import { Image, Leafer, Rect } from 'leafer-ui'
import { Flow } from '@leafer-in/flow'

import floorImage from './images/floor1-sheet0.png'
import wallImage from './images/wall-sheet.jpg'

import sokobanStore from './store/store'
import { CellType } from './type'

const cellSize = 40

console.log(sokobanStore.mapData)

const leafer = new Leafer({ view: window })

const mapViews = sokobanStore.mapData.bgMap.map(row => {
  const flow = new Flow({
    children: row.map(cell => {
      const renderCell = cell => {
        if (cell === CellType.Floor) {
          return floorImage
        }

        if (cell === CellType.Wall) {
          return wallImage
        }

        return null
      }

      const image = new Image({ url: renderCell(cell), width: cellSize, height: cellSize })

      return image
    }),
    fill: '#676'
  })

  return flow
})

const flow = new Flow({ flow: 'y', children: mapViews })

leafer.add(flow)
