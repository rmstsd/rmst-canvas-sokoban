import Controller from './Controller'
import Model from './Model'
import View from './View'

const root = document.getElementById('root')

class Todo {
  constructor(root: HTMLElement) {
    this.model = new Model()
    this.view = new View(root)
    this.controller = new Controller(this.model, this.view)
  }

  model: Model
  view: View
  controller: Controller
}

const todo = new Todo(root)

console.log(todo)

todo.controller.setFilterType('All')
