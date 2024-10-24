let id = 1
class Model {
  todoList: Todo[] = [
    { id: '3', content: '3333', done: true },
    { id: '4', content: '4444', done: true },
    { id: '5', content: '5555', done: true },
    { id: '6', content: '6666', done: false },
    { id: '7', content: '7777', done: false }
  ]

  addTodo(content: Todo['content']) {
    const _id = String(id++)
    this.todoList.push({ id: _id, content: _id.repeat(4), done: false })

    console.log(this.todoList)
  }

  removeTodo(id: Todo['id']) {
    const index = this.todoList.findIndex(todo => todo.id === id)
    if (index !== -1) {
      this.todoList.splice(index, 1)
    }
  }

  getCount() {
    const stats = { unDone: 0, done: 0, total: this.todoList.length }

    for (let todo of this.todoList) {
      if (todo.done) {
        stats.done++
      } else {
        stats.unDone++
      }
    }

    return stats
  }
}

export default Model
