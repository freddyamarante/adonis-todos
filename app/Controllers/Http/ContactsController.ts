import { Exception } from '@poppinss/utils'
import Contact from 'App/Models/Contact'
import Todo from 'App/Models/Todo'

export default class ContactsController {
  public async index(userId: number) {
    return Contact.query().where('user_id', userId)
  }

  public async findByName(userId: number, name: string) {
    return Todo.query().where('name', 'like', `%${name}`).where('user_id', userId).preload('user')
  }

  public async create(userId: number, data: Record<string, any>) {
    const contact = new Contact()

    contact.fill(data)

    if (userId) {
      await contact.associateUser(userId)
      await contact.load('user')
    }

    await contact.save()

    return contact
  }

  public async destroy(userId: number, id: number) {
    const contact = await Contact.findByOrFail('id', id)

    if (userId === contact.userId) { 
      return await contact.delete()
    } else {
      throw new Exception('Not allowed')
    }
  }

  public async update(userId: number, data: Record<string, any>) {
    const contact = await Contact.findByOrFail('id', data.id)

    if (!!userId) {
      await contact.associateUser(userId)
      await contact.load('user')
    }

    return await contact.merge(data).save()
  }
}
