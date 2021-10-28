import Route from '@ioc:Adonis/Core/Route'
import TodosController from 'App/Controllers/Http/TodosController'
import TodoValidator from 'App/Validators/TodoValidator'

const baseRoute = 'todos'

Route.get(baseRoute, async ({ auth, request }) => {
  await auth.use('api').authenticate()
  let title = request.input('title')
  let completed = request.input('completed')

  if (completed) {
    return new TodosController().findByCompleted(auth.user.id, completed)
  }

  if (title) {
    return new TodosController().findByTitle(auth.user.id, title)
  }

  return new TodosController().index(auth.user.id)
})

Route.get(`${baseRoute}/:id`, async ({ auth, params }) => {
  await auth.use('api').authenticate()

  return new TodosController().show(auth.user.id, params.id)
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

  return new TodosController().destroy(auth.user.id, todoId)
})

Route.put(baseRoute, async ({ auth, request }) => {
  await auth.use('api').authenticate()
  await request.validate(TodoValidator)
  let todoData = request.body()

  return new TodosController().update(auth.user.id, todoData)
})
