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

describe("Team Invitation Routes", () => {
	describe("GET /invitation/:code", () => {
		it("without a :code should return status code 404", async () => {
			const response = await request(server)
				.get("/api/invites")
			expect(response.status).toEqual(404);
		});

		it("POST should RETURN an object", async () => {
			const response = await request(server)
				.post("/api/invites/")
				.send({ "team_id": 16, "team_name": "Some Temp Name" })
			expect(typeof response.body).toBe("object");
		});

		it("POST should not accept an invalid team_id", async () => {
			const response = await request(server)
				.post("/api/invites/")
				.send({ "team_id": 999999, "team_name": "Some Temp Name" })
			expect(response.status).toEqual(400);
		});

		it("POST should not accept an incomplete object", async () => {
			const response = await request(server)
				.post("/api/invites/")
				.send({ "team_id": 4 })
			expect(response.status).toEqual(400);
		});
	})
})
