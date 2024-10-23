import Model from './Model'
import View from './View'

export type FilterType = 'All' | 'Active' | 'Completed'

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.view.bindCallback('newTodo', title => this.addItem(title))
    this.view.bindCallback('itemRemove', item => this.removeItem(item.id))
    this.view.bindCallback('itemToggle', item => this.toggleItem(item.id, item.completed))
    this.view.bindCallback('removeCompleted', () => this.removeCompletedItems())
    this.view.bindCallback('toggleAll', completed => this.toggleAll(completed))
    this.view.bindCallback('filterBtn', (type: FilterType) => this.setFilterType(type))
  }

  model: Model
  view: View

  filterType: FilterType
  setFilterType(type: FilterType) {
    this.filterType = type
    this.view.renderFilterTypeBtn(type)
    this._filter()
  }

  addItem(title: string) {
    if (title.trim() === '') {
      return
    }

    this.model.create(title)

    this.view.render('clearNewTodo')
    this._filter()
  }

  toggleAll(completed: boolean) {
    this.model.read({ completed: !completed }, data => {
      for (let item of data) {
        this.toggleItem(item.id, completed, true)
      }

      this._filter()
    })
  }

  toggleItem(id: number, completed: boolean, silent?) {
    this.model.update(id, { completed })
    this.view.renderElementComplete({ id, completed })

    this._updateCount()
  }

  removeCompletedItems() {
    this.model.todoList = this.model.todoList.filter(item => !item.completed)

    this._filter()
  }

  removeItem(id: string) {
    this.model.todoList = this.model.todoList.filter(item => item.id !== id)
    this._filter()
  }

  showList(filterType: FilterType) {
    let p
    if (filterType === 'All') {
      p = {}
    } else if (filterType === 'Active') {
      p = { completed: false }
    } else if (filterType === 'Completed') {
      p = { completed: true }
    }

    this.model.read(p, data => this.view.render('showEntries', data))
  }

  _filter() {
    this._updateCount()

    this.showList(this.filterType)
  }

  _updateCount() {
    const todos = this.model.getCount()

    const completed = todos.completed
    const visible = completed > 0
    const checked = completed === todos.total

    this.view.renderLeftCount(todos.active)
    this.view.render('clearCompletedButton', { completed, visible })
    this.view.render('toggleAll', { checked })
    this.view.render('contentBlockVisibility', { visible: todos.total > 0 })
  }
}

export default Controller
