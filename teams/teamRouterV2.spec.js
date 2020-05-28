const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

beforeAll(async () => {
  await db.seed.run();
});

afterAll(async () => {
  await db.destroy();
});

describe("TeamRouter v2", () => {
  describe("GET /teams", () => {
    it("should return a 200 with successful fetch", async () => {
      const response = await request(server).get("/api/v2/teams");

      expect(response.status).toBe(200);
    });
    // it("should return a an array of teams", async () => {
    //   const response = await request(server).get("/api/v2/teams");

    //   expect(response.body).toBe(Array);
    // });
  });
});
