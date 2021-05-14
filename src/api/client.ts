import _ from 'lodash';
import got, { OptionsOfJSONResponseBody, Response } from 'got';

const api = '/client';

const reqOptions: OptionsOfJSONResponseBody = {
  headers: {},
  responseType: 'json',
  throwHttpErrors: false
}

function createClientObj(params: IParamsClientBoth,
                         config: ILoyalmeConfig) {
  const reqObject: IClientRequest = {
    person_id: config.personId,
    point_id: config.pointId,
    brand_id: config.brandId
  };
  if (params.externalId) {
    reqObject.external_id = params.externalId;
  }
  if (params.external_id) {
    reqObject.external_id = params.external_id;
  }
  if (params.email) {
    reqObject.email = params.email;
  }
  if (params.phone) {
    reqObject.phone = params.phone;
  }
  if (params.birthdate) {
    if (typeof params.birthdate === 'string') {
      const d = params.birthdate.split('-');
      reqObject.birthdate_select = {
        day: d[1],
        month: d[2],
        year: d[0]
      }
    }
    if (typeof params.birthdate === 'object' && params.birthdate.date) {
      const d = params.birthdate.date.split(' ')[0].split('-');
      reqObject.birthdate_select = {
        day: d[2],
        month: d[1],
        year: d[0]
      }
    }
  }
  if (params.gender !== undefined) {
    reqObject.gender = params.gender;
  }
  if (params.name) {
    reqObject.name = params.name;
  }
  if (params.middleName) {
    reqObject.middle_name = params.middleName;
  }
  if (params.middle_name) {
    reqObject.middle_name = params.middle_name;
  }
  if (params.lastName) {
    reqObject.last_name = params.lastName;
  }
  if (params.last_name) {
    reqObject.last_name = params.last_name;
  }
  if (params.otherPhones) {
    reqObject.other_phones = params.otherPhones;
  }
  if (params.other_phones) {
    reqObject.other_phones = params.other_phones;
  }
  if (params.otherPhonesSubscribe) {
    reqObject.other_phones_subscribe = params.otherPhonesSubscribe;
  }
  if (params.other_phones_subscribe) {
    reqObject.other_phones_subscribe = params.other_phones_subscribe;
  }
  if (params.otherEmails) {
    reqObject.other_emails = params.otherEmails;
  }
  if (params.other_emails) {
    reqObject.other_emails = params.other_emails;
  }
  if (params.otherEmailsSubscribe) {
    reqObject.other_emails_subscribe = params.otherEmailsSubscribe;
  }
  if (params.other_emails_subscribe) {
    reqObject.other_emails_subscribe = params.other_emails_subscribe;
  }
  if (params.attribute) {
    reqObject.attribute = params.attribute;
  }
  return reqObject;
}

async function getClient(params: {
  key: string
  value: string
  token: string
  url: string
}): Promise<Response<IClientResponse>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.searchParams = {};
  gotOptions.searchParams[params.key] = params.value;
  gotOptions.headers!.Authorization = `Bearer ${params.token}`;
  return await got.get(`https://${params.url}${api}`, gotOptions);
}

async function createClient(params: IParamsClient,
                            config: ILoyalmeConfig): Promise<Response<IClientResponse>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  gotOptions.json = createClientObj(params, config);
  return await got.post(`https://${config.url}${api}`, gotOptions);
}

async function updateClient(params: IParamsClient,
                            responseLoyalme: Response<IClientResponse>,
                            config: ILoyalmeConfig): Promise<Response<IClientResponse>> {
  const data = responseLoyalme!.body!.data![0];
  const newClientObj = createClientObj(params, config);
  const tmpClientObj = createClientObj(data, config);
  const oldClientObj = Object
    .keys(newClientObj)
    .reduce((result, key) => {
      if (typeof tmpClientObj[key] !== 'undefined') {
        result[key] = tmpClientObj[key];
      }
      return result;
    }, {} as IClientRequest);
  if (_.isEqual(newClientObj, oldClientObj)) {
    return responseLoyalme;
  } else {
    const gotOptions = Object.assign({}, reqOptions);
    gotOptions.headers!.Authorization = `Bearer ${config.token}`;
    gotOptions.json = newClientObj;
    return await got.put(`https://${config.url}${api}/${data.id}`, gotOptions);
  }
}

function returnResponse(clientRes: Response<IClientResponse>) {
  if (clientRes.body?.data) {
    if (clientRes.body.data[0]) {
      return clientRes.body.data[0];
    }
    return clientRes.body.data;
  } else {
    return clientRes.body;
  }
}

async function createResponse(params: IParamsClient,
                              response: Response<IClientResponse> | undefined,
                              config: ILoyalmeConfig) {
  if (response?.body?.data?.[0]) {
    const clientRes: Response<IClientResponse> = await updateClient(params, response, config);
    return returnResponse(clientRes);
  } else {
    const clientRes: Response<IClientResponse> = await createClient(params, config);
    return returnResponse(clientRes);
  }
}

export async function clientFingerprint(params: {
  id: number
  fingerprint: string
}, config: ILoyalmeConfig): Promise<Response<IClientMergeResponse>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  return await got.post(`https://${config.url}${api}/${params.id}/merge/${params.fingerprint}`, gotOptions);
}

async function checkMerge(params: IParamsClient,
                          config: ILoyalmeConfig,
                          clientResponse: IClientResponse | IClientDataResponse | IClientDataResponse[]) {
  if (params.fingerprint && "client_hash" in clientResponse) {
    const { client_hash, id } = clientResponse;
    let hash = client_hash!.find(o => o.client_hash === params.fingerprint);
    if (typeof hash === 'undefined') {
      await clientFingerprint({
        id,
        fingerprint: params.fingerprint,
      }, config)
      const res = await getClientByFingerprint(params, config);
      return await createResponse(params, res, config);
    }
  }
  return clientResponse;
}

async function getClientByFingerprint(params: IParamsClient,
                                      config: ILoyalmeConfig) {
  return await getClient({
    key: 'client_hash',
    value: params.fingerprint!,
    token: config.token,
    url: config.url
  })
}

async function getClientByExternalId(params: IParamsClient,
                                     config: ILoyalmeConfig) {
  return await getClient({
    key: 'external_id',
    value: params.externalId!,
    token: config.token,
    url: config.url
  })
}

async function getClientByEmail(params: IParamsClient,
                                config: ILoyalmeConfig) {
  return await getClient({
    key: 'email',
    value: params.email!,
    token: config.token,
    url: config.url
  })
}

async function getClientByPhone(params: IParamsClient,
                                config: ILoyalmeConfig) {
  return await getClient({
    key: 'phone',
    value: params.phone!,
    token: config.token,
    url: config.url
  })
}

export async function client(params: IParamsClient,
                             config: ILoyalmeConfig) {
  let response: Response<IClientResponse> | undefined;

  if (params.externalId) {
    response = await getClientByExternalId(params, config);
  }

  if (params.fingerprint && response?.statusCode !== 200) {
    response = await getClientByFingerprint(params, config);
  }

  if (params.email && response?.statusCode !== 200) {
    response = await getClientByEmail(params, config);
  }

  if (params.phone && response?.statusCode !== 200) {
    response = await getClientByPhone(params, config);
  }

  let clientResponse = await createResponse(params, response, config);

  return await checkMerge(params, config, clientResponse);
}
