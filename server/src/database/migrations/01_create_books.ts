import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("books", (table) => {
    table.increments().primary();
    table.string("title").notNullable();
    table.string("author").notNullable();
    table.string("image").notNullable();

    table.integer("user_id").references("id").inTable("users");

    table.timestamp("reserved_at");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable("books");
}
