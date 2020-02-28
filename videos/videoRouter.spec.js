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
			const response = await request(server).get("/api/videos");

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

		describe("GET /videos", () => {
			it("should return status code 200", async () => {
				const response = await request(server)
					.get("/api/videos")
					.set("authorization", token);

				expect(response.status).toEqual(200);
			});

			it("should return an array", async () => {
				const response = await request(server)
					.get("/api/videos")
					.set("authorization", token);

				expect(Array.isArray(response.body)).toBe(true);
			});
		});

		describe("GET /videos/:id", () => {
			it("should return status code 200", async () => {
				const response = await request(server)
					.get("/api/videos/1")
					.set("authorization", token);

				expect(response.status).toEqual(200);
			});

			it("should return status code 400 if the team id is invalid", async () => {
				const response = await request(server)
					.get("/api/videos/150")
					.set("authorization", token);

				expect(response.status).toEqual(400);
			});

			it("should return a properly formatted JSON object on success", async () => {
				const response = await request(server)
					.get("/api/videos/1")
					.set("authorization", token);

				expect(response.body).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						owner_id: expect.any(Number),
						owner_name: expect.any(String),
						video_title: expect.any(String),
						video_description: expect.any(String),
						video_url: expect.any(String),
						created_at: expect.any(String),
						prompt_question: expect.any(String),
					})
				);
			});
		});

		describe("POST /videos", () => {
			// data object to send
			const videoData = {
				owner_id: 73,
				title: "Removal of Drainage Device from Peritoneum, Open Approach",
				description: "Removal of Drainage Device from Peritoneum, Open Approach",
				created_at: "2020-01-14 14:32:15",
				updated_at: "2019-01-24 03:09:02",
				video_url: "http://dummyimage.com/204x108.jpg/5fa2dd/ffffff",
				prompt_id: 6,
			};

			it.skip("should return status code 201", async () => {
				const response = await request(server)
					.post("/api/videos")
					.set("authorization", token)
					.send(videoData);
				expect(response.status).toEqual(201);
			});

			it.skip("should be correct incoming JSON object", async () => {
				const response = await request(server)
					.post("/api/videos")
					.set("authorization", token);

				expect(videoData).toEqual(
					expect.objectContaining({
						title: expect.any(String),
						owner_id: expect.any(Number),
						description: expect.any(String),
						created_at: expect.any(String),
						updated_at: expect.any(String),
						video_url: expect.any(String),
						prompt_id: expect.any(Number),
					})
				);
			});

			it.skip("should return an object.id as an integer after db storage", async () => {
				const response = await request(server)
					.post("/api/videos")
					.set("authorization", token)
					.send(videoData);
				expect(Number.isInteger(response.body.id)).toBe(true);
			});
		});

		describe("PUT /videos", () => {
			// data object to send
			const videoChangeData = {
				id: 105,
				owner_id: 78,
				title: "Removal of Drainage Device from Peritoneum, Open Approach",
				description: "Removal of Drainage Device from Peritoneum, Open Approach",
				created_at: "2020-01-14 14:32:15",
				updated_at: "2019-01-24 03:09:02",
				video_url: "http://dummyimage.com/204x108.jpg/5fa2dd/ffffff",
				prompt_id: 22,
			};

			it("should return status code 200", async () => {
				const response = await request(server)
					.put("/api/videos")
					.set("authorization", token)
					.send(videoChangeData);
				expect(response.status).toEqual(200);
			});

			it("should be correct incoming JSON object", async () => {
				const response = await request(server)
					.post("/api/videos")
					.set("authorization", token);

				expect(videoChangeData).toEqual(
					expect.objectContaining({
						id: expect.any(Number),
						title: expect.any(String),
						owner_id: expect.any(Number),
						description: expect.any(String),
						created_at: expect.any(String),
						updated_at: expect.any(String),
						video_url: expect.any(String),
						prompt_id: expect.any(Number),
					})
				);
			});

			it("should return an object after db storage", async () => {
				const response = await request(server)
					.post("/api/videos")
					.set("authorization", token)
					.send(videoChangeData);
				expect(typeof response.body).toBe("object");
			});
		});

		describe("GET /videos/:id/feedback", () => {
			it("should return status code 200", async () => {
				const response = await request(server)
					.get("/api/videos/1/feedback")
					.set("authorization", token);

				expect(response.status).toEqual(200);
			});

			it("should return status code 400 if the team id is invalid", async () => {
				const response = await request(server)
					.get("/api/videos/150/feedback")
					.set("authorization", token);

				expect(response.status).toEqual(400);
			});

			it("should return a properly formatted JSON object on success", async () => {
				const response = await request(server)
					.get("/api/videos/1/feedback")
					.set("authorization", token);

				expect(Array.isArray(response.body)).toBe(true);
			});
		});

		describe("POST /videos/:id/feedback", () => {
			it("should return status code 201", async () => {
				const validFeedback = {
					owner_id: 1,
					post: "This is a test feedback submission",
				};

				const response = await request(server)
					.post("/api/videos/1/feedback")
					.set("authorization", token)
					.send(validFeedback);

				expect(response.status).toEqual(201);
			});

			it("should return a properly formatted JSON object on success", async () => {
				const validFeedback = {
					owner_id: 1,
					post: "This is a test feedback submission",
				};

				const response = await request(server)
					.post("/api/videos/1/feedback")
					.set("authorization", token)
					.send(validFeedback);

				expect(Array.isArray(response.body)).toBe(true);
			});
		});
	});
});
