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
    },
    {
      title: 'cvb',
      completed: false,
      id: 'ecd32841-827c-4614-bd3a-9c8ee1cd1071'
    },
    {
      title: '123',
      completed: false,
      id: 'f907853e-e860-46ab-a9b8-51262972eeec'
    },
    {
      title: '7567',
      completed: false,
      id: '872b999d-25c3-4f68-a529-aa9353c4b908'
    },
    {
      title: '890',
      completed: false,
      id: 'ea457a16-932a-45bf-9273-5cebab93110a'
    },
    {
      title: 'bnmm',
      completed: false,
      id: 'd299e762-f89f-4220-be4a-01e141cb6e2c'
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
