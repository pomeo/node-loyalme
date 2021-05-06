import _ from 'lodash';
import got, { OptionsOfJSONResponseBody, Response } from 'got';

const api = '/activity';

const reqOptions: OptionsOfJSONResponseBody = {
  headers: {},
  responseType: 'json',
  throwHttpErrors: false
}

async function getActivity(params: {
  key: string
  token: string
  url: string
}): Promise<Response<IClientResponse>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${params.token}`;
  return await got.get(`https://${params.url}${api}`, gotOptions);
}

export async function activityList(config: ILoyalmeConfig) {
  return await getActivity({
    key: 'list',
    token: config.token,
    url: config.url
  })
}

export async function fireEvent(config: ILoyalmeConfig) {
  return null;
}

export async function cancelEvent(config: ILoyalmeConfig) {
  return null;
}
