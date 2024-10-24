import Model from './Model'
import View, { Event_Type } from './View'

class Controller {
  constructor(public model: Model, public view: View) {
    view.on(Event_Type.addItem, this.addItem.bind(this))
    view.on(Event_Type.toggleCheckItem, this.doneItem.bind(this))
    view.on(Event_Type.removeItem, this.removeItem.bind(this))

    view.on(Event_Type.toggleCheckAll, this.doneAll.bind(this))
  }

  filterType: FilterType = 'All'

  setFilterType(type: FilterType) {
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
    const filteredTodoList = this.model.todoList.filter(todo => true)

    this.handleCheckAll()
    this.view.renderList(filteredTodoList)
  }

  handleCheckAll() {
    const stats = this.model.getCount()
    this.view.renderCheckAll(stats)
  }
}

export default Controller
