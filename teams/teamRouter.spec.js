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
        )
      }
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
      });

      it("should return array of data", async () => {
        const response = await request(server)
          .get("/api/teams/1/users")
          .set("authorization", token)

        expect(Array.isArray(response.body)).toBe(true);
      });
    });
    describe("POST /teams", () => {
      it("should return status code 201", async () => {
        const newTeam = {
          "name": "New Team",
          "description": "This is an awesome new team"
        }

        const response = await request(server)
          .post("/api/teams/")
          .set("authorization", token)
          .send(newTeam);

        expect(response.status).toEqual(201);
      });

      it("should return a properly formatted JSON object on success", async () => {
        const newTeam = {
          "name": "New Team",
          "description": "This is an awesome new team"
        }

        const response = await request(server)
          .post("/api/teams")
          .set("authorization", token)
          .send(newTeam);

        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String)
          })
        )
      })
      it("should return status code 400 if there's missing data in the request", async () => {
        const invalidTeam = {
          "name": "New Team",
        }

        const response = await request(server)
          .post("/api/teams/")
          .set("authorization", token)
          .send(invalidTeam);

        expect(response.status).toEqual(400);
      });
    })

    describe("POST /teams/:id", () => {

      it("should return status code 201", async () => {
        const userToAdd = {
          "team_id": 1,
          "user_id": 3,
          "role_id": 1
        }

        const response = await request(server)
          .post("/api/teams/1")
          .set("authorization", token)
          .send(userToAdd);

        expect(response.status).toEqual(201);
      });

      it("should return status code 400 for missing data", async () => {
        const userToAdd = {
          "team_id": 1,
          "role_id": 1
        }

        const response = await request(server)
          .post("/api/teams/1")
          .set("authorization", token)
          .send(userToAdd);

        expect(response.status).toEqual(400);
      });
    });

    describe("PUT /teams/:id", () => {

      it("should return status code 200", async () => {
        const changes = {
          "name": "Team Iron Man",
          "description": "The ultimate avengers team"
        }

        const response = await request(server)
          .put("/api/teams/1")
          .set("authorization", token)
          .send(changes);

        expect(response.status).toEqual(200);

      });

      it("should return status code 400 for wrong id", async () => {
        const changes = {
          "name": "Team Iron Man",
          "description": "The ultimate avengers team"
        }

        const response = await request(server)
          .put("/api/teams/111")
          .set("authorization", token)
          .send(changes);

        expect(response.status).toEqual(400);

      });
    });

    describe("GET /teams/:id/prompts", () => {

      it("should return status code 200", async () => {
        const response = await request(server)
          .get("/api/teams/1/prompts")
          .set("authorization", token)

        expect(response.status).toEqual(200);
      });

      it("should return status code 400 if the team id is invalid", async () => {
        const response = await request(server)
          .get("/api/teams/150/prompts")
          .set("authorization", token)

        expect(response.status).toEqual(400);
      });

      it("should return array of data", async () => {
        const response = await request(server)
          .get("/api/teams/1/prompts")
          .set("authorization", token)

        expect(Array.isArray(response.body)).toBe(true);
      });
    });
  });
});