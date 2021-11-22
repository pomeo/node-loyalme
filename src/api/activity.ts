import _ from 'lodash';
import debug from 'debug';
import got, { OptionsOfJSONResponseBody, Response } from 'got';

const logger = debug('loyalme:request:Activity');
const api = '/activity';

const reqOptions: OptionsOfJSONResponseBody = {
  headers: {},
  responseType: 'json',
  throwHttpErrors: false
}

async function getActivity(config: ILoyalmeConfig): Promise<IActivityListDataResponse[] | undefined> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  logger(gotOptions);
  const response = await got.get(`https://${config.url}${api}/list`, gotOptions) as Response<IActivityListResponse>;
  return response.body.data;
}

export async function activityList(config: ILoyalmeConfig) {
  return await getActivity(config)
}

export async function fireEvent(params: IParamsFireEvent,
                                config: ILoyalmeConfig): Promise<IFireEventDataResponse | undefined> {
  const reqObject: IFireEventRequest = {};
  if (params.clientId !== undefined) {
    reqObject.client_id = params.clientId;
  }
  if (params.client_id !== undefined) {
    reqObject.client_id = params.client_id;
  }
  if (params.clientHash) {
    reqObject.client_hash = params.clientHash;
  }
  if (params.client_hash) {
    reqObject.client_hash = params.client_hash;
  }
  if (params.externalId) {
    reqObject.external_id = params.externalId;
  }
  if (params.external_id) {
    reqObject.external_id = params.external_id;
  }
  if (params.activityKey) {
    reqObject.activity_key = params.activityKey;
  }
  if (params.activity_key) {
    reqObject.activity_key = params.activity_key;
  }
  if (params.activityCreatedAt) {
    reqObject.activity_created_at = params.activityCreatedAt;
  }
  if (params.activity_created_at) {
    reqObject.activity_created_at = params.activity_created_at;
  }
  if (params.activityAttributes) {
    reqObject.activity_attributes = params.activityAttributes;
  }
  if (params.activity_attributes) {
    reqObject.activity_attributes = params.activity_attributes;
  }
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  gotOptions.json = reqObject;
  logger(gotOptions);
  const response = await got.post(`https://${config.url}${api}/fire-event`, gotOptions) as Response<IFireEventResponse>;
  if (response.body.data) {
    return response.body.data;
  } else {
    throw new Error(JSON.stringify(response.body, null, 2));
  }
}

export async function cancelEvent(params: IParamsCancelEvent,
                                  config: ILoyalmeConfig) {
  const reqObject: ICancelEventRequest = {};
  if (params.clientId !== undefined) {
    reqObject.client_id = params.clientId;
  }
  if (params.client_id !== undefined) {
    reqObject.client_id = params.client_id;
  }
  if (params.clientHash) {
    reqObject.client_hash = params.clientHash;
  }
  if (params.client_hash) {
    reqObject.client_hash = params.client_hash;
  }
  if (params.externalId) {
    reqObject.external_id = params.externalId;
  }
  if (params.external_id) {
    reqObject.external_id = params.external_id;
  }
  if (params.activityKey) {
    reqObject.activity_key = params.activityKey;
  }
  if (params.activity_key) {
    reqObject.activity_key = params.activity_key;
  }
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  gotOptions.json = reqObject;
  logger(gotOptions);
  const response = await got.post(`https://${config.url}${api}/cancel-event`, gotOptions) as Response<any>;
  if (response.body.data) {
    return response.body.data;
  } else {
    throw new Error(JSON.stringify(response.body, null, 2));
  }
}
