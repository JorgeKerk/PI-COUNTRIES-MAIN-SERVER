/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Activity, conn } = require('../../src/db.js');

beforeEach( () =>{
  testSession = session(app);
});

describe('\nActivities routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  const activity = {
    name: 'Sky',
    dificulty: 1,
    seasons: ['Summer'],
    countriesIds: ['ARG']
  };

  beforeEach(() => Activity.sync({ force: true })
  .then(() => Activity.create(activity)));
  
  describe('\nPATH: GET /activities', () => {
    it('Should respond with status 200.', () =>
      testSession.get('/activities').expect(200)
    );
  });

  describe('\nPATH: POST /activities', () => {
    it('It should respond with status 200 if the parameters sent by BODY are correct.', () =>
      testSession.post('/activities')
      .send( { name: 'Parapent', dificulty: 1, seasons: ['Summer'], countriesIds: ['ARG'] })
      .expect(200)
    );
    it('It should respond with status 400 if the parameters sent by BODY are incorrect.', () =>
    testSession.post('/activities')
    .send( { dificulty: 1, seasons: ['Summer'], countriesIds: ['ARG'] })
    .expect(400)
  );
  });
});
