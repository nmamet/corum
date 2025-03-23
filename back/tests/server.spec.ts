import { fakeAllUsersInfo } from "./testData/users.ts";
import server from "../src/server.ts";
import userPersistence from "../src/users/persistence.ts";

describe("tests for the fastify server", () => {
  describe("tests for the users endpoints", () => {
    describe("tests for the GET users endponit", () => {
      beforeEach(() => {
        jest
          .spyOn(userPersistence, "getAllUsersInfo")
          .mockResolvedValue(fakeAllUsersInfo);
      });
      afterEach(async () => {
        jest.restoreAllMocks();
        await server.close();
      });
      it("should return a list of users", async () => {
        const response = await server.inject({
          method: "GET",
          url: "/users",
        });
        expect(response.statusCode).toEqual(200);
        expect(JSON.parse(response.body)).toEqual(fakeAllUsersInfo);
      });
    });
  });
});
