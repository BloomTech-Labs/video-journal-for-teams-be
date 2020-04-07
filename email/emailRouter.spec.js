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



describe("POST /email", () => {

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


    it("should return status code 200 when feedback is provided ", async () => {
        
        const msg = {
            id: 13,
			post: '"consequat morbi a ipsum integer a nibh in"'
          };
        
        

        const response = await request(server)
            .post("/api/email")
            .set("authorization", token)
            .send(msg);

        expect(response.status).toEqual(200);
    });

    it("should return status code 200 when prompt is added", async () => {
        
        const msg = {
            teamId: 13,
            post: "Could be anything"
          };
        
        

        const response = await request(server)
            .post("/api/email/teams")
            .set("authorization", token)
            .send(msg);

        expect(response.status).toEqual(200);
    });

    
});