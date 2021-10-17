import Contact from "App/Models/Contact"

export default class ContactsController {
  public async index() {
    return Contact.all()
  }

  public async findByName(name: string) {
    return Contact.findBy('name', name)
  }

  public async create(contact: Record<string, any>) {
    return Contact.create(contact)
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
