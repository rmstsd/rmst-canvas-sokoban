class Model {
  todoList: Todo[] = [
    { id: 'd84aa47f-8a4f-4942-9e55-ec6e47ca757d', content: 'ecbd10fe-b626-4160-aa86-f7e69b6c88ea', done: false },
    { id: '22fa7e02-9793-477a-9fc5-da0d5fafaa3b', content: 'c0928158-632b-4674-b4de-3e584bc3661f', done: false }
  ]

  addTodo(content: Todo['content']) {
    this.todoList.push({ id: crypto.randomUUID(), content, done: false })
  }
}

export default Model
