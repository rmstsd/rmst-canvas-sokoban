import Button from '@/components/Button'
import { Flow } from '@leafer-in/flow'
import { Box, Text } from 'leafer-ui'
import Edit from './Edit'
import { gameStore } from '@/store/store'
import PlayZoneUi from '@/components/PlayZoneUi'

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
          const ed = <Edit />
          gameStore.leafer.add(ed)
        }}
      >
        编辑地图
      </Button>
    </Flow>
  )
}

const Play = () => {
  return (
    <Flow flow="y">
      <CtrlUi />
      <PlayZoneUi />
    </Flow>
  )
}

export default Play
