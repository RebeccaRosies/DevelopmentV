const supertest = require("supertest")
const s = require("../server.js")




describe('POST /dataLog', () => {
    beforeAll(async () => {
        app = await s();
      });

    it('tests if the post endpoint posts an object', async () => {
        //const app = await s()

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

    it('tests if the appropriate error is send when the endpoint is incorrect', async () => {
        //const app = await s()

        const request = supertest(app);
        const res = await request
            .post('/data')
            .set('Accept', 'application/json')
            .send({
                speed: 8.4,
                safe: true
            })

        expect(typeof res.body).toBe('object');
        expect(res.statusCode).toBe(404);
    });

    it('tests if the appropriate error is send if the datatype for speed is wrong', async () => {
        //const app = await s()

        const request = supertest(app);
        const res = await request
            .post('/dataLog')
            .set('Accept', 'application/json')
            .send({
                speed: "twee",
                safe: true
            })

        expect(typeof res.body).toBe('object');
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual('ERROR: speed should be a number')
    });

    it('tests if the appropriate error is send if the datatype for safe is wrong', async () => {
        //const app = await s()

        const request = supertest(app);
        const res = await request
            .post('/dataLog')
            .set('Accept', 'application/json')
            .send({
                speed: 5.3,
                safe: "true"
            })

        expect(typeof res.body).toBe('object');
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual('ERROR: safe should be a boolean')
    });

    it('tests if the appropriate error is send if the dataobject is empty', async () => {
        //const app = await s()

        const request = supertest(app);
        const res = await request
            .post('/dataLog')
            .set('Accept', 'application/json')
            .send({
            })

        expect(typeof res.body).toBe('object');
        expect(res.statusCode).toBe(400);
        expect(res.text).toEqual('ERROR: missing speed or safe')
    });


})