import Knex from "knex";

export async function seed(knex: Knex) {
  await knex("users").insert([
    {
      is_admin: false,
      name: "Wesley",
      username: "teste1224",
      password: "12345678",
      image: "fake-img",
    },
  ]);
}
