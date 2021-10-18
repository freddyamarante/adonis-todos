import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Contact from './Contact'
import { Exception } from '@poppinss/utils'
import User from './User'

export default class Todo extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public contactId: string

  @column()
  public location: string

  @column()
  public date: string

  @column()
  public completed: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Contact)
  public contact: BelongsTo<typeof Contact>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  public async associateContact(contactId) {
    try {
      const contact = await Contact.findByOrFail('id', contactId)
      return await this.related('contact').associate(contact)
    } catch(exception: any) {
      throw new Exception('El contacto no existe')
    }
  }
}

//
