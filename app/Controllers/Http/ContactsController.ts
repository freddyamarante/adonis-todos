import Contact from "App/Models/Contact"

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
}
