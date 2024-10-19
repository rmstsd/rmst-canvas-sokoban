import { CellType, MapData, Position } from '../type'

class GameMap {
  constructor(data: MapData) {
    this.mapData = data
  }

  mapData: MapData = {
    bgMap: [],
    boxes: [],
    targets: [],
    player: null
  }

  isWall(pos: Position) {
    return this.mapData.bgMap[pos.y][pos.x].type === CellType.Wall
  }

  findBox(pos: Position) {
    return this.mapData.boxes.find(item => item.x === pos.x && item.y === pos.y)
  }

  isBoxInTarget(pos: Position) {
    return this.mapData.targets.some(box => box.x === pos.x && box.y === pos.y)
  }

  isValidMap() {
    if (
      !this.mapData.boxes.length ||
      !this.mapData.targets.length ||
      this.mapData.boxes.length !== this.mapData.targets.length
    ) {
      console.log('boxes and targets not match')
      return
    }

    if (!this.mapData.player) {
      console.log('player not found')

      return
    }
  }

  isWon() {
    return (
      this.mapData.boxes.length &&
      this.mapData.targets.length &&
      this.mapData.boxes.every(box => this.mapData.targets.some(target => box.x === target.x && box.y === target.y))
    )
  }
}

export default GameMap
