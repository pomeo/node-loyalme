import chai from 'chai';
import nock from 'nock';

import Loyalme      from '../src/main';
import activityList from './responses/activity/activityList.json';
import fireEvent    from './responses/activity/fireEvent.json';

describe('Activity', () => {
  const should = chai.should();
  const loyalme = Loyalme({
    url: 'loyaltycrm.ru/api',
    token: '12345',
    brandId: 1,
    pointId: 2,
    personId: 3,
    clientId: 4
  });

  describe('activityList', () => {
    it('Should return object with property system_name equal ordercreated', () => {
      nock('https://loyaltycrm.ru/api')
        .get('/activity/list')
        .reply(200, activityList);

      return loyalme
        .activityList()
        .then(response => {
          return should.equal(response[0].system_name, 'ordercreated');
        });
    });
  });

  describe('fireEvent', () => {
    it('Should return object with property client_id equal 123', () => {
      nock('https://loyaltycrm.ru/api')
        .post('/activity/fire-event')
        .reply(200, fireEvent);

      return loyalme.fireEvent({
        clientId: 123,
        clientHash: '1a42949f6c7d805112543a98203bac42',
        activityKey: 'ordercreated',
        activityCreatedAt: '2020-05-13 12:01:05'
      }).then(response => {
        return should.equal(response.client_id, 123);
      });
    });
  });
});
