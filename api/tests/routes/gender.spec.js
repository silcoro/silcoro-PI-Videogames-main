/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Gender, conn } = require('../../src/db.js');

const agent = session(app);
// const gender = {
//   name: 'Action',
// };

describe('Gender routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('No se puede conectar a la base de datos:', err);
  }));
  // beforeEach(() => Gender.sync({ force: true })
  //   .then(() => Gender.create(gender)));
  describe('GET /genres', () => {
    it('debería obtener 200', () =>
      agent.get('/genres').expect(200)
    );
  });
});
