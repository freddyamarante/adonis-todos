import Route from '@ioc:Adonis/Core/Route'
import TodosController from 'App/Controllers/Http/TodosController'
import TodoValidator from 'App/Validators/TodoValidator'

Route.get('todos', ({ request }) => {
    let title = request.input('title')
  
    if (title) {
      return new TodosController().findByTitle(title)
    }
  
    return new TodosController().index()
})
  
Route.post('todos', async ({ request }) => {
    await request.validate(TodoValidator)
    let todoData = request.body()
    return new TodosController().create(todoData)
})
  
Route.delete('todos/:id', async ({ params }) => {
    let todoId = params.id
    
    return new TodosController().destroy(todoId)
})
  
Route.put('todos', async ({ request }) => {
    await request.validate(TodoValidator)
    let todoData = request.body()
  
    return new TodosController().update(todoData)
})