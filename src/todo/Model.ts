import Store from './Store'

class Model {
  constructor(storage: Store) {
    this.storage = storage
  }

  storage: Store

  create(title: string) {
    const newItem = { title, completed: false }
    this.storage.save(newItem)
  }

  getCount() {
    const stats = { active: 0, completed: 0, total: 0 }

    this.storage.findAll(data => {
      for (let todo of data) {
        if (todo.completed) stats.completed++
        else stats.active++

        stats.total++
      }
    })

    return stats
  }

  read(query, callback?) {
    const queryType = typeof query

    if (queryType === 'function') {
      callback = query
      this.storage.findAll(callback)
    } else if (queryType === 'string' || queryType === 'number') {
      query = parseInt(query, 10)
      this.storage.find({ id: query }, callback)
    } else {
      this.storage.find(query, callback)
    }
  }
}

export default Model
