/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

beforeEach( () =>{
  testSession = session(app);
});

before(() => conn.authenticate()
.catch((err) => {
  console.error('Unable to connect to the database:', err);
}));

describe('\n\nCountries routes', () => {
  const country = {
    id: "ARG",
    name: "Argentina",
    flag: "https://flagcdn.com/ar.svg",
    continent: "South America",
    capital: "Buenos Aires",
    population: 45376763,
  };

  beforeEach(() => Country.sync({ force: true })
  .then(() => Country.create(country)));

  describe('\nPATH: GET /countries', () => {
    it('Should get 200', () =>
      testSession.get('/countries').expect(200)
    );
    it('Should get 200 if the country name passed by QUERY is valid.', () =>
      testSession.get('/countries?name=argen').expect(200)
    );
    it('Should get 400 if the country name passed by QUERY is not valid.', () =>
      testSession.get('/countries?name=earth').expect(400)
    );
  });

  describe('\nPATH: GET /countries/:IdCountry', () => {
    it('Should get 200 if the country ID passed by PARAMS is valid.', () =>
      testSession.get('/countries/ARG').expect(200)
    );
    it('Should get 400 if the country ID passed by PARAMS is not valid.', () =>
      testSession.get('/countries/PPP').expect(400)
    );
  });
});
