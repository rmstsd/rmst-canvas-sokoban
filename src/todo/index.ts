import './todo.less'

import Controller from './Controller'
import Model from './Model'
import Store from './Store'
import View from './View'

console.log('todo')

class Todo {
  constructor(name: string) {
    this.storage = new Store(name)
    this.model = new Model(this.storage)
    // this.template = new Template()
    this.view = new View()
    this.controller = new Controller(this.model, this.view)
  }

  storage: Store
  model: Model
  template
  view: View
  controller: Controller
}

let todo: Todo

const onHashChange = () => {
  todo.controller.setView(document.location.hash)
}

const onLoad = () => {
  todo = new Todo('javascript-es6-webpack')
  onHashChange()
}

window.addEventListener('load', onLoad)
window.addEventListener('hashchange', onHashChange)
