import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Todos extends BaseSchema {
  protected tableName = 'todos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('title')
      table.text('description')
      table.integer('user_id').unsigned().references('user.id').onDelete('CASCADE')
      table.integer('contact_id').unsigned().references('contacts.id').onDelete('CASCADE')
      table.text('location')
      table.date('date')
      table.boolean('completed')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
