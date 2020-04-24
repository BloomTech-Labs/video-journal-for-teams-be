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
		it("should return status code 401 without a token", async () => {
			const response = await request(server).get("/api/users");

			expect(response.status).toEqual(401);
		});
	});

	describe("Authenticated routes", () => {
		let token;

		beforeAll(() => {
			return request(server)
				.post("/api/auth/login/username")
				.send({
					username: "fwilloughley0",
					password: "4OTUUVDkYT",
				})
				.then((res) => {
					token = res.body.token;
				});
		});

		describe("GET /users/", () => {
			it("should return status code 200", async () => {
				const response = await request(server)
					.get("/api/users")
					.set("authorization", token);

				expect(response.status).toEqual(200);
			});

			it("should return an array", async () => {
				const response = await request(server)
					.get("/api/users")
					.set("authorization", token);
				expect(Array.isArray(response.body)).toBe(true);
			});
		});

		describe("GET /users/:id", () => {
			it("should return status code 200", async () => {
				const response = await request(server)
					.get("/api/users/1")
					.set("authorization", token);

				expect(response.status).toEqual(200);
			});

			it("should return status code 404 if the user id is invalid", async () => {
				const response = await request(server)
					.get("/api/users/150")
					.set("authorization", token);
				expect(response.status).toEqual(404);
			});

			it("should return a properly formatted JSON object on success", async () => {
				const response = await request(server)
					.get("/api/users/1")
					.set("authorization", token);

				expect(response.body).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						email: expect.any(String),
						username: expect.any(String),
						first_name: expect.any(String),
						last_name: expect.any(String),
					})
				);
			});
		});

		describe("GET /users/:id/teams/:orgId", () => {
			it("should return status code 200", async () => {
				const response = await request(server)
					.get("/api/users/1/teams/1")
					.set("authorization", token);

				expect(response.status).toEqual(200);
			});

			it("should return an array", async () => {
				const response = await request(server)
					.get("/api/users/1/teams/1")
					.set("authorization", token);

				expect(Array.isArray(response.body)).toBe(true);
			});
			it("should return status code 404 if the user id is invalid", async () => {
				const response = await request(server)
					.get("/api/users/150/teams")
					.set("authorization", token);

				expect(response.status).toEqual(404);
			});
		});

		describe("PUT /users/:id for updating a user", () => {
			it("should return info updated message", async () => {
				const username = "Bit_Wolf";
				return await request(server)
					.put("/api/users/1")
					.send({ username: username })
					.set("authorization", token)
					.then((response) => {
						expect(response.body).toHaveProperty("message");
						// expect(response.body.message).toBe("Successfully updated user");
					});
			});

			it("should return the updatedUser body", async () => {
				const username = "Bit_Wolf";
				return await request(server)
					.put("/api/users/1")
					.send({ username: username })
					.set("authorization", token)
					.then((response) => {
						expect(response.body.updatedUser.username).toBe("Bit_Wolf");
					});
			});
		});
	});
});
