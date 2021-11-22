import chai from 'chai';
import nock from 'nock';

import Loyalme     from '../src/main';
import createOrder from './responses/order/create.json';
import updateOrder from './responses/order/update.json';
import findByID1   from './responses/order/findByID1.json';
import findByID2   from './responses/order/findByID2.json';
import notFound    from './responses/order/notFound.json';
import findByExternalId  from './responses/client/findByExternalId.json';

describe('Order', () => {
  const should = chai.should();
  const loyalme = Loyalme({
    url: 'loyaltycrm.ru/api',
    token: '12345',
    brandId: 1,
    pointId: 2,
    personId: 3
  });

  describe('Search by ID', () => {
    it('Should return object with property ext_order_id equal 123', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/client?external_id=123456')
        .reply(200, findByExternalId);
      nock('https://loyaltycrm.ru/api')
        .get('/order?ext_order_id=123')
        .reply(200, findByID1);

      return loyalme.client({
        externalId: '123456',
        email: 'test@test.com',
        phone: '79031234567',
        name: 'Testname'
      }).then((user) => {
        return loyalme.order([{
          clientId: user.id,
          extOrderId: '123'
        }])
      }).then(response => {
        return should.equal(response[0].ext_order_id, '123');
      });
    });
  });

  describe('Create', () => {
    it('Should return object with property ext_order_id equal 123', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/client?external_id=123456')
        .reply(200, findByExternalId);
      nock('https://loyaltycrm.ru/api')
        .get('/order?ext_order_id=123')
        .reply(200, findByID1);
      nock('https://loyaltycrm.ru/api')
        .get('/order?ext_order_id=12345')
        .reply(200, notFound);
      nock('https://loyaltycrm.ru/api')
        .post('/order')
        .reply(200, createOrder);

      return loyalme.client({
        externalId: '123456',
        email: 'test@test.com',
        phone: '79031234567',
        name: 'Testname'
      }).then((user) => {
        return loyalme.order([{
          clientId: user.id,
          status: 'new',
          extOrderId: '123',
          amount: '10.00',
          products: [{
            quantity: 1,
            product_id: 2,
            price: '10.00'
          }]
        }, {
          clientId: user.id,
          status: 'new',
          extOrderId: '12345',
          amount: '10.00',
          products: [{
            quantity: 1,
            product_id: 2,
            price: '10.00'
          }]
        }])
      }).then(response => {
        return should.equal(response[1].ext_order_id, '12345');
      });
    });
  });

  describe('Update', () => {
    it('Should return object with property status equal update', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/client?external_id=123456')
        .reply(200, findByExternalId);
      nock('https://loyaltycrm.ru/api')
        .get('/order?ext_order_id=123')
        .reply(200, findByID1);
      nock('https://loyaltycrm.ru/api')
        .get('/order?ext_order_id=12345')
        .reply(200, findByID2);
      nock('https://loyaltycrm.ru/api')
        .put('/order/2')
        .reply(200, updateOrder);

      return loyalme.client({
        externalId: '123456',
        email: 'test@test.com',
        phone: '79031234567',
        name: 'Testname'
      }).then((user) => {
        return loyalme.order([{
          clientId: user.id,
          status: 'new',
          extOrderId: '123',
          amount: '10.00',
          products: [{
            quantity: 1,
            product_id: 2,
            price: '10.00'
          }]
        }, {
          clientId: user.id,
          status: 'update',
          extOrderId: '12345',
          amount: '10.00',
          products: [{
            quantity: 1,
            product_id: 2,
            price: '10.00'
          }]
        }])
      }).then(response => {
        return should.equal(response[1].status, 'update');
      });
    });
  });
});
