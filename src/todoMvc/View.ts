import { FilterType } from './Controller'
import { $delegate, $on, qs, qsa } from './helpers'

import $, { noop } from 'jquery'

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
    this.$newTodoInput = this.qs('.new-todo') as HTMLInputElement

    this.on()
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
  $newTodoInput: HTMLInputElement

  evtMap = {}

  invoke(evtName, p?) {
    const func = this.evtMap[evtName] ?? noop
    func(p)
  }

  on() {
    $(this.$newTodoInput).on('change', () => this.invoke('newTodo', this.$newTodoInput.value))

    $(this.$todoList).on('click', '.toggle', e => {
      const target: HTMLInputElement = e.target
      const item = target.closest(`[data-id]`)

      this.invoke('itemToggle', { id: item.getAttribute(`data-id`), completed: e.target.checked })
    })

    $('.filter-btn').on('click', evt => {
      this.invoke('filterBtn', evt.target.id)
    })

    $(this.$toggleAllLabel).on('click', evt => {
      if (evt.target.tagName === 'LABEL') {
        return
      }

      this.invoke('toggleAll', this.$toggleAllInput.checked)
    })

    $on(this.$clearCompleted, 'click', () => this.invoke('removeCompleted'))

    $(this.$todoList).on('click', '.destroy', evt => {
      const target: HTMLInputElement = evt.target
      const item = target.closest(`[data-id]`)
      this.invoke('itemRemove', { id: item.getAttribute(`data-id`) })
    })
  }

  bindCallback(evt: string, handler: Function) {
    this.evtMap[evt] = handler
  }

  render(viewCmd, parameter?) {
    switch (viewCmd) {
      case 'showEntries': {
        this.$todoList.innerHTML = show(parameter)
        break
      }
      case 'clearNewTodo': {
        this.$newTodoInput.value = ''
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

  renderLeftCount(parameter) {
    this.$todoItemCounter.innerHTML = itemCounter(parameter)
  }

  renderElementComplete(parameter) {
    const listItem = this.qs(`[data-id="${parameter.id}"]`)

    if (!listItem) {
      return
    }
    listItem.classList.toggle('completed')
    qs('input', listItem).checked = parameter.completed
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
