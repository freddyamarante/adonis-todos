import Route from '@ioc:Adonis/Core/Route'
import TodosController from 'App/Controllers/Http/TodosController'
import TodoValidator from 'App/Validators/TodoValidator'

const baseRoute = 'todos'

Route.get(baseRoute, ({ request }) => {
    let title = request.input('title')
  
    if (title) {
      return new TodosController().findByTitle(title)
    }
  
    return new TodosController().index()
})
  
Route.post(baseRoute, async ({ request }) => {
    await request.validate(TodoValidator)
    let todoData = request.body()
    return new TodosController().create(todoData)
})
  
Route.delete(`${baseRoute}/:id`, async ({ params }) => {
    let todoId = params.id
    
    return new TodosController().destroy(todoId)
})
  
Route.put(baseRoute, async ({ request }) => {
    await request.validate(TodoValidator)
    let todoData = request.body()
  
    return new TodosController().update(todoData)
})