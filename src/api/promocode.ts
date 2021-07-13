import _ from 'lodash';
import got, { OptionsOfJSONResponseBody, Response } from 'got';

const api = '/promocode';

const reqOptions: OptionsOfJSONResponseBody = {
  headers: {},
  responseType: 'json',
  throwHttpErrors: false
}

function createPromocodeObj(params: IParamsPromocode,
                            config: ILoyalmeConfig) {
  const reqObject: IPromocodeRequest = {};
  if (params.code) {
    reqObject.code = params.code;
  }
  if (params.activeFrom) {
    reqObject.active_from = params.activeFrom;
  }
  if (params.active_from) {
    reqObject.active_from = params.active_from;
  }
  if (params.activeTo) {
    reqObject.active_to = params.activeTo;
  }
  if (params.active_to) {
    reqObject.active_to = params.active_to;
  }
  if (params.status) {
    reqObject.status = params.status;
  }
  if (params.description) {
    reqObject.description = params.description;
  }
  return reqObject;
}

async function getPromocode(params: {
  key: string
  value: string
  token: string
  url: string
}): Promise<Response<IPromocodeResponse>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.searchParams = {};
  gotOptions.searchParams[params.key] = params.value;
  gotOptions.headers!.Authorization = `Bearer ${params.token}`;
  return await got.get(`https://${params.url}${api}`, gotOptions);
}

async function createPromocode(params: IParamsPromocode,
                               config: ILoyalmeConfig): Promise<Response<IPromocodeResponseOne>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  gotOptions.json = createPromocodeObj(params, config);
  return await got.post(`https://${config.url}${api}`, gotOptions);
}

async function updatePromocode(params: IParamsPromocode,
                               item: IPromocodeDataResponse,
                               config: ILoyalmeConfig): Promise<IPromocodeDataResponse | undefined> {
  const newPromocodeObj = createPromocodeObj(params, config);
  const tmpPromocodeObj = createPromocodeObj(item, config);
  const oldPromocodeObj = Object
    .keys(newPromocodeObj)
    .reduce((result, key) => {
      if (typeof tmpPromocodeObj[key] !== 'undefined') {
        result[key] = tmpPromocodeObj[key];
      }
      return result;
    }, {} as IPromocodeRequest);
  if (_.isEqual(newPromocodeObj, oldPromocodeObj)) {
    return item;
  } else {
    const gotOptions = Object.assign({}, reqOptions);
    gotOptions.headers!.Authorization = `Bearer ${config.token}`;
    gotOptions.json = newPromocodeObj;
    const response = await got.put(`https://${config.url}${api}/${item.id}`, gotOptions) as Response<IPromocodeResponseOne>;
    if (response.body.data) {
      return response.body.data;
    } else {
      throw new Error(JSON.stringify(response.body, null, 2));
    }
  }
}

export async function promocode(status: IParamsPromocode[],
                                config: ILoyalmeConfig) {
  const arr: IPromocodeDataResponse[] = [];

  for (const item of status) {
    const response = await getPromocode({
      key: 'code',
      value: item.code!,
      token: config.token,
      url: config.url
    })

    if (response.body?.data?.[0]) {
      const pPromo = await updatePromocode(item, response.body.data[0], config);
      if (pPromo) {
        arr.push(pPromo)
      }
    } else {
      const { body } = await createPromocode(item, config);
      if (body?.data) {
        const pPromo = body.data;
        arr.push(pPromo);
      } else {
        throw new Error(JSON.stringify(body, null, 2));
      }
    }
  }

  return arr;
}
