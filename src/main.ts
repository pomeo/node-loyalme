/**
 * cspell:ignore Loyalme
 */
import { client,
         clientFingerprint } from './api/client';
import { category } from './api/category';
import { product } from './api/product';
import { order } from './api/order';
import { activityList,
         fireEvent,
         cancelEvent } from './api/activity';
import { paymentStatus } from './api/paymentStatus';
import { paymentMethod } from './api/paymentMethod';
import { orderStatus } from './api/orderStatus';
import { promocode } from './api/promocode';
import { deliveryMethod } from './api/deliveryMethod';

class Loyalme {

  url: string
  token: string
  brandId: number
  pointId: number
  personId: number
  clientId: number

  constructor(params: ILoyalmeConfig) {
    const _params = params || {};
    if (!_params.url) throw new Error('Missing url');
    if (!_params.token) throw new Error('Missing token');
    if (isNaN(_params.brandId)) throw new Error('Missing brand id');
    if (isNaN(_params.pointId)) throw new Error('Missing point id');
    if (isNaN(_params.personId)) throw new Error('Missing person id');
    if (isNaN(_params.clientId)) throw new Error('Missing client id');

    this.url = _params.url;
    this.token = _params.token;
    this.brandId = _params.brandId;
    this.pointId = _params.pointId;
    this.personId = _params.personId;
    this.clientId = _params.clientId;
  }

  client(params: IParamsClient) {
    return client(params, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId,
      clientId: this.clientId
    });
  }

  clientFingerprint(params: IParamsClientFingerprint) {
    return clientFingerprint(params, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId,
      clientId: this.clientId
    });
  }

  category(params: IParamsCategory[]) {
    return category(params, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId,
      clientId: this.clientId
    });
  }

  product(products: IParamsProduct[],
          categories: IParamsCategory[]) {
    return product(products, categories, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId,
      clientId: this.clientId
    }, this);
  }

  activityList() {
    return activityList({
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId,
      clientId: this.clientId
    });
  }

  cancelEvent(params: IParamsCancelEvent) {
    return cancelEvent(params, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId,
      clientId: this.clientId
    });
  }

  fireEvent(params: IParamsFireEvent) {
    return fireEvent(params, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId,
      clientId: this.clientId
    });
  }

  paymentStatus(status: IParamsPaymentStatus[]) {
    return paymentStatus(status, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId,
      clientId: this.clientId
    });
  }

  paymentMethod(method: IParamsPaymentMethod[]) {
    return paymentMethod(method, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId,
      clientId: this.clientId
    });
  }

  orderStatus(status: IParamsOrderStatus[]) {
    return orderStatus(status, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId,
      clientId: this.clientId
    });
  }

  promocode(promo: IParamsPromocode[]) {
    return promocode(promo, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId,
      clientId: this.clientId
    });
  }

  order(orders: IParamsOrder[]) {
    return order(orders, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId,
      clientId: this.clientId
    });
  }

  deliveryMethod(delivery: IParamsDeliveryMethod[]) {
    return deliveryMethod(delivery, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId,
      clientId: this.clientId
    });
  }
}

export default (params: ILoyalmeConfig) => new Loyalme(params);
