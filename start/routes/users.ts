import Route from '@ioc:Adonis/Core/Route'

import UsersController from 'App/Controllers/Http/UsersController'
import UserValidator from 'App/Validators/UserValidator'

const baseRoute = 'users'

Route.post('login', async ({ auth, request, response }) => {
  const email = request.input('email')
  const password = request.input('password')

  try {
    const token = await auth.use('api').attempt(email, password)
    return {
      user: auth.user,
      token: token.token,
    }
  } catch {
    return response.badRequest('Invalid credentials')
  }
})

Route.post(baseRoute, async ({ request }) => {
  let userData = request.body()
  await request.validate(UserValidator)
  return new UsersController().create(userData)
})

Route.get('checklogin', async ({ auth }) => {
  await auth.use('api').authenticate()
  return { user: auth.user }
})

Route.post('/logout', async ({ auth, response }) => {
  await auth.use('api').revoke()
  return {
    revoked: true,
  }
})
