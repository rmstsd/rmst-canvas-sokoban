interface Todo {
  id?: string
  title: string
  completed: boolean
}

class Model {
  constructor() {}

  todoList: Todo[] = [
    {
      title: 'asd',
      completed: false,
      id: 'dfdfgfg'
    }
  ]

  create(title: string) {
    const newItem = { title, completed: false }

    this.save(newItem)
  }

  update(id, { completed }) {
    const item = this.todoList.find(todo => todo.id === id)
    item.completed = completed
  }

  getCount() {
    const stats = { active: 0, completed: 0, total: 0 }

    for (let todo of this.todoList) {
      if (todo.completed) stats.completed++
      else stats.active++

      stats.total++
    }

    return stats
  }

  read(query, callback) {
    const queryType = typeof query

    if (queryType === 'function') {
      callback = query
      callback(this.todoList)
    } else if (queryType === 'string' || queryType === 'number') {
      query = parseInt(query, 10)
      this.find({ id: query }, callback)
    } else {
      this.find(query, callback)
    }
  }

  private save(updateData: Todo) {
    if (!updateData.id) {
      updateData.id = crypto.randomUUID()

      this.todoList.push(updateData)
    }

    console.log('Todo saved', this.todoList)
  }

  private find(query, callback) {
    if (!callback) return

    callback(
      this.todoList.filter(todo => {
        for (let q in query) {
          if (query[q] !== todo[q]) return false
        }

        return true
      })
    )
  }
}

export default Model
