let uniqueID = 1

let memoryStorage = {}

class Store {
  constructor(name) {
    this._dbName = name

    if (!memoryStorage[name]) {
      const data = { todos: [] }
      memoryStorage[name] = JSON.stringify(data)
    }
  }

  _dbName: string

  save(updateData) {
    updateData.id = uniqueID++

    const data = JSON.parse(memoryStorage[this._dbName])
    const { todos } = data

    todos.push(updateData)
    memoryStorage[this._dbName] = JSON.stringify(data)
  }

  findAll(callback) {
    if (!callback) return

    callback(JSON.parse(memoryStorage[this._dbName]).todos)
  }

  find(query, callback) {
    if (!callback) return

    const { todos } = JSON.parse(memoryStorage[this._dbName])

    callback(
      todos.filter(todo => {
        for (let q in query) {
          if (query[q] !== todo[q]) return false
        }

        return true
      })
    )
  }
}

export default Store
