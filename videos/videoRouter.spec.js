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

describe("Video Data Routes", () => {
  describe("GET /videos", () => {
    it("should return status code 401 without a token", async () => {
      const response = await request(server)
      .get("/api/videos")
      
      expect(response.status).toEqual(401);
    });
  })

  describe("Authenticated routes", () => {
    let token;

    beforeAll(() => {
      return request(server)
      .post("/api/auth/login/username")
      .send({
        username: "fwilloughley0",
        password: "4OTUUVDkYT",
      })
      .then(res => {
        token = res.body.token
      })
    });

    describe("GET /videos", () => {
      it("should return status code 200", async () => {
        const response = await request(server)
        .get("/api/videos")
        .set("authorization", token)
        
        expect(response.status).toEqual(200);
      });
    
      it("should return an array", async () => {
        const response = await request(server)
          .get("/api/videos")
          .set("authorization", token)
        
        expect(Array.isArray(response.body)).toBe(true);
      });
    })

    describe("GET /videos/:id", () => {
      it("should return status code 200", async () => {
        const response = await request(server)
        .get("/api/videos/1")
        .set("authorization", token)
        
        expect(response.status).toEqual(200);
      });

      it("should return status code 400 if the team id is invalid", async () => {
        const response = await request(server)
        .get("/api/videos/150")
        .set("authorization", token)
        
        expect(response.status).toEqual(400);
      })
    
      it("should return a properly formatted JSON object on success", async () => {
        const response = await request(server)
          .get("/api/videos/1")
          .set("authorization", token)
        
          expect(response.body).toEqual(
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              owner_id: expect.any(Number),
              description: expect.any(String),
              created_at: expect.any(String),
              updated_at: expect.any(String),
              viedo_url: expect.any(String)
            })
          )}
        )
      })
    })
})