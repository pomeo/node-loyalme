/**
 * cspell:ignore Loyalme
 */
import { client,
         clientFingerprint,
         clientDelete } from './api/client';
import { category } from './api/category';
import { product,
         productDelete } from './api/product';
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

  constructor(params: ILoyalmeConfig) {
    const _params = params || {};
    if (!_params.url) throw new Error('Missing url');
    if (!_params.token) throw new Error('Missing token');
    if (isNaN(_params.brandId)) throw new Error('Missing brand id');
    if (isNaN(_params.pointId)) throw new Error('Missing point id');
    if (isNaN(_params.personId)) throw new Error('Missing person id');

    this.url = _params.url;
    this.token = _params.token;
    this.brandId = _params.brandId;
    this.pointId = _params.pointId;
    this.personId = _params.personId;
  }

  client(params: IParamsClient) {
    return client(params, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  clientFingerprint(params: IParamsClientFingerprint) {
    return clientFingerprint(params, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  clientDelete(params: IParamsClient) {
    return clientDelete(params, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  category(params: IParamsCategory[]) {
    return category(params, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  product(products: IParamsProduct[],
          categories: IParamsCategory[]) {
    return product(products, categories, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    }, this);
  }

  productDelete(products: IParamsProduct[]) {
    return productDelete(products, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  activityList() {
    return activityList({
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  cancelEvent(params: IParamsCancelEvent) {
    return cancelEvent(params, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  fireEvent(params: IParamsFireEvent) {
    return fireEvent(params, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  paymentStatus(status: IParamsPaymentStatus[]) {
    return paymentStatus(status, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  paymentMethod(method: IParamsPaymentMethod[]) {
    return paymentMethod(method, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  orderStatus(status: IParamsOrderStatus[]) {
    return orderStatus(status, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  promocode(promo: IParamsPromocode[]) {
    return promocode(promo, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  order(orders: IParamsOrder[]) {
    return order(orders, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  deliveryMethod(delivery: IParamsDeliveryMethod[]) {
    return deliveryMethod(delivery, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }
}

export default (params: ILoyalmeConfig) => new Loyalme(params);
