import Button from '@/components/Button'
import { Flow } from '@leafer-in/flow'
import { Box, IUI, Leafer, PointerEvent, Rect, Text } from 'leafer-ui'
import MyEventTarget from '../event/MyEventTarget'
import { closestById, uuid } from '@/utils'
import CheckBox from '@/components/CheckBox'

export enum Event_Type {
  addItem = 'addItem',
  removeItem = 'removeItem',
  toggleCheckItem = 'toggleCheckItem',

  toggleCheckAll = 'toggleCheckAll',
  filterBtn = 'filterBtn'
}

class View extends MyEventTarget {
  constructor(root: HTMLElement) {
    super()

    this.leafer = new Leafer({ view: root })

    const App = () => {
      const checkAll = <CheckBox onChange={bool => this.emit(Event_Type.toggleCheckAll, bool)} />
      this.checkAll = checkAll
      const remain = <Text text="剩余 3 个"></Text>
      this.remain = remain

      return (
        <Flow flow="y" padding={30}>
          <Flow flow="y" gap={10}>
            <Box>
              <Button onClick={() => this.emit(Event_Type.addItem, uuid())}>添加 todo</Button>
            </Box>

            <Flow flowAlign="center" gap={10}>
              {checkAll}
              <Text text="使所有都完成 | "></Text>
              {remain}
              <Button id="all" className="filterBtn" onClick={() => this.emit(Event_Type.filterBtn, 'all')}>
                所有
              </Button>
              <Button id="undone" className="filterBtn" onClick={() => this.emit(Event_Type.filterBtn, 'undone')}>
                未完成
              </Button>
              <Button id="done" className="filterBtn" onClick={() => this.emit(Event_Type.filterBtn, 'done')}>
                已完成
              </Button>
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
  checkAll: Flow
  remain: Text

  renderList(todoList: Todo[]) {
    const todoUi = todoList.map(item => (
      <Flow id={item.id} flowAlign="center" gap={10}>
        <CheckBox defaultValue={item.done} onChange={() => this.emit(Event_Type.toggleCheckItem, item)} />
        <Text id="content" text={item.content} textDecoration={item.done ? 'delete' : undefined}></Text>
        <Button onClick={() => this.emit(Event_Type.removeItem, item)}>删除</Button>
      </Flow>
    ))

    this.todoWrapper.removeAll()
    this.todoWrapper.addMany(...todoUi)
  }

  renderItemDone(item: Todo) {
    const itemUi = this.todoWrapper.findId(item.id)
    if (item.done) {
      itemUi.findId('content').set({ textDecoration: 'delete' })
    } else {
      itemUi.findId('content').set({ textDecoration: undefined })
    }
  }

  renderCheckAll(stats) {
    const bool = stats.total === stats.done

    this.checkAll.data.update(bool)
    this.remain.set({ text: `剩余 ${stats.total - stats.done} 个` })
  }
}

export default View
