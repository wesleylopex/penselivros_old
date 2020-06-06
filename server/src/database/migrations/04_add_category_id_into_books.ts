import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.alterTable("books", (table) => {
    table
      .integer("category_id")
      .notNullable()
      .defaultTo(1)
      .references("id")
      .inTable("categories");
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable("books");
}
