import { Box, Image, IUI, PointerEvent, Rect, Text } from 'leafer-ui'

import floorImage from '@/images/floor1-sheet0.png'
import wallImage from '@/images/wall-sheet.jpg'
import crateSheet0 from '@/images/crate-sheet0.jpg'
import crateSheet1 from '@/images/crate-sheet1.jpg'
import dropPoint from '@/images/drop-point.png'
import playerImage from '@/images/player.png'
import { cellSize } from '@/constant'
import { CellType } from '@/type'
import { Flow } from '@leafer-in/flow'
import { gameStore } from '@/store/store'
import editStore from '@/store/edit'

const BgMapUi = ({ bgMap }) => {
  const renderCellElement = (cell): IUI => {
    if (!cell) {
      return <Rect fill="#eee" width={cellSize} height={cellSize} />
    }

    const renderUrl = () => {
      if (cell.type === CellType.Floor) {
        return floorImage
      }

      if (cell.type === CellType.Wall) {
        return wallImage
      }
    }
    return <Image url={renderUrl()} width={cellSize} height={cellSize} />
  }

  return (
    <Flow flow="y" fill="blue">
      {bgMap.map((row, rowIndex) => {
        return (
          <Flow fill="red">
            {row.map((cell, colIndex) => {
              const cellElement = renderCellElement(row[colIndex])

              const box: Box = (
                <Box
                  width={cellSize}
                  height={cellSize}
                  event={{
                    [PointerEvent.MOVE]: evt => {
                      if (evt.pressure) {
                        editStore.addCell(rowIndex, colIndex)

                        cellElement.remove()
                        box.add(renderCellElement(row[colIndex]))
                      }
                    }
                  }}
                >
                  {cellElement}
                </Box>
              )
              return box
            })}
          </Flow>
        )
      })}
    </Flow>
  )
}

const TargetsUi = ({ targets }) => {
  return targets.map(item => (
    <Flow x={item.x * cellSize} y={item.y * cellSize} width={cellSize} height={cellSize} flowAlign="center">
      <Image url={dropPoint} width={cellSize / 2} height={cellSize / 2} />
    </Flow>
  ))
}

const BoxesUi = ({ boxes }) => {
  return boxes.map(item => (
    <Image
      id={item.id}
      x={item.x * cellSize}
      y={item.y * cellSize}
      url={crateSheet0}
      width={cellSize}
      height={cellSize}
    />
  ))
}
const PlayerUi = ({ player }) => (
  <Image
    id="player"
    x={player.x * cellSize}
    y={player.y * cellSize}
    url={playerImage}
    width={cellSize}
    height={cellSize}
  />
)

const PlayZoneUi = () => {
  return (
    <Box>
      <BgMapUi bgMap={editStore.mapData.bgMap} />
      <TargetsUi targets={editStore.mapData.targets} />
      <BoxesUi boxes={editStore.mapData.boxes} />
      {/* <PlayerUi player={editStore.mapData.player} /> */}
    </Box>
  )
}

export default PlayZoneUi