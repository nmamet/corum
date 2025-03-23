import helmet from "@fastify/helmet";
import Fastify from "fastify";
import { ZodError } from "zod";

import { DuplicateResourceError } from "./errors.ts";
import { createUser } from "./users/domainLogic.ts";
import userPersistence from "./users/persistence.ts";

const server = Fastify();

server.register(helmet);

server.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    if (isProd()) {
      reply.status(400).send("Bad request");
    } else {
      reply.status(400).send(error);
    }
  } else if (error instanceof DuplicateResourceError) {
    reply.status(409).send(error);
  } else if (isProd()) {
    reply.status(500).send("An unknown error happened");
  } else {
    reply.status(500).send(error);
  }
});

server.get("/users", async function (_request, reply) {
  reply.send(await userPersistence.getAllUsersInfo());
});

server.post("/users", async function (request, reply) {
  reply.send(await createUser(request.body));
});

function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

export default server;
