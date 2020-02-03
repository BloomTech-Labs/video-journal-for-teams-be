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
    it("should return status code 401 without a token", async () => {
      const response = await request(server)
      .get("/api/teams")
      
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

    describe("GET /teams", () => {
      it("should return status code 200", async () => {
        const response = await request(server)
        .get("/api/teams")
        .set("authorization", token)
        
        expect(response.status).toEqual(200);
      });
    
      it("should return an array", async () => {
        const response = await request(server)
          .get("/api/teams")
          .set("authorization", token)
        
        expect(Array.isArray(response.body)).toBe(true);
      });
    })

    describe("GET /teams/:id", () => {
      it("should return status code 200", async () => {
        const response = await request(server)
        .get("/api/teams/1")
        .set("authorization", token)
        
        expect(response.status).toEqual(200);
      });

      it("should return status code 400 if the team id is invalid", async () => {
        const response = await request(server)
        .get("/api/teams/150")
        .set("authorization", token)
        
        expect(response.status).toEqual(400);
      })
    
      it("should return a properly formatted JSON object on success", async () => {
        const response = await request(server)
          .get("/api/teams/1")
          .set("authorization", token)
        
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

    describe("GET /teams/:id/users", () => {
      it("should return status code 200", async () => {
        const response = await request(server)
          .get("/api/teams/1/users")
          .set("authorization", token)

        expect(response.status).toEqual(200);
      });

      it("should return status code 400 if the team id is invalid", async () => {
        const response = await request(server)
          .get("/api/teams/150/users")
          .set("authorization", token)

        expect(response.status).toEqual(400);
      })
    })

    it("should return array of data", async () => {
      const response = await request(server)
        .get("/api/teams/1/users")
        .set("authorization", token)

        expect(Array.isArray(response.body)).toBe(true);
    })

  })
})


