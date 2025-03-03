exports.up = knex => knex.schema.createTable("payment", table => {
  table.increments("id"),
  table.decimal("value", 10, 2).notNullable()
  table.integer("user_id").references("id").inTable("user"),
  table.timestamp("date_time").defaultTo(knex.fn.now()).notNullable()
}) 


exports.down = knex => knex.schema.dropTable("payment")