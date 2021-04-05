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
          brandId: 0,
          pointId: 0,
          personId: 0
        });
      }).should.throw('Missing url');
    });
  });

  describe('Initialize without token', () => {
    it('Should return "Missing token"', () => {
      (() => {
        const loyalme = Loyalme({
          url: 'google.com',
          brandId: 0,
          pointId: 0,
          personId: 0
        });
      }).should.throw('Missing token');
    });
  });

  describe('Initialize without brandId', () => {
    it('Should return "Missing brandId"', () => {
      (() => {
        const loyalme = Loyalme({
          url: 'google.com',
          token: 'qwerty',
          pointId: 0,
          personId: 0
        });
      }).should.throw('Missing brand id');
    });
  });

  describe('Initialize with url, token, brandId, pointId, personId', () => {
    it('Should return object', () => {
      const loyalme = Loyalme({
        url: 'google.com',
        token: 'qwerty',
        brandId: 0,
        pointId: 0,
        personId: 0
      });
      assert.typeOf(loyalme, 'object');
    });
  });
});
