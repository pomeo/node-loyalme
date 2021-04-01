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
  if (params.fingerprint) {
    if (typeof params.fingerprint === 'string') {
      reqObject.client_hash = params.fingerprint;
    }
    if (Array.isArray(params.client_hash)) {
      reqObject.client_hash = params.client_hash;
    }
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
  const gotOptions = Object.assign(reqOptions, {});
  gotOptions.searchParams = {};
  gotOptions.searchParams[params.key] = params.value;
  gotOptions.headers!.Authorization = `Bearer ${params.token}`;
  return await got.get(`https://${params.url}${api}`, gotOptions);
}

async function createClient(params: IParamsClient,
                            config: ILoyalmeConfig): Promise<Response<IClientResponse>> {
  const gotOptions = Object.assign(reqOptions, {});
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  gotOptions.json = createClientObj(params, config);
  return await got.post(`https://${config.url}${api}`, gotOptions);
}

async function updateClient(params: IParamsClient,
                            responseLoyalme: Response<IClientResponse>,
                            data: IParamsClientBoth,
                            config: ILoyalmeConfig): Promise<Response<IClientResponse>> {
  const newClientObj = createClientObj(params, config);
  const oldClientObj = createClientObj(data, config);
  if (_.isEqual(newClientObj, oldClientObj)) {
    return responseLoyalme;
  } else {
    const gotOptions = Object.assign(reqOptions, {});
    gotOptions.headers!.Authorization = `Bearer ${config.token}`;
    gotOptions.json = newClientObj;
    return await got.put(`https://${config.url}${api}/${data.id}`, gotOptions);
  }
}

async function createResponse(params: IParamsClient,
                              response: Response<IClientResponse> | undefined,
                              config: ILoyalmeConfig) {
  if (response?.body?.data?.[0]) {
    const clientRes: Response<IClientResponse> = await updateClient(params, response, response.body.data[0], config);
    if (clientRes.body?.data) {
      return clientRes.body.data;
    } else {
      return clientRes.body;
    }
  } else {
    const clientRes: Response<IClientResponse> = await createClient(params, config);
    if (clientRes.body?.data) {
      return clientRes.body.data;
    } else {
      return clientRes.body;
    }
  }
}

export async function client(params: IParamsClient,
                             config: ILoyalmeConfig) {
  let response: Response<IClientResponse> | undefined;

  if (params.externalId) {
    response = await getClient({
      key: 'external_id',
      value: params.externalId,
      token: config.token,
      url: config.url
    })
  }

  if (params.email && response?.statusCode !== 200) {
    response = await getClient({
      key: 'email',
      value: params.email,
      token: config.token,
      url: config.url
    })
  }

  if (params.phone && response?.statusCode !== 200) {
    response = await getClient({
      key: 'phone',
      value: params.phone,
      token: config.token,
      url: config.url
    })
  }

  return await createResponse(params, response, config);
}
