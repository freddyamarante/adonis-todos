import Route from '@ioc:Adonis/Core/Route'

import UsersController from 'App/Controllers/Http/UsersController'

const baseRoute = 'users'

Route.post('login', async ({ auth, request, response }) => {
    const email = request.input('email')
    const password = request.input('password')
  
    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  })
  

Route.post(baseRoute, async ({ request }) => {
    let userData = request.body()
    return new UsersController().create(userData)
})


Route.get('checklogin', async ({ auth }) => {
  await auth.use('api').authenticate()
  return auth.user!
})

Route.post('/logout', async ({ auth, response }) => {
  await auth.use('api').revoke()
  return {
    revoked: true
  }
})


