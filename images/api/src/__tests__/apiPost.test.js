const supertest = require("supertest")
const s = require("../server.js")



describe('POST /dataLog', () => {
    it('tests if the post endpoint posts an object', () => {
        s().then((app) => {
            const request = supertest(app);

            return request
                .post('/dataLog')
                .send({
                    speed: 2.1,
                    safe: true
                })
                .set('Accept', 'application/json')

                .expect('Content-Type', /json/)

                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    return done;
                })

        });
    });
})