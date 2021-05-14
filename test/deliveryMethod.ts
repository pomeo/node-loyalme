import chai from 'chai';
import nock from 'nock';

import Loyalme              from '../src/main';
import createDeliveryMethod from './responses/deliveryMethod/create.json';
import updateDeliveryMethod from './responses/deliveryMethod/update.json';
import findBySlug1          from './responses/deliveryMethod/findBySlug1.json';
import findBySlug2          from './responses/deliveryMethod/findBySlug2.json';
import notFound             from './responses/deliveryMethod/notFound.json';

describe('Delivery method', () => {
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
        .get('/delivery-method?slug=testname')
        .reply(200, findBySlug1);

      return loyalme.deliveryMethod([{
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
        .get('/delivery-method?slug=testname')
        .reply(200, findBySlug1);
      nock('https://loyaltycrm.ru/api')
        .get('/delivery-method?slug=test')
        .reply(200, notFound);
      nock('https://loyaltycrm.ru/api')
        .post('/delivery-method')
        .reply(200, createDeliveryMethod);

      return loyalme.deliveryMethod([{
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
        .get('/delivery-method?slug=testname')
        .reply(200, findBySlug1);
      nock('https://loyaltycrm.ru/api')
        .get('/delivery-method?slug=testname2')
        .reply(200, findBySlug2);
      nock('https://loyaltycrm.ru/api')
        .put('/delivery-method/2')
        .reply(200, updateDeliveryMethod);

      return loyalme.deliveryMethod([{
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
