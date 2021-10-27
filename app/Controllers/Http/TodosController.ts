import { Exception } from '@poppinss/utils'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index(userId) {
    return Todo.query().where('user_id', userId).preload('user').preload('contact')
  }

  public async show(userId, todoId) {
    try {
      const todo = await Todo.query()
        .where('user_id', userId)
        .where('id', todoId)
        .preload('user')
        .preload('contact')
        .firstOrFail()
      return todo
    } catch (e) {
      throw new Exception('Esta agenda no existe', 404)
    }
  }

  public async findByTitle(userId: number, title: string) {
    return Todo.query()
      .where('title', 'like', `%${title}%`)
      .where('user_id', userId)
      .preload('contact')
  }

  public async findByCompleted(userId: number, completed: boolean) {
    return Todo.query()
      .where('completed', completed)
      .where('user_id', userId)
      .preload('contact')
      .preload('user')
  }

  public async create(userId: number, data: Record<string, any>) {
    const contactId = data.contactId
    const todo = new Todo()

    await todo.fill(data)

    if (userId) {
      await todo.associateUser(userId)
      await todo.load('user')
    }

    if (contactId) {
      await todo.associateContact(contactId)
      await todo.load('contact')
    }

    await todo.save()

    return todo
  }

  public async update(userId: number, data: Record<string, any>) {
    const todo = await Todo.findByOrFail('id', data.id)

    if (userId) {
      await todo.associateUser(userId)
      await todo.load('user')
    }

    if (data.contactId !== null) {
      await todo.associateContact(data.contactId)
      delete data.contactId
    }

    if (data.contactId === null) {
      await todo.related('contact').dissociate()
      delete data.contactId
    }

    if (userId) {
      await todo.associateUser(userId)
      await todo.load('user')
    }

    await todo.merge(data).save()
    await todo.load('contact')
    return todo
  }

  public async destroy(userId: number, id: number) {
    const todo = await Todo.findByOrFail('id', id)

    if (userId === todo.userId) {
      return await todo.delete()
    } else {
      throw new Exception('Not allowed')
    }
  }
}
