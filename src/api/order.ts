import _ from 'lodash';
import got, { OptionsOfJSONResponseBody, Response } from 'got';

const api = '/order';

const reqOptions: OptionsOfJSONResponseBody = {
  headers: {},
  responseType: 'json',
  throwHttpErrors: false
}

function createOrderObj(params: IParamsOrder,
                        config: ILoyalmeConfig) {
  const reqObject: IOrderRequest = {
    client_id: config.clientId,
    person_id: config.personId,
    point_id: config.pointId
  };
  if (params.status) {
    reqObject.status = params.status;
  }
  if (params.extOrderId !== undefined) {
    reqObject.ext_order_id = params.extOrderId;
  }
  if (params.ext_order_id !== undefined) {
    reqObject.ext_order_id = params.ext_order_id;
  }
  if (params.paymentType) {
    reqObject.payment_type = params.paymentType;
  }
  if (params.payment_type) {
    reqObject.payment_type = params.payment_type;
  }
  if (params.shippingType) {
    reqObject.shipping_type = params.shippingType;
  }
  if (params.shipping_type) {
    reqObject.shipping_type = params.shipping_type;
  }
  if (params.promoCode) {
    reqObject.promo_code = params.promoCode;
  }
  if (params.promo_code) {
    reqObject.promo_code = params.promo_code;
  }
  if (params.orderLink) {
    reqObject.order_link = params.orderLink;
  }
  if (params.order_link) {
    reqObject.order_link = params.order_link;
  }
  if (params.paymentStatusId !== undefined) {
    reqObject.payment_status_id = params.paymentStatusId;
  }
  if (params.payment_status_id !== undefined) {
    reqObject.payment_status_id = params.payment_status_id;
  }
  if (params.products) {
    reqObject.products = params.products;
  }
  return reqObject;
}

async function getOrder(params: {
  key: string
  value: number
  token: string
  url: string
}): Promise<Response<IOrderResponse>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.searchParams = {};
  gotOptions.searchParams[params.key] = params.value;
  gotOptions.headers!.Authorization = `Bearer ${params.token}`;
  return await got.get(`https://${params.url}${api}`, gotOptions);
}

async function createOrder(params: IParamsOrder,
                           config: ILoyalmeConfig): Promise<Response<IOrderResponseOne>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  gotOptions.json = createOrderObj(params, config);
  return await got.post(`https://${config.url}${api}`, gotOptions);
}

async function updateOrder(params: IParamsOrder,
                           item: IOrderDataResponse,
                           config: ILoyalmeConfig): Promise<IOrderDataResponse | undefined> {
  const newOrderObj = createOrderObj(params, config);
  const tmpOrderObj = createOrderObj(item, config);
  const oldOrderObj = Object
    .keys(newOrderObj)
    .reduce((result, key) => {
      if (typeof tmpOrderObj[key] !== 'undefined') {
        result[key] = tmpOrderObj[key];
      }
      return result;
    }, {} as IOrderRequest);
  if (_.isEqual(newOrderObj, oldOrderObj)) {
    return item;
  } else {
    const gotOptions = Object.assign({}, reqOptions);
    gotOptions.headers!.Authorization = `Bearer ${config.token}`;
    gotOptions.json = newOrderObj;
    const response = await got.put(`https://${config.url}${api}/${item.id}`, gotOptions) as Response<IOrderResponseOne>;
    if (response.body.data) {
      return response.body.data;
    } else {
      throw new Error(JSON.stringify(response.body, null, 2));
    }
  }
}

export async function order(orders: IParamsOrder[],
                            config: ILoyalmeConfig) {
  const arr: IOrderDataResponse[] = [];

  for (const item of orders) {
    const response = await getOrder({
      key: 'ext_order_id',
      value: item.extOrderId!,
      token: config.token,
      url: config.url
    })

    if (response.body?.data?.[0]) {
      const tOrder = await updateOrder(item, response.body.data[0], config);
      if (tOrder) {
        arr.push(tOrder)
      }
    } else {
      const { body } = await createOrder(item, config);
      if (body?.data) {
        const tOrder = body.data;
        arr.push(tOrder);
      } else {
        throw new Error(JSON.stringify(body, null, 2));
      }
    }
  }

  return arr;
}
