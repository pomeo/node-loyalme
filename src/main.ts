/**
 * cspell:ignore Loyalme
 */
import { client } from './api/client';
import { category } from './api/category';
import { product } from './api/product';
import { activityList,
         fireEvent,
         cancelEvent } from './api/activity';
import { paymentStatus } from './api/paymentStatus';
import { paymentMethod } from './api/paymentMethod';
import { orderStatus } from './api/orderStatus';

class Loyalme {

  url: string
  token: string
  brandId: number
  pointId: number
  personId: number

  constructor(params: {
    url: string
    token: string
    brandId: number
    pointId: number
    personId: number
  }) {
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

  client(params: {
    externalId?: string
    email?: string
    phone?: string
    name?: string
    middleName?: string
    lastName?: string
    fingerprint?: string
    birthdate?: string
    gender?: 0 | 1
    otherPhones?: string[]
    otherPhonesValidate?: number[]
    otherPhonesSubscribe?: number[]
    otherEmails?: string[]
    otherEmailsValidate?: number[]
    otherEmailsSubscribe?: number[]
    attribute?: { [key: string]: string }
  }) {
    return client(params, {
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

  activityList() {
    return activityList({
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  cancelEvent() {
    return cancelEvent({
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }

  fireEvent() {
    return fireEvent({
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

  orderStatus(method: IParamsOrderStatus[]) {
    return orderStatus(status, {
      url: this.url,
      token: this.token,
      pointId: this.pointId,
      brandId: this.brandId,
      personId: this.personId
    });
  }
}

export default (params: {
  url: string
  token: string
  brandId: number
  pointId: number
  personId: number
}) => new Loyalme(params);
