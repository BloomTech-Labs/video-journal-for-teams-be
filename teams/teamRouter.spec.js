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

describe("GET all teams endpoint", () => {

});

describe("GET team by id endpoint", () => {

});

describe("POST new team endpoint", () => {

});

describe("PUT update team endpoint", () => {

});

describe("DELETE team endpoint", () => {

});