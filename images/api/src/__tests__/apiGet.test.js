const supertest = require("supertest")
const s = require("../server.js")


//Tests the GET ENDPOINT

describe('GET /dataLog', () => {
  beforeAll(async () => {
    //connect to database
    app = await s();
  });
  
  it('tests if the get endpoint makes a succesful connection', async() => {
     const request = supertest(app);

      const res = await request
        .get('/dataLog')
        .set('Accept', 'application/json')

        expect(typeof res.body).toBe('object');
        expect(res.statusCode).toBe(200);
    });

    it('tests if the appropiate error is sent when the endpoint is incorrect', async() => {
       const request = supertest(app);
  
        const res = await request
          .get('/data')
          .set('Accept', 'application/json')
  
          expect(typeof res.body).toBe('object');
          expect(res.statusCode).toBe(404);
      });

  })

