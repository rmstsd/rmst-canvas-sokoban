export interface Position {
  x: number
  y: number
}

export enum CellType {
  Floor = 'f',
  Wall = 'q',
  Player = 'p',
  Box = 'b',
  Target = 't'
}

export interface MapData {
  bgMap: CellType[][]
  player: Position
  boxes: Position[]
  targets: Position[]
}
