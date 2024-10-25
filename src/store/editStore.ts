import { CellType, MapData } from '@/type'
import { Leafer } from 'leafer-ui'
import GameMap from './_class'

class EditStore {
  constructor(private leafer: Leafer) {}
  setCellType = (c: CellType) => {
    this.cellType = c
  }

  cellType: CellType = CellType.Floor
  gameMap: GameMap

  addCell = (rowIndex: number, colIndex: number) => {
    const { gameMap: gameData, cellType } = this
    const { mapData } = gameData

    const fillCell = (value: CellType) => {
      mapData.bgMap[rowIndex][colIndex] ??= { id: crypto.randomUUID(), type: CellType.Floor }
      mapData.bgMap[rowIndex][colIndex].type = value
    }

    if (cellType === CellType.Floor) {
      fillCell(CellType.Floor)
    } else if (cellType === CellType.Wall) {
      fillCell(CellType.Wall)
    } else {
      if ([CellType.Player, CellType.Box, CellType.Target].includes(cellType)) {
        fillCell(CellType.Floor)

        if (cellType === CellType.Player) {
          mapData.player = { id: crypto.randomUUID(), x: colIndex, y: rowIndex }
        } else if (cellType === CellType.Box) {
          const hasBox = mapData.boxes.some(box => box.x === colIndex && box.y === rowIndex)
          if (!hasBox) {
            mapData.boxes.push({ id: crypto.randomUUID(), x: colIndex, y: rowIndex })
          }
        } else if (cellType === CellType.Target) {
          const hasTarget = mapData.targets.some(item => item.x === colIndex && item.y === rowIndex)
          if (!hasTarget) {
            mapData.targets.push({ id: crypto.randomUUID(), x: colIndex, y: rowIndex })
          }
        }
      }
    }
  }

  // removeTarget(index: number) {
  //   this.mapData.targets.splice(index, 1)
  // }

  // removeBox(index: number) {
  //   this.mapData.boxes.splice(index, 1)
  // }
}

export default EditStore
