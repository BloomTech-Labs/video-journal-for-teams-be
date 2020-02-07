const request = require("supertest");

const server = require("../api/server");

const db = require("../database/dbConfig");

//Clear and seed testing database
beforeAll(async () => {
  await db.seed.run();
});

//Close worker connection thread
afterAll(async () => {
  await db.destroy();
});

describe("Avatar Routes", () => {
  describe("GET /avatars", () => {
    it("should return status code 200 on success", async () => {
      const response = await request(server).get("/api/avatars");

      expect(response.status).toEqual(200);
    });
    it("should return an array", async () => {
      const response = await request(server).get("/api/avatars");

      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
