import chai from 'chai';
import nock from 'nock';

import Loyalme             from '../src/main';
import createPaymentStatus from './responses/paymentStatus/create.json';
import updatePaymentStatus from './responses/paymentStatus/update.json';
import findBySlug1         from './responses/paymentStatus/findBySlug1.json';
import findBySlug2         from './responses/paymentStatus/findBySlug2.json';
import notFound            from './responses/paymentStatus/notFound.json';

describe('Payment status', () => {
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
    it('Should return object with property title_en equal Paid', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/payment-status?slug=paid')
        .reply(200, findBySlug1);

      return loyalme.paymentStatus([{
        title_en: 'Paid',
        slug: 'paid'
      }]).then(response => {
        return should.equal(response[0].title_en, 'Paid');
      });
    });
  });

  describe('Create', () => {
    it('Should return object with property title_en equal Test', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/payment-status?slug=paid')
        .reply(200, findBySlug1);
      nock('https://loyaltycrm.ru/api')
        .get('/payment-status?slug=test')
        .reply(200, notFound);
      nock('https://loyaltycrm.ru/api')
        .post('/payment-status')
        .reply(200, createPaymentStatus);

      return loyalme.paymentStatus([{
        title_en: 'Paid',
        slug: 'paid'
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
        .get('/payment-status?slug=paid')
        .reply(200, findBySlug1);
      nock('https://loyaltycrm.ru/api')
        .get('/payment-status?slug=pending')
        .reply(200, findBySlug2);
      nock('https://loyaltycrm.ru/api')
        .put('/payment-status/2')
        .reply(200, updatePaymentStatus);

      return loyalme.paymentStatus([{
        title_en: 'Paid',
        slug: 'paid'
      }, {
        title_en: 'Updated',
        slug: 'pending'
      }]).then(response => {
        return should.equal(response[1].title_en, 'Updated');
      });
    });
  });
});
