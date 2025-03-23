import helmet from "@fastify/helmet";
import Fastify from "fastify";

import userPersistence from "./users/persistence.ts";

const server = Fastify();

server.register(helmet);

server.get("/users", async function (_request, reply) {
  try {
    reply.send(await userPersistence.getAllUsersInfo());
  } catch (error: unknown) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("An unknown error happened");
    }
    throw error;
  }
});

export default server;
