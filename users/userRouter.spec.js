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

describe("Login/Register routes", () => {
  //* USERNAME LOGIN ROUTE TESTING
  describe("POST /login/username", () => {
    //? Does it return the correct status code for valid credentials?
    it("should return status code 200 on success", async () => {
      //To test valid user credentials
      const validUser = {
        username: "fwilloughley0",
        password: "4OTUUVDkYT",
      };

      const response = await request(server)
        .post("/api/users/login/username")
        .send(validUser);

      expect(response.status).toEqual(200);
    });

    //? Does it return the data in the expected format?
    test("should return a properly formatted JSON object on success", async () => {
      const validUser = {
        username: "fwilloughley0",
        password: "4OTUUVDkYT",
      };

      const response = await request(server)
        .post("/api/users/login/username")
        .send(validUser);

      expect(response.body).toEqual(
        expect.objectContaining({
          user: {
            email: expect.any(String),
            username: expect.any(String),
            first_name: expect.any(String),
            last_name: expect.any(String)
          },
          token: expect.any(String),
        })
      );
    });

    //? Does it return the correct status code for missing parameters?
    it("should return status code 400 on bad request", async () => {
      //To test missing params edge case
      const missingParamUser = {
        username: "fwilloughley0",
        //Missing password argument
      };

      const response = await request(server)
        .post("/api/users/login/username")
        .send(missingParamUser);

      expect(response.status).toEqual(400);
    });

    //? Does it return the correct status code for invalid credentials?
    it("should return status code 401 on invalid username/password", async () => {
      //To test invalid user credentials
      const invalidUser = {
        username: "fwilloughley0",
        password: "password",
      };

      const response = await request(server)
        .post("/api/users/login/username")
        .send(invalidUser);

      expect(response.status).toEqual(401);
    });
  });

  //* EMAIL LOGIN ROUTE TESTING
  describe("POST /login/email", () => {
    //? Does it return the correct status code for valid credentials?
    it("should return status code 200 on success", async () => {
      //To test valid user credentials
      const validUser = {
        email: "asculpher0@independent.co.uk",
        password: "4OTUUVDkYT",
      };

      const response = await request(server)
        .post("/api/users/login/email")
        .send(validUser)

      expect(response.status).toEqual(200);
    });

    //? Does it return the data in the expected format?
    test("should return a properly formatted JSON object on success", async () => {
      const validUser = {
        email: "asculpher0@independent.co.uk",
        password: "4OTUUVDkYT",
      };

      const response = await request(server)
        .post("/api/users/login/email")
        .send(validUser);

      expect(response.body).toEqual(
        expect.objectContaining({
          user: {
            email: expect.any(String),
            username: expect.any(String),
            first_name: expect.any(String),
            last_name: expect.any(String)
          },
          token: expect.any(String),
        })
      );
    });

    //? Does it return the correct status code for missing parameters?
    it("should return status code 400 on bad request", async () => {
      //To test missing params edge case
      const missingParamUser = {
        email: "asculpher0@independent.co.uk",
        //Missing password argument
      };

      const response = await request(server)
        .post("/api/users/login/email")
        .send(missingParamUser);

      expect(response.status).toEqual(400);
    });

    //? Does it return the correct status code for invalid credentials?
    it("should return status code 401 on invalid email/password", async () => {
      //To test invalid user credentials
      const invalidUser = {
        email: "asculpher0@independent.co.uk",
        password: "password",
      };

      const response = await request(server)
        .post("/api/users/login/email")
        .send(invalidUser);

      expect(response.status).toEqual(401);
    });
  });

  //* REGISTER ROUTE TESTING
  describe("POST /register", () => {
    //? Does it return the correct status code for a valid new account signup?
    it("should return status code 201 on success", async () => {
      //To test valid signup scenario
      const validSignup = {
        email: "test@email.com",
        username: "testUser",
        password: "testPassword",
        first_name: "Test",
        last_name: "User"
      };

      const response = await request(server)
        .post("/api/users/register")
        .send(validSignup);

      expect(response.status).toEqual(201);
    });

    //? Does it return the data in the expected format?
    test("should return a properly formatted JSON object on success", async () => {
      const validSignup = {
        email: "test1@email.com",
        username: "testUser1",
        password: "testPassword",
        first_name: "Test",
        last_name: "User"
      };

      const response = await request(server)
        .post("/api/users/register")
        .send(validSignup);

      expect(response.body).toEqual(
        expect.objectContaining({
          user: {
            email: expect.any(String),
            username: expect.any(String),
            first_name: expect.any(String),
            last_name: expect.any(String)
          },
          token: expect.any(String),
        })
      );
    });

    //? Does it return the correct status code for missing parameters?
    it("should return status code 400 on bad request", async () => {
      //To test missing params edge case
      const missingParamSignup = {
        email: "test@email.com",
        username: "testUser",
      };

      const response = await request(server)
        .post("/api/users/register")
        .send(missingParamSignup);

      expect(response.status).toEqual(400);
    });

    //? Does it return the correct status code for a pre-existing account?
    it("should return status code 409 when account already exists", async () => {
      //To test duplicate account register scenario
      const validSignup = {
        email: "test2@email.com",
        username: "testUser2",
        password: "testPassword",
        first_name: expect.any(String),
        last_name: expect.any(String)
      };

      const duplicateSignup = validSignup;

      await request(server)
        .post("/api/users/register")
        .send(validSignup);

      const response = await request(server)
        .post("/api/users/register")
        .send(duplicateSignup);

      expect(response.status).toEqual(409);
    });
  });
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
  
  describe("PUT /users/:id for updating a user", () => {
    it("should return info updated message", async () => {
        const username = "Bit_Wolf";
        const response = await request(server)
            .put("/api/users/1")
            .send({ username: username })
            .then(response => {
                expect(response.body.message).toBe("info updated");
            });
    });
    it("should return the updatedUser count of 1", async () => {
        const username = "Bit_Wolf";
        const response = await request(server)
            .put("/api/users/1")
            .send({ username: username })
            .then(response => {
                expect(response.body.updatedUser).toBe(1);
            });
    })
  })
})