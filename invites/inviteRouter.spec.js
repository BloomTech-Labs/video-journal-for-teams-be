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
	})
})