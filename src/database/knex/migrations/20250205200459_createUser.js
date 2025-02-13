exports.up = knex => knex.schema.createTable("user", table => {
    table.increments("id"),
    table.text("name").notNullable(),
    table.text("email").notNullable(),
    table.text("password").notNullable(),

    table.enum("role", ["customer", "admin"], {useNative: true, enumName: "roles"}).notNullable().defaultTo("customer"),

    table.timestamp("updated_at").defaultTo(knex.fn.now()).notNullable(),
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
}) 

exports.down = knex => knex.schema.dropTable("user");
 