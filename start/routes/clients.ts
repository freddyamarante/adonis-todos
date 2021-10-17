import Route from '@ioc:Adonis/Core/Route'
import ClientsController from 'App/Controllers/Http/ClientsController'
import ClientValidator from 'App/Validators/ClientValidator'

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
  