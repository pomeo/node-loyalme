import _ from 'lodash';
import got, { OptionsOfJSONResponseBody, Response } from 'got';

const api = '/delivery-method';

const reqOptions: OptionsOfJSONResponseBody = {
  headers: {},
  responseType: 'json',
  throwHttpErrors: false
}

function createDeliveryMethodObj(params: IParamsDeliveryMethod,
                                 config: ILoyalmeConfig) {
  const reqObject: IDeliveryMethodRequest = {};
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

async function getDeliveryMethod(params: {
  key: string
  value: string
  token: string
  url: string
}): Promise<Response<IDeliveryMethodResponse>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.searchParams = {};
  gotOptions.searchParams[params.key] = params.value;
  gotOptions.headers!.Authorization = `Bearer ${params.token}`;
  return await got.get(`https://${params.url}${api}`, gotOptions);
}

async function createDeliveryMethod(params: IParamsDeliveryMethod,
                                    config: ILoyalmeConfig): Promise<Response<IDeliveryMethodResponseOne>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  gotOptions.json = createDeliveryMethodObj(params, config);
  return await got.post(`https://${config.url}${api}`, gotOptions);
}

async function updateDeliveryMethod(params: IParamsOrderStatus,
                                    item: IOrderStatusDataResponse,
                                    config: ILoyalmeConfig): Promise<IOrderStatusDataResponse | undefined> {
  const newDeliveryMethodObj = createDeliveryMethodObj(params, config);
  const tmpDeliveryMethodObj = createDeliveryMethodObj(item, config);
  const oldDeliveryMethodObj = Object
    .keys(newDeliveryMethodObj)
    .reduce((result, key) => {
      if (typeof tmpDeliveryMethodObj[key] !== 'undefined') {
        result[key] = tmpDeliveryMethodObj[key];
      }
      return result;
    }, {} as IDeliveryMethodRequest);
  if (_.isEqual(newDeliveryMethodObj, oldDeliveryMethodObj)) {
    return item;
  } else {
    const gotOptions = Object.assign({}, reqOptions);
    gotOptions.headers!.Authorization = `Bearer ${config.token}`;
    gotOptions.json = newDeliveryMethodObj;
    const response = await got.put(`https://${config.url}${api}/${item.id}`, gotOptions) as Response<IDeliveryMethodResponseOne>;
    if (response.body.data) {
      return response.body.data;
    } else {
      throw new Error(JSON.stringify(response.body, null, 2));
    }
  }
}

export async function deliveryMethod(status: IParamsDeliveryMethod[],
                                     config: ILoyalmeConfig) {
  const arr: IDeliveryMethodDataResponse[] = [];

  for (const item of status) {
    const response = await getDeliveryMethod({
      key: 'slug',
      value: item.slug,
      token: config.token,
      url: config.url
    })

    if (response.body?.data?.[0]) {
      const pMethod = await updateDeliveryMethod(item, response.body.data[0], config);
      if (pMethod) {
        arr.push(pMethod)
      }
    } else {
      const { body } = await createDeliveryMethod(item, config);
      if (body?.data) {
        const pMethod = body.data;
        arr.push(pMethod);
      } else {
        throw new Error(JSON.stringify(body, null, 2));
      }
    }
  }

  return arr;
}
