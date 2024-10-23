import Button from '@/components/Button'
import { Flow } from '@leafer-in/flow'
import { Box, IUI, Leafer, PointerEvent, Rect, Text } from 'leafer-ui'
import MyEventTarget from '../event/MyEventTarget'
import { closestById, uuid } from '@/utils'
import CheckBox from '@/components/CheckBox'

export enum Event_Type {
  addItem = 'addItem',
  toggleCheckItem = 'toggleCheckItem'
}

class View extends MyEventTarget {
  constructor(root: HTMLElement) {
    super()

    this.leafer = new Leafer({ view: root })

    const App = () => {
      const cb = CheckBox({
        defaultValue: false,
        onChange: bool => {
          console.log(bool)

          cb.updateUi(bool)
        }
      })

      return (
        <Flow flow="y" padding={30}>
          <Flow flow="y" gap={10}>
            <Box>
              <Button onClick={() => this.emit(Event_Type.addItem, uuid())}>添加 todo</Button>
            </Box>

            <Flow flowAlign="center" gap={10}>
              {cb.Ui}
              <Text text="剩余 3 个"></Text>
              <Button>所有</Button>
              <Button>未完成</Button>
              <Button>已完成</Button>
            </Flow>
          </Flow>

          <Flow id="todoWrapper" flow="y" gap={10} padding={10}></Flow>
        </Flow>
      )
    }

    const app = <App />
    this.todoWrapper = app.findId('todoWrapper')

    this.leafer.add(app)
  }

  leafer: Leafer
  todoWrapper: Flow

  renderList(todoList: Todo[]) {
    const todoUi = todoList.map(item => (
      <Flow id={item.id} flowAlign="center" gap={10}>
        <Flow
          id="checkWrapper"
          cursor="pointer"
          width={20}
          height={20}
          flowAlign="center"
          stroke="#333"
          fill="transparent"
          event={{
            [PointerEvent.CLICK]: evt => {
              this.emit(Event_Type.toggleCheckItem, item)
            }
          }}
        >
          {item.done ? <CheckIcon /> : null}
        </Flow>

        <Text id="content" text={item.content}></Text>
      </Flow>
    ))

    this.todoWrapper.removeAll()
    this.todoWrapper.addMany(...todoUi)
  }

  renderItemDone(item: Todo) {
    const itemUi = this.todoWrapper.findId(item.id)
    if (item.done) {
      itemUi.findId('checkWrapper').add(<CheckIcon />)
      itemUi.findId('content').set({ textDecoration: 'delete' })
    } else {
      ;(itemUi.findId('checkWrapper') as Flow).removeAll()
      itemUi.findId('content').set({ textDecoration: undefined })
    }
  }
}

export default View

const CheckIcon = () => {
  return <Rect width={10} height={10} fill="#555"></Rect>
}
