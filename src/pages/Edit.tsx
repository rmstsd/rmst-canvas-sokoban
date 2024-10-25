import Button from '@/components/Button'
import PlayZoneUi from '@/components/PlayZoneUi'
import EditStore from '@/store/editStore'
import { CellType } from '@/type'
import { findById } from '@/utils'
import { Flow } from '@leafer-in/flow'

const Edit = ({ editStore }: { editStore: EditStore }) => {
  const Buttons: Flow = (
    <Flow>
      <Button id={CellType.Floor} onClick={() => updateButtons(CellType.Floor)}>
        地板
      </Button>
      <Button id={CellType.Wall} onClick={() => updateButtons(CellType.Wall)}>
        墙
      </Button>
      <Button id={CellType.Player} onClick={() => updateButtons(CellType.Player)}>
        玩家
      </Button>
      <Button id={CellType.Box} onClick={() => updateButtons(CellType.Box)}>
        箱子
      </Button>
      <Button id={CellType.Target} onClick={() => updateButtons(CellType.Target)}>
        放置点
      </Button>
    </Flow>
  )

  const updateButtons = (cellType: CellType) => {
    editStore.setCellType(cellType)

    Buttons.children.forEach(item => {
      item.set({ fill: '#0264dc' })
    })
    findById(Buttons, cellType)?.set({ fill: 'red' })
  }

  const ui: Flow = (
    <Flow x={0} y={0} width={window.innerWidth} height={window.innerHeight} fill="rgba(0,0,0,0.5)" flowAlign="center">
      <Flow flow="y" width={window.innerWidth - 200} height={window.innerHeight - 200} fill="white" padding={10}>
        <Flow>
          {Buttons}
          <Button onClick={() => ui.remove()}>ok</Button>
        </Flow>

        <Flow>
          <PlayZoneUi mapData={editStore.gameMap.mapData} />
        </Flow>
      </Flow>
    </Flow>
  )

  return ui
}

export default Edit
