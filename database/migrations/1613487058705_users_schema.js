'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UsersSchema extends Schema {
  up() {
    this.table('users', (table) => {
      table.date('dob');
    })
  }

  down() {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('dob');
    })
  }
}

module.exports = UsersSchema
