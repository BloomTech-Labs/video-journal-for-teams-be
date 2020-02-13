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

describe("server.js", () => {
	describe("environment", function() {
		it("should set environment to testing", function() {
			expect(process.env.DB_ENV).toBe("testing");
		});
	});

	describe("index route", () => {
		it("should return an OK status code from the index route", async () => {
			const expectedStatusCode = 200;

			const response = await request(server).get("/");

			expect(response.status).toEqual(expectedStatusCode);
		});

		it("should return a JSON object from the index route", async () => {
			const expectedBody = { api: "running" };

			const response = await request(server).get("/");

			expect(response.body).toEqual(expectedBody);
		});

		it("should return a JSON object from the index route", async () => {
			const response = await request(server).get("/");

			expect(response.type).toEqual("application/json");
		});
	});
});
