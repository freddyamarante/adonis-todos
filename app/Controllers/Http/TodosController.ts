import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index () {
    return Todo.query().preload('contact')
  }

  public async findByTitle(title: string) {
    return Todo.query().where('title', 'like', `%${title}%`).preload('contact')
  }

  public async create (data: Record<string, any>) { 
    const contactId = data.contactId
    const todo = new Todo()

    if (!!contactId) {
      await todo.associateContact(contactId)
      await todo.load('contact')
    }

    todo.title = data.title ?? ''
    todo.description = data.description ?? ''
    todo.location = data.location ?? ''
    todo.date = data.date ?? ''
    todo.completed = data.completed ?? ''

    await todo.save()

    return todo

  }

  public async show ({}: HttpContextContract) {
  }

  public async update (data: Record<string, any>) {
    const todo = await Todo.findByOrFail('id', data.id)

    if (data.contactId !== null) {
      await todo.associateContact(data.contactId)
      delete data.contactId
    }

    if (data.contactId === null) {
      await todo.related('contact').dissociate()
      delete data.contactId
    }

    await todo.merge(data).save()
    await todo.load('contact')
    return todo
  }

  public async destroy (id: number) {
    const todo = await Todo.findByOrFail('id', id)
    return await todo.delete()
  }

  
}

