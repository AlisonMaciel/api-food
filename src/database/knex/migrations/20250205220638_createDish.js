exports.up = knex => knex.schema.createTable("dish", table => {
    table.increments("id"),
    table.text("name").notNullable(),
    table.text("price").notNullable(),
    table.text("description"),
    table.enum("category", ["Refeição", "Bebidas", "Sobremesas"]).notNullable(),
    table.text("avatar_dish")
})

exports.down = knex => knex.schema.dropTable("dish")