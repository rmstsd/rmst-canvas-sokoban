import Model from './Model'
import View from './View'

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.view.bindCallback('newTodo', title => this.addItem(title))
    // this.view.bindCallback('itemEdit', item => this.editItem(item.id))
    // this.view.bindCallback('itemEditDone', item => this.editItemSave(item.id, item.title))
    // this.view.bindCallback('itemEditCancel', item => this.editItemCancel(item.id))
    // this.view.bindCallback('itemRemove', item => this.removeItem(item.id))
    this.view.bindCallback('itemToggle', item => this.toggleComplete(item.id, item.completed))
    // this.view.bindCallback('removeCompleted', () => this.removeCompletedItems())
    this.view.bindCallback('toggleAll', status => this.toggleAll(status.completed))
  }

  model: Model
  view: View

  _activeRoute
  _lastActiveRoute

  setView(hash: string) {
    const route = hash.split('/')[1]
    const page = route || ''
    this._updateFilter(page)
  }

  _updateFilter(currentPage) {
    // Store a reference to the active route, allowing us to re-filter todo
    // items as they are marked complete or incomplete.
    this._activeRoute = currentPage

    if (currentPage === '') this._activeRoute = 'All'

    this._filter()

    this.view.render('setFilter', currentPage)
  }

  addItem(title: string) {
    if (title.trim() === '') {
      return
    }

    this.model.create(title)

    this.view.render('clearNewTodo')
    this._filter(true)
  }

  toggleAll(completed: boolean) {
    console.log('all', completed)
  }

  toggleComplete(id: number, completed: boolean, silent?) {
    console.log(id, completed)

    this.model.update(id, { completed })
    this.view.render('elementComplete', { id, completed })

    if (!silent) this._filter()
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

  _filter(force?) {
    const active = this._activeRoute
    const activeRoute = active.charAt(0).toUpperCase() + active.substr(1)

    // Update the elements on the page, which change with each completed todo
    this._updateCount()

    // If the last active route isn't "All", or we're switching routes, we re-create the todo item elements, calling: this.show[All|Active|Completed]()
    if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
      this[`show${activeRoute}`]()
    }

    this._lastActiveRoute = activeRoute
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
