import server from "./server.ts";

const DEFAULT_PORT = "3052";
const PORT: number = parseInt(
  process.env.CORUM_SERVER_PORT ?? DEFAULT_PORT,
  10,
);

server.listen({ port: PORT }, function (err) {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
