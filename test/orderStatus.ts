import chai from 'chai';
import nock from 'nock';

import Loyalme           from '../src/main';
import createOrderStatus from './responses/orderStatus/create.json';
import updateOrderStatus from './responses/orderStatus/update.json';
import findBySlug1       from './responses/orderStatus/findBySlug1.json';
import findBySlug2       from './responses/orderStatus/findBySlug2.json';
import notFound          from './responses/orderStatus/notFound.json';

describe('Order status', () => {
  const should = chai.should();
  const loyalme = Loyalme({
    url: 'loyaltycrm.ru/api',
    token: '12345',
    brandId: 1,
    pointId: 2,
    personId: 3,
    clientId: 4
  });

  describe('Search by slug', () => {
    it('Should return object with property title_en equal TestName', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/order-status?slug=testname')
        .reply(200, findBySlug1);

      return loyalme.orderStatus([{
        title_en: 'TestName',
        slug: 'testname'
      }]).then(response => {
        return should.equal(response[0].title_en, 'TestName');
      });
    });
  });

  describe('Create', () => {
    it('Should return object with property title_en equal Test', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/order-status?slug=testname')
        .reply(200, findBySlug1);
      nock('https://loyaltycrm.ru/api')
        .get('/order-status?slug=test')
        .reply(200, notFound);
      nock('https://loyaltycrm.ru/api')
        .post('/order-status')
        .reply(200, createOrderStatus);

      return loyalme.orderStatus([{
        title_en: 'TestName',
        slug: 'testname'
      }, {
        title_en: 'Test',
        title_ru: 'Тест',
        slug: 'test',
        is_active: 1
      }]).then(response => {
        return should.equal(response[1].title_en, 'Test');
      });
    });
  });

  describe('Update', () => {
    it('Should return object with property title_en equal Updated', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/order-status?slug=testname')
        .reply(200, findBySlug1);
      nock('https://loyaltycrm.ru/api')
        .get('/order-status?slug=testname2')
        .reply(200, findBySlug2);
      nock('https://loyaltycrm.ru/api')
        .put('/order-status/2')
        .reply(200, updateOrderStatus);

      return loyalme.orderStatus([{
        title_en: 'TestName',
        slug: 'testname'
      }, {
        title_en: 'Updated',
        slug: 'testname2'
      }]).then(response => {
        return should.equal(response[1].title_en, 'Updated');
      });
    });
  });
});
