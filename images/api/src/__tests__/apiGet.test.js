const supertest = require("supertest")
const s = require("../server.js")

describe('GET /dataLog', () => {
  beforeAll(async () => {
    app = await s();
  });
  it('tests if the get endpoint makes a succesful connection', async() => {
    //expect(2+2).toBe(4)
     //const app = await s()
     const request = supertest(app);

      const res = await request
        .get('/dataLog')
        .set('Accept', 'application/json')

        expect(typeof res.body).toBe('object');
        expect(res.statusCode).toBe(200);
    });

    it('tests if the appropiate error is sent when the endpoint is incorrect', async() => {
      //expect(2+2).toBe(4)
       //const app = await s()
       const request = supertest(app);
  
        const res = await request
          .get('/data')
          .set('Accept', 'application/json')
  
          expect(typeof res.body).toBe('object');
          expect(res.statusCode).toBe(404);
      });

  })

