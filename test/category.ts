import chai from 'chai';
import nock from 'nock';

import Loyalme           from '../src/main';
import createCategory    from './responses/category/create.json';
import updateCategory    from './responses/category/update.json';
import findByExternalId  from './responses/category/findByExternalId.json';
import findByExternalId2 from './responses/category/findByExternalId2.json';
import notFound          from './responses/category/notFound.json';

describe('Category', () => {
  const should = chai.should();
  const loyalme = Loyalme({
    url: 'loyaltycrm.ru/api',
    token: '12345',
    brandId: 1,
    pointId: 2,
    personId: 3,
    clientId: 4
  });

  describe('Search by external_id', () => {
    it('Should return object with property external_id equal 123456', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/category?external_id=123456')
        .reply(200, findByExternalId);

      return loyalme.category([{
        name: 'Newname1',
        externalId: '123456'
      }]).then(response => {
        return should.equal(response[0].external_id, '123456');
      });
    });
  });

  describe('Create', () => {
    it('Should return object with property external_id equal 1234567', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/category?external_id=123456')
        .reply(200, findByExternalId);
      nock('https://loyaltycrm.ru/api')
        .get('/category?external_id=1234567')
        .reply(200, notFound);
      nock('https://loyaltycrm.ru/api')
        .post('/category')
        .reply(200, createCategory);

      return loyalme.category([{
        name: 'Newname1',
        externalId: '123456'
      }, {
        name: 'Newname2',
        externalId: '1234567'
      }]).then(response => {
        return should.equal(response[1].name, 'Newname2');
      });
    });
  });

  describe('Update', () => {
    it('Should return object with property name equal Updatedname2', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/category?external_id=123456')
        .reply(200, findByExternalId);
      nock('https://loyaltycrm.ru/api')
        .get('/category?external_id=1234567')
        .reply(200, findByExternalId2);
      nock('https://loyaltycrm.ru/api')
        .put('/category/9')
        .reply(200, updateCategory);

      return loyalme.category([{
        name: 'Newname1',
        externalId: '123456'
      }, {
        name: 'Updatedname2',
        externalId: '1234567'
      }]).then(response => {
        return should.equal(response[1].name, 'Updatedname2');
      });
    });
  });
});
