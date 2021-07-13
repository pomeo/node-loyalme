import _ from 'lodash';
import got, { OptionsOfJSONResponseBody, Response } from 'got';

const api = '/payment-method';

const reqOptions: OptionsOfJSONResponseBody = {
  headers: {},
  responseType: 'json',
  throwHttpErrors: false
}

function createPaymentMethodObj(params: IParamsPaymentMethod,
                                config: ILoyalmeConfig) {
  const reqObject: IPaymentMethodRequest = {};
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

async function getPaymentMethod(params: {
  key: string
  value: string
  token: string
  url: string
}): Promise<Response<IPaymentMethodResponse>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.searchParams = {};
  gotOptions.searchParams[params.key] = params.value;
  gotOptions.headers!.Authorization = `Bearer ${params.token}`;
  return await got.get(`https://${params.url}${api}`, gotOptions);
}

async function createPaymentMethod(params: IParamsPaymentMethod,
                                   config: ILoyalmeConfig): Promise<Response<IPaymentMethodResponseOne>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  gotOptions.json = createPaymentMethodObj(params, config);
  return await got.post(`https://${config.url}${api}`, gotOptions);
}

async function updatePaymentMethod(params: IParamsPaymentMethod,
                                   item: IPaymentMethodDataResponse,
                                   config: ILoyalmeConfig): Promise<IPaymentMethodDataResponse | undefined> {
  const newPaymentMethodObj = createPaymentMethodObj(params, config);
  const tmpPaymentMethodObj = createPaymentMethodObj(item, config);
  const oldPaymentMethodObj = Object
    .keys(newPaymentMethodObj)
    .reduce((result, key) => {
      if (typeof tmpPaymentMethodObj[key] !== 'undefined') {
        result[key] = tmpPaymentMethodObj[key];
      }
      return result;
    }, {} as IPaymentMethodRequest);
  if (_.isEqual(newPaymentMethodObj, oldPaymentMethodObj)) {
    return item;
  } else {
    const gotOptions = Object.assign({}, reqOptions);
    gotOptions.headers!.Authorization = `Bearer ${config.token}`;
    gotOptions.json = newPaymentMethodObj;
    const response = await got.put(`https://${config.url}${api}/${item.id}`, gotOptions) as Response<IPaymentMethodResponseOne>;
    if (response.body.data) {
      return response.body.data;
    } else {
      throw new Error(JSON.stringify(response.body, null, 2));
    }
  }
}

export async function paymentMethod(method: IParamsPaymentMethod[],
                                    config: ILoyalmeConfig) {
  const arr: IPaymentMethodDataResponse[] = [];

  for (const item of method) {
    const response = await getPaymentMethod({
      key: 'slug',
      value: item.slug,
      token: config.token,
      url: config.url
    })

    if (response.body?.data?.[0]) {
      const pMethod = await updatePaymentMethod(item, response.body.data[0], config);
      if (pMethod) {
        arr.push(pMethod)
      }
    } else {
      const { body } = await createPaymentMethod(item, config);
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
