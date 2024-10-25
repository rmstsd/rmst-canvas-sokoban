import Button from '@/components/Button'
import { Flow } from '@leafer-in/flow'
import { Box, Text } from 'leafer-ui'
import Edit from './Edit'
import PlayZoneUi from '@/components/PlayZoneUi'
import GameStore from '@/store/store'

const CtrlUi = ({ gameStore }) => {
  return (
    <Flow x={100} y={100}>
      <Button id="prev-level">上一关</Button>
      <Text id="level" fontSize={16} text="当前关卡：1" fill="black" padding={[10, 20]} />
      <Button id="next-level">下一关</Button>

      <Button
        onClick={() => gameStore.editMap()}
      >
        编辑地图
      </Button>
    </Flow>
  )
}

const Play = ({ gameStore }: { gameStore: GameStore }) => {
  return (
    <Flow flow="y">
      <CtrlUi gameStore={gameStore} />
      <PlayZoneUi mapData={gameStore.gameMap.mapData} />
    </Flow>
  )
}

export default Play
