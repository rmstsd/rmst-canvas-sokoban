class Edit {
  setCellType = c => {
    this.cellType = c
  }

  addCell = (rowIndex, colIndex) => {
    const { mapData, cellType } = this

    const fillCell = value => {
      mapData.bgMap[rowIndex][colIndex] = value
    }
    if (cellType === CellType.Floor) {
      fillCell(CellType.Floor)
    } else if (cellType === CellType.Wall) {
      fillCell(CellType.Wall)
    } else {
      if ([CellType.Player, CellType.Box, CellType.Target].includes(cellType)) {
        fillCell(CellType.Floor)

        if (cellType === CellType.Player) {
          mapData.player = { x: colIndex, y: rowIndex }
        } else if (cellType === CellType.Box) {
          const hasBox = mapData.boxes.some(box => box.x === colIndex && box.y === rowIndex)
          if (!hasBox) {
            mapData.boxes.push({ x: colIndex, y: rowIndex })
          }
        } else if (cellType === CellType.Target) {
          const hasTarget = mapData.targets.some(item => item.x === colIndex && item.y === rowIndex)
          if (!hasTarget) {
            mapData.targets.push({ x: colIndex, y: rowIndex })
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
