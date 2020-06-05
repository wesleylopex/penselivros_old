import Knex from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments().primary();
    table.boolean("is_admin").notNullable().defaultTo(false);
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    table.string("name").notNullable();
    table.string("image");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable("users");
}
