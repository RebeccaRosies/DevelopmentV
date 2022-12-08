const supertest = require("supertest")
const s = require("../server.js")

describe('GET /dataLog', () => {
  it('tests if the get endpoint makes a succesful connection', () => {
    s().then((app) => {
      const request = supertest(app);

      return request
        .get('/dataLog')
        .set('Accept', 'application/json')

        .expect('Content-Type', /json/)

        .expect(200)
    });
  });

  it('tests if the get endpoint gets a response with the correct type of data', () => {
    s().then((app) => {
      const request = supertest(app);

      return request
        .get('/dataLog')
        .set('Accept', 'application/json')

        .expect('Content-Type', /json/)

        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                speed: expect.any(Number),
                safe: expect.any(Boolean),
              }),
            ])
          );
        });
    })
    
  });

  
})