import { CellType, MapData, Position } from './type'

class SceneMap {
  mapData: MapData = {
    bgMap: [],
    boxes: [],
    targets: [],
    player: null
  }

  isWall(pos: Position) {
    return this.mapData.bgMap[pos.y][pos.x] === CellType.Wall
  }

  findBox(pos: Position) {
    return this.mapData.boxes.find(item => item.x === pos.x && item.y === pos.y)
  }

  isBoxInTarget(pos: Position) {
    return this.mapData.targets.some(box => box.x === pos.x && box.y === pos.y)
  }
}

export default SceneMap
