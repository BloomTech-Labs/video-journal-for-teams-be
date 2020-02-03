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

describe("User Data Routes", () => {
  describe("GET /users", () => {
    it("should return status code 200", async () => {
      const response = await request(server)
      .get("/api/users")
      
      expect(response.status).toEqual(200);
    });

    it("should return an array", async () => {
      const response = await request(server)
        .get("/api/users")
      
      expect(Array.isArray(response.body)).toBe(true);
    });
  })

  describe("GET /users/:id", () => {
    it("should return status code 200", async () => {
      const response = await request(server)
      .get("/api/users/1")
      
      expect(response.status).toEqual(200);
    });

    it("should return status code 400 if the user id is invalid", async () => {
      const response = await request(server)
      .get("/api/users/150")
      
      expect(response.status).toEqual(400);
    })

    it("should return a properly formatted JSON object on success", async () => {
      const response = await request(server)
        .get("/api/users/1")
      
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            email: expect.any(String),
            username: expect.any(String),
            password: expect.any(String),
            first_name: expect.any(String),
            last_name: expect.any(String)
          })
        );
    });
    
  })

  describe("GET /users/:id/teams", () => {
    it("should return status code 200", async () => {
      const response = await request(server)
      .get("/api/users/1/teams")
      
      expect(response.status).toEqual(200);
    });

    it("should return an array", async () => {
      const response = await request(server)
        .get("/api/users/1/teams")
      
      expect(Array.isArray(response.body)).toBe(true);
    });
    it("should return status code 400 if the user id is invalid", async () => {
      const response = await request(server)
      .get("/api/users/150/teams")
      
      expect(response.status).toEqual(400);
    })
  })
})
