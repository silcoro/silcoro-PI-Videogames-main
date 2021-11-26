const { Gender, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Gender model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No se puede conectar a la base de datos:', err);
    }));
  describe('validar nombre Action', () => {
    
      it('debería funcionar cuando es un nombre válido', () => {
        Gender.create({ name: 'Action' });
      });
    
  });
});