import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("categories", (table) => {
    table.increments().primary();

    table.string("title").notNullable();
    table.boolean("is_active").defaultTo(true);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable("categories");
}
