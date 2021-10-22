import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Todo from './Todo'
import User from './User'
import { Exception } from '@poppinss/utils'
import Logger from '@ioc:Adonis/Core/Logger'

export default class Contact extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public lastname: string

  @column()
  public phone: string

  @column()
  public email: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Todo)
  public todos: HasMany<typeof Todo>

  @belongsTo(() => User)
  public users: BelongsTo<typeof User>

  public async associateUser(userId) {
    try {
      const user = await User.findByOrFail('id', userId)
      return await this.related('user').associate(user)
    } catch(exception: any) {
      //throw new Exception('El usuario no existe')
      throw exception
    }
  }
}