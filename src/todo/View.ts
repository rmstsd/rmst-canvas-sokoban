import { $delegate, $on, qs } from './helpers'

class View {
  constructor() {
    const initialHtml = `
    <section class="todoapp" style="padding: 30px;"><header class="header"><h1>todos</h1><input class="new-todo" placeholder="What needs to be done?" autofocus=""></header><main class="main" style="display: none;">
        <label class="toggle-all-label"><input class="toggle-all" type="checkbox">使所有已完成</label>
      <ul class="todo-list">
      </ul></main><footer class="footer" style="display: none;"><span class="todo-count"><strong>0</strong> items left</span><ul class="filters"><li><a href="#/" class="selected">All</a></li><li><a href="#/active">Active</a></li><li><a href="#/completed">Completed</a></li></ul><button class="clear-completed" style="display: none;"></button></footer></section>
    `

    document.querySelector('#root').innerHTML = initialHtml

    this.$todoList = qs('.todo-list') as HTMLElement
    this.$todoItemCounter = qs('.todo-count') as HTMLElement
    this.$clearCompleted = qs('.clear-completed') as HTMLElement
    this.$main = qs('.main') as HTMLElement
    this.$footer = qs('.footer') as HTMLElement
    this.$toggleAllInput = qs('.toggle-all') as HTMLInputElement
    this.$toggleAllLabel = qs('.toggle-all-label') as HTMLLabelElement
    this.$newTodo = qs('.new-todo') as HTMLInputElement
  }

  $todoList: HTMLElement
  $todoItemCounter: HTMLElement
  $clearCompleted: HTMLElement
  $main: HTMLElement
  $footer: HTMLElement
  $toggleAllInput: HTMLInputElement
  $toggleAllLabel: HTMLLabelElement
  $newTodo: HTMLInputElement

  bindCallback(evt: string, handler: Function) {
    switch (evt) {
      case 'newTodo': {
        $on(this.$newTodo, 'change', () => handler(this.$newTodo.value))
        break
      }
      case 'itemToggle': {
        $delegate(this.$todoList, '.toggle', 'click', e => {
          const target: HTMLInputElement = e.target
          const item = target.closest(`[data-id]`)
          handler({ id: item.getAttribute(`data-id`), completed: e.target.checked })
        })
        break
      }

      case 'toggleAll': {
        console.log(this.$toggleAllLabel)
        $on(this.$toggleAllLabel, 'click', evt => {
          // 点 label 时候会触发两次
          handler(this.$toggleAllInput.checked)
        })
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
        this.$clearCompleted.innerHTML = clearCompletedButton(parameter.completed)
        this.$clearCompleted.style.display = parameter.visible ? 'block' : 'none'
        break
      }
      case 'toggleAll': {
        this.$toggleAllInput.checked = parameter.checked
        break
      }
      case 'contentBlockVisibility': {
        this.$main.style.display = this.$footer.style.display = parameter.visible ? '' : 'none'
        break
      }

      case 'elementComplete': {
        console.log(parameter)
        qs(`[data-id="${parameter.id}"]`).classList.toggle('completed')
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
  return `剩余: <strong>${activeTodos}</strong>.`
}

const clearCompletedButton = completedTodos => {
  return completedTodos > 0 ? '清除已完成的' : ''
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
