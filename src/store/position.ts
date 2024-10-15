import { Position } from '../type'

export const directionKeyboards = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

export const calcPositionMap = {
  ArrowUp: {
    calcPosition: (pos: Position) => ({ x: pos.x, y: pos.y - 1 })
  },
  ArrowDown: {
    calcPosition: (pos: Position) => ({ x: pos.x, y: pos.y + 1 })
  },
  ArrowLeft: {
    calcPosition: (pos: Position) => ({ x: pos.x - 1, y: pos.y })
  },
  ArrowRight: {
    calcPosition: (pos: Position) => ({ x: pos.x + 1, y: pos.y })
  }
}
