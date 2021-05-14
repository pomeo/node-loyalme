import chai from 'chai';
import nock from 'nock';

import Loyalme             from '../src/main';
import createPaymentMethod from './responses/paymentMethod/create.json';
import updatePaymentMethod from './responses/paymentMethod/update.json';
import findBySlug1         from './responses/paymentMethod/findBySlug1.json';
import findBySlug2         from './responses/paymentMethod/findBySlug2.json';
import notFound            from './responses/paymentMethod/notFound.json';

describe('Payment method', () => {
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
        .get('/payment-method?slug=testname')
        .reply(200, findBySlug1);

      return loyalme.paymentMethod([{
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
        .get('/payment-method?slug=testname')
        .reply(200, findBySlug1);
      nock('https://loyaltycrm.ru/api')
        .get('/payment-method?slug=test')
        .reply(200, notFound);
      nock('https://loyaltycrm.ru/api')
        .post('/payment-method')
        .reply(200, createPaymentMethod);

      return loyalme.paymentMethod([{
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
        .get('/payment-method?slug=testname')
        .reply(200, findBySlug1);
      nock('https://loyaltycrm.ru/api')
        .get('/payment-method?slug=testname2')
        .reply(200, findBySlug2);
      nock('https://loyaltycrm.ru/api')
        .put('/payment-method/2')
        .reply(200, updatePaymentMethod);

      return loyalme.paymentMethod([{
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
