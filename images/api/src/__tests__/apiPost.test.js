const supertest = require("supertest")
const s = require("../server.js")



describe('POST /dataLog', () => {
    it('tests if the post endpoint posts an object',  async () => {
        const app = await s()
        
            const request = supertest(app);
            const res = await request
                .post('/dataLog')
                .set('Accept', 'application/json')
                .send({
                    speed: 2.1,
                    safe: true
                })
            
                expect(typeof res.body).toBe('object');
                expect(res.statusCode).toBe(200);
    });
})
