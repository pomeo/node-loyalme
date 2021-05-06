import _ from 'lodash';
import got, { OptionsOfJSONResponseBody, Response } from 'got';

const api = '/order-status';

const reqOptions: OptionsOfJSONResponseBody = {
  headers: {},
  responseType: 'json',
  throwHttpErrors: false
}

function createOrderStatusObj(params: IParamsOrderStatus,
                              config: ILoyalmeConfig) {
  const reqObject: IOrderStatusRequest = {};
  if (params.title_en) {
    reqObject.title_en = params.title_en;
  }
  if (params.title_ru) {
    reqObject.title_ru = params.title_ru;
  }
  if (params.slug) {
    reqObject.slug = params.slug;
  }
  if (params.is_active !== undefined) {
    reqObject.is_active = params.is_active;
  }
  return reqObject;
}

async function getOrderStatus(params: {
  key: string
  value: string
  token: string
  url: string
}): Promise<Response<IOrderStatusResponse>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.searchParams = {};
  gotOptions.searchParams[params.key] = params.value;
  gotOptions.headers!.Authorization = `Bearer ${params.token}`;
  return await got.get(`https://${params.url}${api}`, gotOptions);
}

async function createOrderStatus(params: IParamsOrderStatus,
                                 config: ILoyalmeConfig): Promise<Response<IOrderStatusResponseOne>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  gotOptions.json = createOrderStatusObj(params, config);
  return await got.post(`https://${config.url}${api}`, gotOptions);
}

async function updateOrderStatus(params: IParamsOrderStatus,
                                 item: IOrderStatusDataResponse,
                                 config: ILoyalmeConfig): Promise<IOrderStatusDataResponse | undefined> {
  const newOrderStatusObj = createOrderStatusObj(params, config);
  const tmpOrderStatusObj = createOrderStatusObj(item, config);
  const oldOrderStatusObj = Object
    .keys(newOrderStatusObj)
    .reduce((result, key) => {
      if (typeof tmpOrderStatusObj[key] !== 'undefined') {
        result[key] = tmpOrderStatusObj[key];
      }
      return result;
    }, {} as IOrderStatusRequest);
  if (_.isEqual(newOrderStatusObj, oldOrderStatusObj)) {
    return item;
  } else {
    const gotOptions = Object.assign({}, reqOptions);
    gotOptions.headers!.Authorization = `Bearer ${config.token}`;
    gotOptions.json = newOrderStatusObj;
    const response = await got.put(`https://${config.url}${api}/${item.id}`, gotOptions) as Response<IOrderStatusResponseOne>;
    return response.body.data;
  }
}

export async function orderStatus(status: IParamsOrderStatus[],
                                  config: ILoyalmeConfig) {
  const arr: IOrderStatusDataResponse[] = [];

  for (const item of status) {
    const response = await getOrderStatus({
      key: 'slug',
      value: item.slug,
      token: config.token,
      url: config.url
    })

    if (response.body?.data?.[0]) {
      const pStatus = await updateOrderStatus(item, response.body.data[0], config);
      if (pStatus) {
        arr.push(pStatus)
      }
    } else {
      const { body } = await createOrderStatus(item, config);
      if (body?.data) {
        const pStatus = body.data;
        arr.push(pStatus);
      }
    }
  }

  return arr;
}
