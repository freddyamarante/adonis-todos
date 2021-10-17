import Client from 'App/Models/Client'

export default class ClientsController {
  public async index() {
    return Client.all()
  }

  public async findByName(name: string) {
    return Client.findBy('name', name)
  }

  public async create(client: Record<string, any>) {
    return Client.create(client)
  }
}
