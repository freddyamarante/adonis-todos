import Route from '@ioc:Adonis/Core/Route'
import ContactsController from 'App/Controllers/Http/ContactsController'
import ContactValidator from 'App/Validators/ContactValidator'

const baseRoute = 'contacts';

Route.get(baseRoute, async ({ auth, request }) => {
    await auth.use('api').authenticate()
    let name = request.input('name')
  
    if (name) {
      return new ContactsController().findByName(auth.user.id, name)
    }
  
    return new ContactsController().index(auth.user.id)
  })
  
  Route.post(baseRoute, async ({ auth, request }) => {
    await auth.use('api').authenticate()
    await request.validate(ContactValidator)
  
    let contactData = request.body()
    return new ContactsController().create(auth.user.id, contactData)
  })

  Route.delete(`${baseRoute}/:id`, async ({ auth, params }) => {
    await auth.use('api').authenticate()
    let contactId = params.id

    return new ContactsController().destroy(auth.user.id, contactId)
  })

  Route.put(baseRoute, async ({ auth, request }) => {
    await auth.use('api').authenticate()
    await request.validate(ContactValidator)
    let contactData = request.body()
  
    return new ContactsController().update(contactData)
})
  
  