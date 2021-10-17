import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index () {
    return Todo.all()
  }

  public async findByTitle(title: string) {
    return Todo.findBy('title', title)
  }

  public async create (todo: Record<string, any>) {
    return Todo.create(todo)
  }

  public async show ({}: HttpContextContract) {
  }

  public async update (data: Record<string, any>) {
    const todo = await Todo.findByOrFail('id', data.id)

    return await todo.merge(data).save()
  }

  public async destroy (id: number) {
    const todo = await Todo.findByOrFail('id', id)
    return await todo.delete()
  }
}
