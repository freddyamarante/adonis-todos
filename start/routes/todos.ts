import Route from '@ioc:Adonis/Core/Route'
import TodosController from 'App/Controllers/Http/TodosController'
import TodoValidator from 'App/Validators/TodoValidator'

const baseRoute = 'todos'

Route.get(baseRoute, async ({ auth, request }) => {
    await auth.use('api').authenticate()
    let title = request.input('title')
  
    if (title) {
      return new TodosController().findByTitle(auth.user.id, title)
    }
  
    return new TodosController().index(auth.user.id)
})
  
Route.post(baseRoute, async ({ auth, request }) => {
    await auth.use('api').authenticate()
    await request.validate(TodoValidator)
    
    let todoData = request.body()
    return new TodosController().create(auth.user.id, todoData)
})
  
Route.delete(`${baseRoute}/:id`, async ({ auth, params }) => {
    await auth.use('api').authenticate()
    let todoId = params.id
    
    // TODO: VERIFY IF TODO BELONGS TO A USER

    return new TodosController().destroy(todoId)
})
  
Route.put(baseRoute, async ({ auth, request }) => {
    await auth.use('api').authenticate()
    await request.validate(TodoValidator)
    let todoData = request.body()

    // TODO: VERIFY IF TODO BELONGS TO A USER
  
    return new TodosController().update(todoData)
})