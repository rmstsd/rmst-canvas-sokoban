import './todo.less'

import Controller from './Controller'
import Model from './Model'
import View from './View'

class Todo {
  constructor() {
    this.model = new Model()
    this.view = new View()
    this.controller = new Controller(this.model, this.view)
  }

  model: Model
  view: View
  controller: Controller
}

let todo: Todo

const onHashChange = () => {
  todo.controller.setView(document.location.hash)
}

const onLoad = () => {
  todo = new Todo()
  onHashChange()
}

window.addEventListener('load', onLoad)
window.addEventListener('hashchange', onHashChange)
