import knex from "knex";

import type { Knex } from "knex";

type Connection = { connection: Knex; destroy: () => Promise<void> };

export const getConnection: () => Connection = (() => {
  let connection: Knex;
  return () => {
    if (connection === undefined) {
      connection = knex({
        client: "sqlite3",
        connection: {
          filename: "../corum.db",
        },
        useNullAsDefault: true,
      });
    }
    return { connection, destroy: connection.destroy.bind(connection) };
  };
})();
