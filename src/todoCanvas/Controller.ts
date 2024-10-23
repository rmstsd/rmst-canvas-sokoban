import Model from './Model'
import View, { Event_Type } from './View'

class Controller {
  constructor(public model: Model, public view: View) {
    view.on(Event_Type.addItem, this.addItem.bind(this))
    view.on(Event_Type.toggleCheckItem, this.doneItem.bind(this))
  }

  filterType: FilterType = 'All'

  setFilterType(type: FilterType) {
    this.filterType = type
    this.filter()
  }

  addItem(content: Todo['content']) {
    this.model.addTodo(content)

    this.view.renderList(this.model.todoList)
  }

  doneItem(item: Todo) {
    item.done = !item.done

    this.view.renderItemDone(item)
  }

  filter() {
    const filteredTodoList = this.model.todoList.filter(todo => true)

    this.view.renderList(filteredTodoList)
  }
}

export default Controller
