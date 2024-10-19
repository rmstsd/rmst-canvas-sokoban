export interface Position {
  id: string
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
  bgMap: { id: string; type: CellType }[][]
  player: Position
  boxes: Position[]
  targets: Position[]
}
