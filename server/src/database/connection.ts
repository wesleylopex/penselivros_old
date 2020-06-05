import knex from "knex";

const connection = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "penselivros",
  },
  useNullAsDefault: true,
});

export default connection;
