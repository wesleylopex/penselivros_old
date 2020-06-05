import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("loans", (table) => {
    table.increments().primary();

    table.integer("user_id").references("id").inTable("users");
    table.integer("book_id").references("id").inTable("books");

    table.timestamp("finished_at");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable("loans");
}
