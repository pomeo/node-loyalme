import chai from 'chai';
import nock from 'nock';

import Loyalme           from '../src/main';
import createClient      from './responses/client/create.json';
import updateClient      from './responses/client/update.json';
import findByFingerprint from './responses/client/findByFingerprint.json';
import emptyFingerprint  from './responses/client/emptyFingerprint.json';
import findByExternalId  from './responses/client/findByExternalId.json';
import findByEmail       from './responses/client/findByEmail.json';
import findByEmailSub    from './responses/client/findByEmailSubscriber.json';
import findByPhone       from './responses/client/findByPhone.json';
import mergeHash         from './responses/client/mergeHash.json';
import notFound          from './responses/client/notFound.json';
import errorClient       from './responses/client/error.json';

describe('Client', () => {
  const should = chai.should();
  const loyalme = Loyalme({
    url: 'loyaltycrm.ru/api',
    token: '12345',
    brandId: 1,
    pointId: 2,
    personId: 3,
    clientId: 4
  });

  describe('Search by client_hash, external_id, email, name subscriber', () => {
    it('Should return object with property client_hash equal 123456', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/client?client_hash=123456')
        .reply(200, findByFingerprint);

      return loyalme.client({
        fingerprint: '123456',
        email: 'test@test.com',
        phone: '79031234567',
        name: 'Testname'
      }).then(response => {
        return should.equal(response.client_hash[0].client_hash, '123456');
      });
    });

    it('Should return object with property email equal test@test.com', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/client?email=test@test.com')
        .reply(200, findByEmailSub);

      return loyalme.client({
        fingerprint: '123456',
        email: 'test@test.com',
        phone: '79031234567',
        name: 'subscriber'
      }).then(response => {
        return should.equal(response.email, 'test@test.com');
      });
    });

    it('Should return object with property external_id equal 123456', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/client?external_id=123456')
        .reply(200, findByExternalId);

      return loyalme.client({
        externalId: '123456',
        email: 'test@test.com',
        phone: '79031234567',
        name: 'Testname'
      }).then(response => {
        return should.equal(response.external_id, '123456');
      });
    });

    it('Should return object with property email equal test@test.com', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/client?email=test@test.com')
        .reply(200, findByEmail);

      return loyalme.client({
        email: 'test@test.com',
        phone: '79031234567',
        name: 'Testname'
      }).then(response => {
        return should.equal(response.email, 'test@test.com');
      });
    });

    it('Should return object with property phone equal 79031234567', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/client?phone=79031234567')
        .reply(200, findByEmail);

      return loyalme.client({
        phone: '79031234567',
        name: 'Testname'
      }).then(response => {
        return should.equal(response.phone, '79031234567');
      });
    });
  });

  describe('Merge', () => {
    it('Should return object with property client_hash equal 123456', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/client?client_hash=123456')
        .reply(404, notFound);
      nock('https://loyaltycrm.ru/api')
        .get('/client?email=test@test.com')
        .reply(200, emptyFingerprint);
      nock('https://loyaltycrm.ru/api')
        .post('/client/123/merge/123456')
        .reply(200, mergeHash);
      nock('https://loyaltycrm.ru/api')
        .get('/client?client_hash=123456')
        .reply(200, findByFingerprint);

      return loyalme.client({
        fingerprint: '123456',
        email: 'test@test.com',
        name: 'Testname'
      }).then(response => {
        return should.equal(response.client_hash[0].client_hash, '123456');
      });
    });
  });

  describe('Create', () => {
    it('Should return object with property name equal Nametest', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/client?phone=79031234567')
        .reply(404, notFound);
      nock('https://loyaltycrm.ru/api')
        .get('/client?email=test@test.com')
        .reply(404, notFound);
      nock('https://loyaltycrm.ru/api')
        .get('/client?client_hash=123456')
        .reply(404, notFound);
      nock('https://loyaltycrm.ru/api')
        .post('/client')
        .reply(200, createClient);

      return loyalme.client({
        fingerprint: '123456',
        email: 'test@test.com',
        phone: '79031234567',
        name: 'Nametest'
      }).then(response => {
        return should.equal(response.name, 'Nametest');
      });
    });
  });

  describe('Update', () => {
    it('Should return object with property name equal Newname', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/client?phone=79031234567')
        .reply(200, findByPhone);
      nock('https://loyaltycrm.ru/api')
        .put('/client/123')
        .reply(200, updateClient);

      return loyalme.client({
        phone: '79031234567',
        name: 'Newname'
      }).then(response => {
        return should.equal(response.name, 'Newname');
      });
    });
  });

  describe('Error', () => {
    it('Should throw error', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/client?phone=79031234567')
        .reply(200, findByPhone);
      nock('https://loyaltycrm.ru/api')
        .put('/client/123')
        .reply(400, errorClient);

      return loyalme.client({
        phone: '79031234567',
        name: 'Newname'
      }).then(response => {
        return response;
      }).catch((err) => {
        return should.equal(err instanceof Error, true);
      })
    });
  });
});
