import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index (userId) {
    return Todo.query().where('user_id', userId).preload('user').preload('contact')
  }

  public async findByTitle(userId: number, title: string) {
    return Todo.query().where('title', 'like', `%${title}%`).where('user_id', userId).preload('contact')
  }

  public async create (userId: number, data: Record<string, any>) { 
    const contactId = data.contactId
    const todo = new Todo()

    todo.fill(data)

    if (!!contactId) {
      await todo.associateContact(contactId)
      await todo.load('contact')
    }

    if (!!userId) {
      await todo.associateUser(userId)
      await todo.load('user')
    }

    await todo.save()

    return todo
  }

  public async show ({}: HttpContextContract) {
  }

  public async update (userId: number, data: Record<string, any>) {
    const todo = await Todo.findByOrFail('id', data.id)

    if (data.contactId !== null) {
      await todo.associateContact(data.contactId)
      delete data.contactId
    }

    if (data.contactId === null) {
      await todo.related('contact').dissociate()
      delete data.contactId
    }

    if (!!userId) {
      await todo.associateUser(userId)
      await todo.load('user')
    }

    await todo.merge(data).save()
    await todo.load('contact')
    return todo
  }

  public async destroy (userId: number, id: number) {
    const todo = await Todo.findByOrFail('id', id)

    if (userId === todo.userId) {
      return await todo.delete()
    } else {
      return 'Not allowed'
    }
  }
}


