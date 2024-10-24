import Model from './Model'
import View, { Event_Type } from './View'

class Controller {
  constructor(public model: Model, public view: View) {
    view.on(Event_Type.addItem, this.addItem.bind(this))
    view.on(Event_Type.toggleCheckItem, this.doneItem.bind(this))
    view.on(Event_Type.removeItem, this.removeItem.bind(this))

    view.on(Event_Type.toggleCheckAll, this.doneAll.bind(this))
    view.on(Event_Type.filterBtn, this.setFilterType.bind(this))
  }

  filterType: FilterType = 'all'

  setFilterType(type: FilterType) {
    console.log('filterType', type)
    this.filterType = type
    this.filter()
  }

  addItem(content: Todo['content']) {
    this.model.addTodo(content)

    this.filter()
  }

  doneItem(item: Todo) {
    item.done = !item.done

    this.handleCheckAll()
    this.view.renderItemDone(item)
  }

  removeItem(item: Todo) {
    this.model.removeTodo(item.id)

    this.filter()
  }

  doneAll(done: boolean) {
    this.model.todoList.forEach(item => {
      item.done = done
    })

    this.filter()
  }

  filter() {
    let filteredTodoList: Todo[]
    if (this.filterType === 'all') {
      filteredTodoList = this.model.todoList
    } else if (this.filterType === 'done') {
      filteredTodoList = this.model.todoList.filter(item => item.done)
    } else if (this.filterType === 'undone') {
      filteredTodoList = this.model.todoList.filter(item => !item.done)
    }

    this.handleCheckAll()
    this.view.renderList(filteredTodoList)
  }

  handleCheckAll() {
    const stats = this.model.getCount()
    this.view.renderCheckAll(stats)
  }
}

export default Controller
