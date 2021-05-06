import _ from 'lodash';
import got, { OptionsOfJSONResponseBody, Response } from 'got';

const api = '/payment-status';

const reqOptions: OptionsOfJSONResponseBody = {
  headers: {},
  responseType: 'json',
  throwHttpErrors: false
}

function createPaymentStatusObj(params: IParamsPaymentStatus,
                                config: ILoyalmeConfig) {
  const reqObject: IPaymentStatusRequest = {};
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

async function getPaymentStatus(params: {
  key: string
  value: string
  token: string
  url: string
}): Promise<Response<IPaymentStatusResponse>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.searchParams = {};
  gotOptions.searchParams[params.key] = params.value;
  gotOptions.headers!.Authorization = `Bearer ${params.token}`;
  return await got.get(`https://${params.url}${api}`, gotOptions);
}

async function createPaymentStatus(params: IParamsPaymentStatus,
                                   config: ILoyalmeConfig): Promise<Response<IPaymentStatusResponseOne>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  gotOptions.json = createPaymentStatusObj(params, config);
  return await got.post(`https://${config.url}${api}`, gotOptions);
}

async function updatePaymentStatus(params: IParamsPaymentStatus,
                                   item: IPaymentStatusDataResponse,
                                   config: ILoyalmeConfig): Promise<IPaymentStatusDataResponse | undefined> {
  const newPaymentStatusObj = createPaymentStatusObj(params, config);
  const tmpPaymentStatusObj = createPaymentStatusObj(item, config);
  const oldPaymentStatusObj = Object
    .keys(newPaymentStatusObj)
    .reduce((result, key) => {
      if (typeof tmpPaymentStatusObj[key] !== 'undefined') {
        result[key] = tmpPaymentStatusObj[key];
      }
      return result;
    }, {} as IPaymentStatusRequest);
  if (_.isEqual(newPaymentStatusObj, oldPaymentStatusObj)) {
    return item;
  } else {
    const gotOptions = Object.assign({}, reqOptions);
    gotOptions.headers!.Authorization = `Bearer ${config.token}`;
    gotOptions.json = newPaymentStatusObj;
    const response = await got.put(`https://${config.url}${api}/${item.id}`, gotOptions) as Response<IPaymentStatusResponseOne>;
    return response.body.data;
  }
}

export async function paymentStatus(status: IParamsPaymentStatus[],
                                    config: ILoyalmeConfig) {
  const arr: IPaymentStatusDataResponse[] = [];

  for (const item of status) {
    const response = await getPaymentStatus({
      key: 'slug',
      value: item.slug,
      token: config.token,
      url: config.url
    })

    if (response.body?.data?.[0]) {
      const pStatus = await updatePaymentStatus(item, response.body.data[0], config);
      if (pStatus) {
        arr.push(pStatus)
      }
    } else {
      const { body } = await createPaymentStatus(item, config);
      if (body?.data) {
        const pStatus = body.data;
        arr.push(pStatus);
      }
    }
  }

  return arr;
}
