import Route from '@ioc:Adonis/Core/Route'
import ContactsController from 'App/Controllers/Http/ContactsController'
import ContactValidator from 'App/Validators/ContactValidator'
const baseRoute = 'contacts';

Route.get(baseRoute, ({ request }) => {
    let name = request.input('name')
  
    if (name) {
      return new ContactsController().findByName(name)
    }
  
    return new ContactsController().index()
  })
  
  Route.post(baseRoute, async ({ request }) => {
    await request.validate(ContactValidator)
  
    let clientData = request.body()
    return new ContactsController().create(clientData)
  })

  /*Route.delete('clients/:id', async ({ params }) => {
    let clientId = params.id

    return new ContactsController().destroy(clientId)
  }) */
  
  