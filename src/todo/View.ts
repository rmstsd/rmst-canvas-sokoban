import { $on, qs } from './helpers'

class View {
  constructor() {
    const initialHtml = `
    <section class="todoapp" style="padding: 30px;"><header class="header"><h1>todos</h1><input class="new-todo" placeholder="What needs to be done?" autofocus=""></header><main class="main" style="display: none;"><div class="toggle-all-container"><input class="toggle-all" type="checkbox"> <label class="toggle-all-label" for="toggle-all">Mark all as complete</label></div><ul class="todo-list">
      </ul></main><footer class="footer" style="display: none;"><span class="todo-count"><strong>0</strong> items left</span><ul class="filters"><li><a href="#/" class="selected">All</a></li><li><a href="#/active">Active</a></li><li><a href="#/completed">Completed</a></li></ul><button class="clear-completed" style="display: none;"></button></footer></section>
    `

    document.querySelector('#root').innerHTML = initialHtml

    this.$todoList = qs('.todo-list')
    this.$todoItemCounter = qs('.todo-count')
    this.$clearCompleted = qs('.clear-completed')
    this.$main = qs('.main')
    this.$footer = qs('.footer')
    this.$toggleAllInput = qs('.toggle-all')
    this.$toggleAll = qs('.toggle-all-label')
    this.$newTodo = qs('.new-todo')
  }

  $todoList
  $todoItemCounter
  $clearCompleted
  $main
  $footer
  $toggleAllInput
  $toggleAll
  $newTodo

  bindCallback(evt: string, handler: Function) {
    switch (evt) {
      case 'newTodo': {
        $on(this.$newTodo, 'change', () => handler(this.$newTodo.value))
        break
      }
      case '': {
        break
      }

      default: {
        break
      }
    }
  }

  render(viewCmd, parameter?) {
    switch (viewCmd) {
      case 'showEntries': {
        this.$todoList.innerHTML = show(parameter)
        break
      }
      case 'clearNewTodo': {
        this.$newTodo.value = ''
        break
      }
      case 'updateElementCount': {
        this.$todoItemCounter.innerHTML = itemCounter(parameter)
        break
      }
      case 'clearCompletedButton': {
        this.$clearCompleted.innerHTML = clearCompletedButton(parameter.completedCount)
        this.$clearCompleted.style.display = parameter.visible ? 'block' : 'none'
        break
      }

      case 'toggleAll': {
        this.$toggleAllInput.checked = parameter.checked
        break
      }
      case 'contentBlockVisibility': {
        this.$main.style.display = this.$footer.style.display = parameter.visible ? 'block' : 'none'
        break
      }
      default: {
        break
      }
    }
  }
}

export default View

const itemCounter = (activeTodos: number) => {
  const plural = activeTodos === 1 ? '' : 's'
  return `<strong>${activeTodos}</strong> item${plural} left`
}

const clearCompletedButton = completedTodos => {
  return completedTodos > 0 ? 'Clear completed' : ''
}

const htmlEscapes = {
  '&': '&amp',
  '<': '&lt',
  '>': '&gt',
  '"': '&quot',
  "'": '&#x27',
  '`': '&#x60'
}

const reUnescapedHtml = /[&<>"'`]/g
const reHasUnescapedHtml = new RegExp(reUnescapedHtml.source)

const escape = str => (str && reHasUnescapedHtml.test(str) ? str.replace(reUnescapedHtml, escapeHtmlChar) : str)
const escapeHtmlChar = chr => htmlEscapes[chr]

const createTodoItem = ({ id, title, completed, checked, index }) => `
<li data-id="${id}" class="${completed}">
    <div class="view">
        <input class="toggle" type="checkbox" ${checked}>
        <label>${title}</label>
        <button class="destroy">x</button>
    </div>
</li>
`

const show = data => {
  let view = ''

  data.reverse().forEach((item, index) => {
    view += createTodoItem({
      id: item.id,
      title: escape(item.title),
      completed: item.completed ? 'completed' : '',
      checked: item.completed ? 'checked' : '',
      index: index
    })
  })

  return view
}
