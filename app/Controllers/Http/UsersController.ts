// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async create(user: Record<string, any>) {
    return User.create(user)
  }
}
