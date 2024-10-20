import { Flow } from '@leafer-in/flow'
import { Box, Image, Text } from 'leafer-ui'

import GameStore from './store/store'
import { CellType } from './type'

import floorImage from '@/images/floor1-sheet0.png'
import wallImage from '@/images/wall-sheet.jpg'
import crateSheet0 from '@/images/crate-sheet0.jpg'
import crateSheet1 from '@/images/crate-sheet1.jpg'
import dropPoint from '@/images/drop-point.png'
import playerImage from '@/images/player.png'
import { cellSize } from '@/constant'

const gameStore = new GameStore()
gameStore.initLoad()

const mapData = gameStore.gameMap.mapData

const h = (...rest) => {
  const [LeaferClassOrCustomFunction, props, ...children] = rest

  if ([Flow, Box, Text, Image].includes(LeaferClassOrCustomFunction)) {
    return new LeaferClassOrCustomFunction({ ...props, children: children.flat().filter(Boolean) })
  }

  return LeaferClassOrCustomFunction()
}

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
      {mapData.bgMap.map(row => {
        return (
          <Flow>
            {row.map(cell => (
              <Image url={renderCell(cell)} width={cellSize} height={cellSize} />
            ))}
          </Flow>
        )
      })}
    </Flow>
  )
}

const TargetsUi = () =>
  mapData.targets.map(item => (
    <Flow x={item.x * cellSize} y={item.y * cellSize} width={cellSize} height={cellSize} flowAlign="center">
      <Image url={dropPoint} width={cellSize / 2} height={cellSize / 2} />
    </Flow>
  ))
const BoxesUi = () =>
  mapData.boxes.map(item => (
    <Image
      id={item.id}
      x={item.x * cellSize}
      y={item.y * cellSize}
      url={crateSheet0}
      width={cellSize}
      height={cellSize}
    />
  ))

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
    </Flow>
  )
}

const App = (
  <Flow flow="y">
    <PlayZoneUi />
    <CtrlUi />
  </Flow>
)

export default App

console.log(App)
