import './todo.less'

import Controller from './Controller'
import Model from './Model'
import View from './View'

class Todo {
  constructor(root: Element) {
    this.model = new Model()
    this.view = new View(root)
    this.controller = new Controller(this.model, this.view)
  }

  model: Model
  view: View
  controller: Controller
}

const onLoad = () => {
  const todo = new Todo(document.querySelector('#root'))
  todo.controller.setFilterType('All')
}

window.addEventListener('load', onLoad)
