import chai from 'chai';
import nock from 'nock';

import Loyalme     from '../src/main';
import createOrder from './responses/order/create.json';
import updateOrder from './responses/order/update.json';
import findByID1   from './responses/order/findByID1.json';
import findByID2   from './responses/order/findByID2.json';
import notFound    from './responses/order/notFound.json';

describe('Order', () => {
  const should = chai.should();
  const loyalme = Loyalme({
    url: 'loyaltycrm.ru/api',
    token: '12345',
    brandId: 1,
    pointId: 2,
    personId: 3,
    clientId: 4
  });

  describe('Search by ID', () => {
    it('Should return object with property ext_order_id equal 123', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/order?ext_order_id=123')
        .reply(200, findByID1);

      return loyalme.order([{
        extOrderId: '123'
      }]).then(response => {
        return should.equal(response[0].ext_order_id, '123');
      });
    });
  });

  describe('Create', () => {
    it('Should return object with property ext_order_id equal 123', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/order?ext_order_id=123')
        .reply(200, findByID1);
      nock('https://loyaltycrm.ru/api')
        .get('/order?ext_order_id=12345')
        .reply(200, notFound);
      nock('https://loyaltycrm.ru/api')
        .post('/order')
        .reply(200, createOrder);

      return loyalme.order([{
        status: 'new',
        extOrderId: '123',
        amount: '10.00',
        products: [{
          quantity: 1,
          product_id: 2,
          price: '10.00'
        }]
      }, {
        status: 'new',
        extOrderId: '12345',
        amount: '10.00',
        products: [{
          quantity: 1,
          product_id: 2,
          price: '10.00'
        }]
      }]).then(response => {
        return should.equal(response[1].ext_order_id, '12345');
      });
    });
  });

  describe('Update', () => {
    it('Should return object with property status equal update', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/order?ext_order_id=123')
        .reply(200, findByID1);
      nock('https://loyaltycrm.ru/api')
        .get('/order?ext_order_id=12345')
        .reply(200, findByID2);
      nock('https://loyaltycrm.ru/api')
        .put('/order/2')
        .reply(200, updateOrder);

      return loyalme.order([{
        status: 'new',
        extOrderId: '123',
        amount: '10.00',
        products: [{
          quantity: 1,
          product_id: 2,
          price: '10.00'
        }]
      }, {
        status: 'update',
        extOrderId: '12345',
        amount: '10.00',
        products: [{
          quantity: 1,
          product_id: 2,
          price: '10.00'
        }]
      }]).then(response => {
        return should.equal(response[1].status, 'update');
      });
    });
  });
});
