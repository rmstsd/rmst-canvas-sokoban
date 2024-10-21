import { Flow } from '@leafer-in/flow'
import { Box, Image, PointerEvent, Text } from 'leafer-ui'

import { gameStore } from './store/store'
import { CellType } from './type'

import floorImage from '@/images/floor1-sheet0.png'
import wallImage from '@/images/wall-sheet.jpg'
import crateSheet0 from '@/images/crate-sheet0.jpg'
import crateSheet1 from '@/images/crate-sheet1.jpg'
import dropPoint from '@/images/drop-point.png'
import playerImage from '@/images/player.png'
import { cellSize } from '@/constant'
import editStore from './store/edit'
import Button from './components/Button'

gameStore.initLoad()
document.onkeydown = evt => {
  gameStore.movePlayer(evt)
}
const mapData = gameStore.gameMap.mapData

const BgMapUi = () => {
  const renderCell = cell => {
    if (cell.type === CellType.Floor) {
      return floorImage
    }

    if (cell.type === CellType.Wall) {
      return wallImage
    }

    return null
  }

  return (
    <Flow flow="y">
      {mapData.bgMap.map((row, rowIndex) => {
        return (
          <Flow>
            {row.map((cell, colIndex) => (
              <Image
                url={renderCell(cell)}
                width={cellSize}
                height={cellSize}
                event={{
                  [PointerEvent.MOVE]: evt => {
                    if (evt.pressure) {
                      editStore.addCell(rowIndex, colIndex)
                      evt.target.leafer.forceRender()
                    }
                  }
                }}
              />
            ))}
          </Flow>
        )
      })}
    </Flow>
  )
}

const TargetsUi = () => {
  return mapData.targets.map(item => (
    <Flow x={item.x * cellSize} y={item.y * cellSize} width={cellSize} height={cellSize} flowAlign="center">
      <Image url={dropPoint} width={cellSize / 2} height={cellSize / 2} />
    </Flow>
  ))
}
const BoxesUi = () => {
  return mapData.boxes.map(item => (
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
const PlayerUi = () => (
  <Image
    id="player"
    x={mapData.player.x * cellSize}
    y={mapData.player.y * cellSize}
    url={playerImage}
    width={cellSize}
    height={cellSize}
  />
)
const PlayZoneUi = () => {
  return (
    <Box>
      <BgMapUi />
      <TargetsUi />
      <BoxesUi />
      <PlayerUi />
    </Box>
  )
}

const CtrlUi = () => {
  return (
    <Flow x={100} y={100}>
      <Box id="prev-level" x={100} y={100} fill="#FF4B4B" cornerRadius={20}>
        <Text text="上一关" fill="black" padding={[10, 20]} />
      </Box>
      <Text id="level" fontSize={16} text="0" fill="black" padding={[10, 20]} />
      <Box id="next-level" x={100} y={100} fill="#FF4B4B" cornerRadius={20}>
        <Text text="下一关" fill="black" padding={[10, 20]} />
      </Box>

      <Button
        onClick={() => {
          console.log('edit')

          const Buttons = (
            <>
              <Button onClick={() => editStore.setCellType(CellType.Floor)}>地板</Button>
              <Button onClick={() => editStore.setCellType(CellType.Wall)}>墙</Button>
              <Button onClick={() => editStore.setCellType(CellType.Player)}>玩家</Button>
              <Button onClick={() => editStore.setCellType(CellType.Box)}>箱子</Button>
              <Button onClick={() => editStore.setCellType(CellType.Target)}>放置点</Button>
            </>
          )

          const bg = (
            <Flow x={0} y={0} width={1000} height={1000} fill="rgba(0,0,0,0.5)" flowAlign="center">
              <Flow width={800} height={800} fill="white" padding={10}>
                {Buttons}
                <Button
                  onClick={() => {
                    bg.remove()
                  }}
                >
                  ok
                </Button>
              </Flow>
            </Flow>
          )

          gameStore.leafer.add(bg)
        }}
      >
        编辑地图
      </Button>
    </Flow>
  )
}

const App = () => {
  return (
    <Flow flow="y">
      <PlayZoneUi />
      <CtrlUi />
    </Flow>
  )
}

export default App
