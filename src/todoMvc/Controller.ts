import Model from './Model'
import View from './View'

export type FilterType = 'All' | 'Active' | 'Completed'

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.view.bindCallback('newTodo', title => this.addItem(title))
    // this.view.bindCallback('itemEdit', item => this.editItem(item.id))
    // this.view.bindCallback('itemEditDone', item => this.editItemSave(item.id, item.title))
    // this.view.bindCallback('itemEditCancel', item => this.editItemCancel(item.id))
    this.view.bindCallback('itemRemove', item => this.removeItem(item.id))
    this.view.bindCallback('itemToggle', item => this.toggleComplete(item.id, item.completed))
    this.view.bindCallback('removeCompleted', () => this.removeCompletedItems())
    this.view.bindCallback('toggleAll', completed => this.toggleAll(completed))
    this.view.bindCallback('filterBtn', (type: FilterType) => this.setFilterType(type))
  }

  model: Model
  view: View

  filterType: FilterType
  setFilterType(type: FilterType) {
    this.filterType = type

    this._filter()

    this.view.renderFilterTypeBtn(type)
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
        this.toggleComplete(item.id, completed, true)
      }

      this._filter()
    })
  }

  toggleComplete(id: number, completed: boolean, silent?) {
    this.model.update(id, { completed })
    this.view.renderElementComplete({ id, completed })

    if (!silent) {
      this._filter()
    }
  }

  removeCompletedItems() {
    this.model.todoList = this.model.todoList.filter(item => !item.completed)

    this._filter()
  }

  removeItem(id: string) {
    this.model.todoList = this.model.todoList.filter(item => item.id !== id)
    this._filter()
  }

  showAll() {
    this.model.read({}, data => this.view.render('showEntries', data))
  }

  showActive() {
    this.model.read({ completed: false }, data => this.view.render('showEntries', data))
  }

  showCompleted() {
    this.model.read({ completed: true }, data => this.view.render('showEntries', data))
  }

  _filter() {
    this._updateCount()
    console.log(this.filterType)
    this[`show${this.filterType}`]()
  }

  _updateCount() {
    const todos = this.model.getCount()

    const completed = todos.completed
    const visible = completed > 0
    const checked = completed === todos.total

    this.view.render('updateElementCount', todos.active)
    this.view.render('clearCompletedButton', { completed, visible })
    this.view.render('toggleAll', { checked })
    this.view.render('contentBlockVisibility', { visible: todos.total > 0 })
  }
}

export default Controller
