import helmet from "@fastify/helmet";
import Fastify from "fastify";

import userPersistence from "./users/persistence.ts";

const server = Fastify();

server.register(helmet);

server.get("/users", async function (_request, reply) {
  reply.send(await userPersistence.getAllUsersInfo());
});

export default server;
