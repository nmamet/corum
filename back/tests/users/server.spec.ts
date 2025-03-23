import { fakeAllUsersInfo } from "./data.ts";
import server from "../../src/server.ts";
import userPersistence from "../../src/users/persistence.ts";

const HTTP_OK_STATUS = 200;

describe("tests for the user endpoints of the fastify server", () => {
  describe("tests for the GET users endponit", () => {
    beforeEach(() => {
      jest
        .spyOn(userPersistence, "getAllUsersInfo")
        .mockResolvedValue(fakeAllUsersInfo);
    });
    afterEach(async () => {
      await server.close();
      jest.restoreAllMocks();
    });
    it("should return a list of users", async () => {
      const response = await server.inject({
        method: "GET",
        url: "/users",
      });
      expect(response.statusCode).toEqual(HTTP_OK_STATUS);
      expect(JSON.parse(response.body)).toEqual(fakeAllUsersInfo);
    });
  });
});
