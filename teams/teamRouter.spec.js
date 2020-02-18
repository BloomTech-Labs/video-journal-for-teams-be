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
			const response = await request(server).get("/api/teams");

			expect(response.status).toEqual(401);
		});
	});

	describe("Authenticated routes", () => {
		let token;

		beforeAll(() => {
			return request(server)
				.post("/api/auth/login/username")
				.send({
					username: "ostalleyf",
					password: "Nx1XqfzS6X",
				})
				.then((res) => {
					token = res.body.token;
				});
		});
		describe("GET /teams", () => {
			it("should return status code 200", async () => {
				const response = await request(server)
					.get("/api/teams")
					.set("authorization", token);

				expect(response.status).toEqual(200);
			});

			it("should return an array", async () => {
				const response = await request(server)
					.get("/api/teams")
					.set("authorization", token);

				expect(Array.isArray(response.body)).toBe(true);
			});
		});

		describe("GET /teams/:id", () => {
			it("should return status code 200", async () => {
				const response = await request(server)
					.get("/api/teams/1")
					.set("authorization", token);

				expect(response.status).toEqual(200);
			});

			it("should return status code 404 if the team id is invalid", async () => {
				const response = await request(server)
					.get("/api/teams/150")
					.set("authorization", token);

				expect(response.status).toEqual(404);
			});

			it("should return a properly formatted JSON object on success", async () => {
				const response = await request(server)
					.get("/api/teams/1")
					.set("authorization", token);

				expect(response.body).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						name: expect.any(String),
						description: expect.any(String),
						created_at: expect.any(String),
						updated_at: expect.any(String),
					})
				);
			});
		});

		describe("GET /teams/:id/users", () => {
			it("should return status code 200", async () => {
				const response = await request(server)
					.get("/api/teams/1/users")
					.set("authorization", token);

				expect(response.status).toEqual(200);
			});

			it("should return status code 404 if the team id is invalid", async () => {
				const response = await request(server)
					.get("/api/teams/150/users")
					.set("authorization", token);

				expect(response.status).toEqual(404);
			});

			it("should return array of data", async () => {
				const response = await request(server)
					.get("/api/teams/1/users")
					.set("authorization", token);

				expect(Array.isArray(response.body)).toBe(true);
			});
		});
		describe("POST /teams", () => {
			it("should return status code 201", async () => {
				const newTeam = {
					name: "New Team",
					description: "This is an awesome new team",
				};

				const response = await request(server)
					.post("/api/teams/")
					.set("authorization", token)
					.send(newTeam);

				expect(response.status).toEqual(201);
			});

			it("should return a properly formatted JSON object on success", async () => {
				const newTeam = {
					name: "New Team",
					description: "This is an awesome new team",
				};

				const response = await request(server)
					.post("/api/teams")
					.set("authorization", token)
					.send(newTeam);

				expect(response.body[0]).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						name: expect.any(String),
						description: expect.any(String),
						created_at: expect.any(String),
						updated_at: expect.any(String),
					})
				);
			});
			it("should return status code 400 if there's missing data in the request", async () => {
				const invalidTeam = {
					name: "New Team",
				};

				const response = await request(server)
					.post("/api/teams/")
					.set("authorization", token)
					.send(invalidTeam);

				expect(response.status).toEqual(400);
			});
		});

		describe("POST /teams/:id/users", () => {
			it("should return status code 201", async () => {
				const userToAdd = {
					team_id: 1,
					user_id: 3,
					role_id: 1,
				};

				const response = await request(server)
					.post("/api/teams/1/users")
					.set("authorization", token)
					.send(userToAdd);

				expect(response.status).toEqual(201);
			});

			it("should return status code 400 for missing data", async () => {
				const userToAdd = {
					team_id: 1,
					role_id: 1,
				};

				const response = await request(server)
					.post("/api/teams/1/users")
					.set("authorization", token)
					.send(userToAdd);

				expect(response.status).toEqual(400);
			});
		});

		describe("GET /teams/:id/prompts", () => {
			it("should return status code 200", async () => {
				const response = await request(server)
					.get("/api/teams/20/prompts")
					.set("authorization", token);
				expect(response.status).toEqual(200);
			});

			it("should return status code 404 if the team id is invalid", async () => {
				const response = await request(server)
					.get("/api/teams/150/prompts")
					.set("authorization", token);

				expect(response.status).toEqual(404);
			});

			it("should return array of data", async () => {
				const response = await request(server)
					.get("/api/teams/1/prompts")
					.set("authorization", token);

				expect(Array.isArray(response.body)).toBe(true);
			});
		});
		describe("POST /teams/:id/prompts", () => {
			const goodPrompt = {
				question: "This is the question",
				description: "Describe a description",
			};
			const badPrompt = {
				// "question": "This is the question",
				description: "Describe a description",
			};

			it("should return 201", async () => {
				const response = await request(server)
					.post("/api/teams/20/prompts")
					.set("authorization", token)
					.send(goodPrompt);
				expect(response.status).toEqual(201);
			});

			it("should return 500 if the incoming body is malformed", async () => {
				const response = await request(server)
					.post("/api/teams/20/prompts")
					.set("authorization", token)
					.send(badPrompt);

				expect(response.status).toEqual(400);
			});

			it("should return array of data", async () => {
				const response = await request(server)
					.post("/api/teams/1/prompts")
					.set("authorization", token);

				expect(typeof response.body).toBe("object");
			});
		});
		describe("GET /teams/:id/videos", () => {
			it("should return status code 200", async () => {
				const response = await request(server)
					.get("/api/teams/1/prompts")
					.set("authorization", token);

				expect(response.status).toEqual(200);
			});

			it("should return status code 404 if the team id is invalid", async () => {
				const response = await request(server)
					.get("/api/teams/150/videos")
					.set("authorization", token);

				expect(response.status).toEqual(404);
			});

			it("should return array of data", async () => {
				const response = await request(server)
					.get("/api/teams/1/videos")
					.set("authorization", token);

				expect(Array.isArray(response.body)).toBe(true);
			});
		});

		describe("DELETE /teams/:id/users", () => {
			it("Should return a 200 status code", async () => {
				const user_id = 15;

				const response = await request(server)
					.delete(`/api/teams/1/users/${user_id}`)
					.set("authorization", token);

				expect(response.status).toEqual(200);
			});

			it("Should return a 404 status code if the user does not belong to team", async () => {
				const user = 1;

				const response = await request(server)
					.delete(`/api/teams/1/users/${user}`)
					.set("authorization", token);

				expect(response.status).toEqual(404);
			});
		});

		describe("PUT /teams/:id/users/:user_id/role for updating a user's team role", () => {
			it("should return successful message", async () => {
				return await request(server)
					.put("/api/teams/20/users/1/role")
					.send({ role_id: 1 })
					.set("authorization", token)
					.then((response) => {
						expect(response.status).toEqual(200)
						expect(response.body).toHaveProperty("message");
					});
			});

			it("should return missing role id message", async () => {
				return await request(server)
					.put("/api/teams/20/users/1/role")
					.send()
					.set("authorization", token)
					.then((response) => {
						expect(response.status).toEqual(400)
						expect(response.body.message).toBe("Missing role id.");
					});
			});

			it("should unacceptable message", async () => {
				return await request(server)
					.put("/api/teams/20/users/1/role")
					.send({ role_id: 42 })
					.set("authorization", token)
					.then((response) => {
						expect(response.status).toEqual(406)
						expect(response.body.message).toBe("Unable to accept role id, must be 1 or 2.");
					});
			});
		});
	});
});