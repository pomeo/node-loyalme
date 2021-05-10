import chai from 'chai';
import nock from 'nock';

import Loyalme           from '../src/main';
import createCategory    from './responses/category/create.json';
import updateCategory    from './responses/category/update.json';
import findCategory      from './responses/category/findByExternalId.json';
import notFoundCategory  from './responses/category/notFound.json';

import createProduct     from './responses/product/create.json';
import updateProduct     from './responses/product/update.json';
import findByExternalId  from './responses/product/findByExternalId.json';
import notFound          from './responses/product/notFound.json';

describe('Product', () => {
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
    it('Should return object with property ext_item_id equal 123456', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/category?external_id=123456')
        .reply(200, findCategory);
      nock('https://loyaltycrm.ru/api')
        .get('/product?ext_item_id=123456')
        .reply(200, findByExternalId);

      return loyalme.product([{
        title: 'Newproduct2',
        extItemId: 123456
      }], [{
        name: 'Newname1',
        externalId: '123456'
      }]).then(response => {
        return should.equal(response[0].ext_item_id, 123456);
      });
    });
  });

  describe('Create', () => {
    it('Should return object with property ext_item_id equal 1234567', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/category?external_id=123456')
        .reply(200, findCategory);
      nock('https://loyaltycrm.ru/api')
        .get('/product?ext_item_id=123456')
        .reply(200, notFound);
      nock('https://loyaltycrm.ru/api')
        .post('/product')
        .reply(200, createProduct);

      return loyalme.product([{
        title: 'Newproduct2',
        extItemId: 123456
      }], [{
        name: 'Newname1',
        externalId: '123456'
      }]).then(response => {
        return should.equal(response[0].title, 'Newproduct1');
      });
    });
  });

  describe('Update', () => {
    it('Should return object with property name equal Updatedname2', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/category?external_id=123456')
        .reply(200, findCategory);
      nock('https://loyaltycrm.ru/api')
        .get('/product?ext_item_id=123456')
        .reply(200, findByExternalId);
      nock('https://loyaltycrm.ru/api')
        .put('/product/20')
        .reply(200, updateProduct);

      return loyalme.product([{
        title: 'Newproduct3',
        extItemId: 123456
      }], [{
        name: 'Newname1',
        externalId: '123456'
      }]).then(response => {
        return should.equal(response[0].title, 'Newproduct3');
      });
    });
  });
});
