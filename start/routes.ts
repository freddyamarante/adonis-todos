/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import ClientsController from 'App/Controllers/Http/ClientsController'
import TodosController from 'App/Controllers/Http/TodosController'
import ClientValidator from 'App/Validators/ClientValidator'
import TodoValidator from 'App/Validators/TodoValidator'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('clients', ({ request }) => {
  let name = request.input('name')

  if (name) {
    return new ClientsController().findByName(name)
  }

  return new ClientsController().index()
})

Route.post('clients', async ({ request }) => {
  await request.validate(ClientValidator)

  let clientData = request.body()
  return new ClientsController().create(clientData)
})

// Todos Routes

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