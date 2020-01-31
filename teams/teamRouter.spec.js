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

describe("Team Data Routes", () => {
  describe("GET /teams", () => {
    it("should return status code 200", async () => {
      const response = await request(server)
      .get("/api/teams")
      
      expect(response.status).toEqual(200);
    });
  
    it("should return an array", async () => {
      const response = await request(server)
        .get("/api/teams")
      
      expect(Array.isArray(response.body)).toBe(true);
    });
  })

  describe("GET /teams/:id", () => {
    it("should return status code 200", async () => {
      const response = await request(server)
      .get("/api/teams/1")
      
      expect(response.status).toEqual(200);
    });

    it("should return status code 400 if the team id is invalid", async () => {
      const response = await request(server)
      .get("/api/teams/150")
      
      expect(response.status).toEqual(400);
    })
  
    it("should return a properly formatted JSON object on success", async () => {
      const response = await request(server)
        .get("/api/teams/1")
      
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String)
          })
        )}
      )
    })
})


