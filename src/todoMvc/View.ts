import { FilterType } from './Controller'
import { $delegate, $on, qs, qsa } from './helpers'

class View {
  constructor(root: Element) {
    this.root = root
    const initialHtml = `
      <section class="todoapp" style="padding: 30px">
        <header class="header">
          <input class="new-todo" placeholder="What needs to be done?" autofocus="" />

          <footer class="footer" style="display: none">
            <span class="todo-count">
              <strong>0</strong>
              items left
            </span>
            <ul class="filters">
              <li><button id="All" class="filter-btn">All</button></li>
              <li><button id="Active" class="filter-btn">Active</button></li>
              <li><button id="Completed" class="filter-btn">Completed</button></li>
            </ul>
            <button class="clear-completed" style="display: none"></button>
          </footer>
        </header>
        <main class="main" style="display: none">
          <label class="toggle-all-label">
            <input class="toggle-all" type="checkbox" />
            使所有已完成
          </label>
          <ul class="todo-list"></ul>
        </main>
        
      </section>
    `

    this.root.innerHTML = initialHtml

    this.$todoList = this.qs('.todo-list') as HTMLElement
    this.$todoItemCounter = this.qs('.todo-count') as HTMLElement
    this.$clearCompleted = this.qs('.clear-completed') as HTMLElement
    this.$main = this.qs('.main') as HTMLElement
    this.$footer = this.qs('.footer') as HTMLElement
    this.$toggleAllInput = this.qs('.toggle-all') as HTMLInputElement
    this.$toggleAllLabel = this.qs('.toggle-all-label') as HTMLLabelElement
    this.$newTodo = this.qs('.new-todo') as HTMLInputElement
  }

  qs = (selector: string) => qs(selector, this.root)
  qsa = (selector: string) => qsa(selector, this.root)

  root: Element

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
        $on(this.$toggleAllLabel, 'click', evt => {
          if (evt.target.tagName === 'LABEL') {
            return
          }
          // 点 label 时候会触发两次
          handler(this.$toggleAllInput.checked)
        })
        break
      }

      case 'removeCompleted': {
        $on(this.$clearCompleted, 'click', () => handler())
        break
      }

      case 'filterBtn': {
        qsa('.filter-btn').forEach(item => {
          $on(item, 'click', evt => {
            handler(evt.target.id)
          })
        })
        break
      }
      case 'itemRemove': {
        $delegate(this.$todoList, '.destroy', 'click', e => {
          const target: HTMLInputElement = e.target
          const item = target.closest(`[data-id]`)
          handler({ id: item.getAttribute(`data-id`) })
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

      default: {
        break
      }
    }
  }

  renderElementComplete(parameter) {
    const listItem = this.qs(`[data-id="${parameter.id}"]`)
    if (!listItem) {
      return
    }
    listItem.classList.toggle('completed')
    this.qs('input', listItem).checked = parameter.completed
  }

  renderFilterTypeBtn(filterType: FilterType) {
    this.qsa('.filter-btn').forEach(btn => btn.classList.remove('selected'))
    this.qs(`#${filterType}`).classList.add('selected')
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
        <button class="edit">编辑</button>
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
