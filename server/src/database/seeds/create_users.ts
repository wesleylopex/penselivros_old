import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("users").insert([
    {
      is_admin: true,
      name: "Wesley",
      username: "wesley",
      password: "12345678",
      image: null,
    },
  ]);
}
