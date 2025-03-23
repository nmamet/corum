import server from "./server.ts";

server.listen({ port: 3000 }, function (err) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
