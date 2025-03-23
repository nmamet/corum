import Fastify from "fastify";

const fastify = Fastify({
  logger: true, // TODO remove logger
});

// Declare a route
fastify.get("/", function (_request, reply) {
  reply.send({ hello: "world" });
});

fastify.listen({ port: 3000 }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
