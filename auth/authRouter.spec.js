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
				.post("/api/auth/login/username")
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
				.post("/api/auth/login/username")
				.send(validUser);

			expect(response.body).toEqual(
				expect.objectContaining({
					user: {
						id: expect.any(Number),
						email: expect.any(String),
						username: expect.any(String),
						first_name: expect.any(String),
						last_name: expect.any(String),
						avatar: expect.any(String),
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
				.post("/api/auth/login/username")
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
				.post("/api/auth/login/username")
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
				.post("/api/auth/login/email")
				.send(validUser);

			expect(response.status).toEqual(200);
		});

		//? Does it return the data in the expected format?
		test("should return a properly formatted JSON object on success", async () => {
			const validUser = {
				email: "asculpher0@independent.co.uk",
				password: "4OTUUVDkYT",
			};

			const response = await request(server)
				.post("/api/auth/login/email")
				.send(validUser);

			expect(response.body).toEqual(
				expect.objectContaining({
					user: {
						id: expect.any(Number),
						email: expect.any(String),
						username: expect.any(String),
						first_name: expect.any(String),
						last_name: expect.any(String),
						avatar: expect.any(String),
						organization_id: expect.any(Number),
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
				.post("/api/auth/login/email")
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
				.post("/api/auth/login/email")
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
				last_name: "User",
			};

			const response = await request(server)
				.post("/api/auth/register")
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
				last_name: "User",
			};

			const response = await request(server)
				.post("/api/auth/register")
				.send(validSignup);

			expect(response.body).toEqual(
				expect.objectContaining({
					user: {
						id: expect.any(Number),
						email: expect.any(String),
						username: expect.any(String),
						first_name: expect.any(String),
						last_name: expect.any(String),
						avatar: expect.any(String),
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
				.post("/api/auth/register")
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
				first_name: "test",
				last_name: "test",
			};

			const duplicateSignup = validSignup;

			await request(server)
				.post("/api/auth/register")
				.send(validSignup);

			const response = await request(server)
				.post("/api/auth/register")
				.send(duplicateSignup);

			expect(response.status).toEqual(409);
		});
	});

	// Checks if you can successfully make an authenticated request with the tokens returned from each auth endpoint

	describe("auth endpoints should create valid tokens", () => {
		it("authenticated request with register auth token should be successful", async () => {
			const validSignup = {
				email: "test3@email.com",
				username: "testUser3",
				password: "testPassword",
				first_name: "Test",
				last_name: "User",
			};

			return request(server)
				.post("/api/auth/register")
				.send(validSignup)
				.then((res) => {
					const token = res.body.token;

					return request(server)
						.get("/api/users")
						.set("authorization", token)
						.then((response) => {
							expect(response.status).toEqual(200);
						});
				});
		});

		it("authenticated request with email login auth token should be successful", async () => {
			//To test valid signup scenario
			const validUser = {
				email: "asculpher0@independent.co.uk",
				password: "4OTUUVDkYT",
			};

			return request(server)
				.post("/api/auth/login/email")
				.send(validUser)
				.then((res) => {
					const token = res.body.token;

					return request(server)
						.get("/api/users")
						.set("authorization", token)
						.then((response) => {
							expect(response.status).toEqual(200);
						});
				});
		});

		it("authenticated request with username login auth token should be successful", async () => {
			//To test valid signup scenario
			const validUser = {
				username: "testUser",
				password: "testPassword",
			};

			return request(server)
				.post("/api/auth/login/username")
				.send(validUser)
				.then((res) => {
					const token = res.body.token;

					return request(server)
						.get("/api/users")
						.set("authorization", token)
						.then((response) => {
							expect(response.status).toEqual(200);
						});
				});
		});
	});
});
