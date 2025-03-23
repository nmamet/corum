"use strict";

import knex from "knex";

const connection = knex({
  client: "sqlite3",
  connection: {
    filename: "../corum.db",
  },
  useNullAsDefault: true,
});

connection.schema
  .createTable("user", function (table) {
    table.string("email").primary();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.bigInteger("birthDate").notNullable();
    table.string("password").notNullable();
  })
  .then(console.log)
  .catch(console.log)
  .then(connection.destroy.bind(connection));
