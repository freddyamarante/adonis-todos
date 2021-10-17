import Contact from "App/Models/Contact"
import Todo from "App/Models/Todo"

export default class ContactsController {
  public async index() {
    return Contact.all()
  }

  public async findByName(name: string) {
    return Contact.findBy('name', name)
  }

  public async create(client: Record<string, any>) {
    return Contact.create(client)
  }

  public async destroy (id: number) {
    const contact = await Contact.findByOrFail('id', id)
    return await contact.delete()
  }

  public async update (data: Record<string, any>) {
    const contact = await Contact.findByOrFail('id', data.id)

    return await contact.merge(data).save()
  }
}
