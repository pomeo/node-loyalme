import chai    from 'chai';
import Loyalme from '../src/main';

describe('Loyalme', () => {
  const should = chai.should();
  const assert = chai.assert;

  describe('Initialize without parameters', () => {
    it('Should return "Missing url"', () => {
      (() => {
        const loyalme = Loyalme();
      }).should.throw('Missing url');
    });
  });

  describe('Initialize without url', () => {
    it('Should return "Missing url"', () => {
      (() => {
        const loyalme = Loyalme({
          token: 'qwerty',
          brandId: 1,
          pointId: 2,
          personId: 3,
          clientId: 4
        });
      }).should.throw('Missing url');
    });
  });

  describe('Initialize without token', () => {
    it('Should return "Missing token"', () => {
      (() => {
        const loyalme = Loyalme({
          url: 'google.com',
          brandId: 1,
          pointId: 2,
          personId: 3,
          clientId: 4
        });
      }).should.throw('Missing token');
    });
  });

  describe('Initialize without brandId', () => {
    it('Should return "Missing brand id"', () => {
      (() => {
        const loyalme = Loyalme({
          url: 'google.com',
          token: 'qwerty',
          pointId: 2,
          personId: 3,
          clientId: 4
        });
      }).should.throw('Missing brand id');
    });
  });

  describe('Initialize without pointId', () => {
    it('Should return "Missing point id"', () => {
      (() => {
        const loyalme = Loyalme({
          url: 'google.com',
          token: 'qwerty',
          brandId: 1,
          personId: 3,
          clientId: 4
        });
      }).should.throw('Missing point id');
    });
  });

  describe('Initialize without personId', () => {
    it('Should return "Missing person id"', () => {
      (() => {
        const loyalme = Loyalme({
          url: 'google.com',
          token: 'qwerty',
          brandId: 1,
          pointId: 2,
          clientId: 4
        });
      }).should.throw('Missing person id');
    });
  });

  describe('Initialize without clientId', () => {
    it('Should return "Missing client id"', () => {
      (() => {
        const loyalme = Loyalme({
          url: 'google.com',
          token: 'qwerty',
          brandId: 1,
          pointId: 2,
          personId: 3
        });
      }).should.throw('Missing client id');
    });
  });

  describe('Initialize with url, token, brandId, pointId, personId, clientId', () => {
    it('Should return object', () => {
      const loyalme = Loyalme({
        url: 'google.com',
        token: 'qwerty',
        brandId: 1,
        pointId: 2,
        personId: 3,
        clientId: 4
      });
      assert.typeOf(loyalme, 'object');
    });
  });
});
