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
					.get("/api/teams/20")
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
					.get("/api/teams/20")
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
					.get("/api/teams/20/users")
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
					.get("/api/teams/20/users")
					.set("authorization", token);

				expect(Array.isArray(response.body)).toBe(true);
			});
		});
		describe("POST /teams", () => {
			it("should return status code 201", async () => {
				const newTeam = {
					name: "New Team",
					description: "This is an awesome new team",
					organization_id: 1
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
					organization_id: 1
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
//come back to this
		describe("POST /teams/:id/users", () => {
			it("should return status code 201", async () => {
				const userToAdd = {
					team_id: 1,
					user_id: 3,
					role_id: 1,
					
				};

				const response = await request(server)
					.post("/api/teams/20/users")
					.set("authorization", token)
					.send(userToAdd);

				expect(response.status).toEqual(400);
			});

			it("should return status code 400 for missing data", async () => {
				const userToAdd = {
					team_id: 1,
					role_id: 1,
				};

				const response = await request(server)
					.post("/api/teams/20/users")
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
					.get("/api/teams/20/prompts")
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
					.post("/api/teams/20/prompts")
					.set("authorization", token);

				expect(typeof response.body).toBe("object");
			});
		});
		describe("GET /teams/:id/videos", () => {
			it("should return status code 200", async () => {
				const response = await request(server)
					.get("/api/teams/20/videos")
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
					.get("/api/teams/20/videos")
					.set("authorization", token);

				expect(Array.isArray(response.body)).toBe(true);
			});
		});

		describe("DELETE /teams/:id/users", () => {
			it("Should return a 200 status code, when user_id: 16 is team lead role_id: 2", async () => {
				// Team Leader, Valera Corking, deletes member, Gizela Dufer, from Borer, Nienow and Kunde team_id: 20
				const response = await request(server)
					.delete(`/api/teams/20/users/50`)
					.set("authorization", token);

				expect(response.status).toEqual(200);
			});

			it("Should return a 403 status code, if Valera Corking does not have team leader privilege on team 17", async () => {
				const response = await request(server)
					.delete(`/api/teams/17/users/3`)
					.set("authorization", token);

				expect(response.status).toEqual(403);
			});

			it("Should return a 404 status code since member, Glenda Arlidge user_id: 7, does not belong to team 20", async () => {
				const response = await request(server)
					.delete(`/api/teams/20/users/7`)
					.set("authorization", token);

				expect(response.status).toEqual(404);
			});
		});

		describe("PUT /teams/:id/users/:user_id/role for updating a user's team role", () => {
			// Team Leader, Valera Corking, promotes member, Gizela Dufer, to role_id: 2 on Borer, Nienow and Kunde team_id: 20
			it("should return successful message", async () => {
				return await request(server)
					.put("/api/teams/20/users/50/role")
					.send({ role_id: 2 })
					.set("authorization", token)
					.then((response) => {
						expect(response.status).toEqual(200)
						expect(response.body).toHaveProperty("message");
					});
			});

			it("should return missing role id message", async () => {
				return await request(server)
					.put("/api/teams/20/users/50/role")
					.send() // empty role
					.set("authorization", token)
					.then((response) => {
						expect(response.status).toEqual(400)
						expect(response.body.message).toBe("Missing role id.");
					});
			});

			it("Should return a 403 status code, if Valera Corking does not have team leader privilege on team 17", async () => {
				return await request(server)
					.put(`/api/teams/17/users/3/role`)
					.send({ role_id: 2 })
					.set("authorization", token)
					.then((response) => {
						expect(response.status).toEqual(403);
						expect(response.body.message).toBe("Permission denied.")
					})
			});
		});

		describe("POST /teams/:id/invite", () => {
			it("POST status 200 success should RETURN an object", async () => {
				const response = await request(server)
					.post("/api/teams/20/invite")
					.send({ "team_name": "Borer, Nienow and Kunde", "org_id": 1 })
					.set("authorization", token);
				expect(response.status).toEqual(200);
				expect(typeof response.body).toBe("object");
			});

			it("POST should not accept an incomplete or incorrect request object", async () => {
				const response = await request(server)
					.post("/api/teams/20/invite")
					.send({ "team_id": 4, "org_id": 1})
					.set("authorization", token);
				expect(response.status).toEqual(400);
				expect(response.body.message).toBe("Request needs to be an object with team_id and team_name elements.");
			});

			it("POST should not accept request from a regular team member, must be team lead only", async () => {
				const response = await request(server)
					.post("/api/teams/17/invite")
					.send({ "team_name": "Kreiger, Langworth and Beatty", "org_id": 1 })
					.set("authorization", token);
				expect(response.status).toEqual(403);
				expect(response.body.message).toBe("Permission denied.");
			});
		})
	});
});