import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("categories").insert([
    {
      is_active: true,
      title: "Política",
    },
  ]);
}
