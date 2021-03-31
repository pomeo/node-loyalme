import _ from 'lodash';
import got, { OptionsOfJSONResponseBody, Response } from 'got';

const api = '/client';

const reqOptions: OptionsOfJSONResponseBody = {
  headers: {},
  responseType: 'json',
  throwHttpErrors: false
}

function createClientObj(params: {
  id?: number
  externalId?: string
  external_id?: string
  email?: string
  phone?: string
  name?: string
  middleName?: string
  middle_name?: string
  lastName?: string
  last_name?: string
  fingerprint?: string
  client_hash?: string
  birthdate?: any
  birthdate_select?: {
    day: string
    month: string
    year: string
  }
  gender?: 0 | 1
  otherPhones?: string[]
  other_phones?: string[]
  otherPhonesSubscribe?: number[]
  other_phones_subscribe?: number[]
  otherEmails?: string[]
  other_emails?: string[]
  otherEmailsSubscribe?: number[]
  other_emails_subscribe?: number[]
  attribute?: { [key: string]: string }
  person_id?: number
  point_id?: number
  brand_id?: number
}, config: {
  url: string
  token: string
  pointId: number
  brandId: number
  personId: number
}) {
  const reqObject: {
    point_id: number
    brand_id: number
    name?: string
    last_name?: string
    middle_name?: string
    email?: string
    birthdate_select?: {
      day: string
      month: string
      year: string
    }
    gender?: 0 | 1
    phone?: string
    client_hash?: string
    other_phones?: string[]
    other_phones_subscribe?: number[]
    other_emails?: string[]
    other_emails_subscribe?: number[]
    attribute?: { [key: string]: string }
    person_id: number
    external_id?: string
  } = {
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
    if (params.birthdate.date) {
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
    reqObject.client_hash = params.fingerprint;
  }
  if (params.client_hash) {
    reqObject.client_hash = params.client_hash;
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
}) {
  const gotOptions = Object.assign(reqOptions, {});
  gotOptions.searchParams = {};
  gotOptions.searchParams[params.key] = params.value;
  gotOptions.headers!.Authorization = `Bearer ${params.token}`;
  return await got.get(`https://${params.url}${api}`, gotOptions);
}

async function createClient(params: {
  externalId?: string
  email?: string
  phone?: string
  name?: string
  middleName?: string
  lastName?: string
  fingerprint?: string
  birthdate?: string
  gender?: 0 | 1
  otherPhones?: string[]
  otherPhonesSubscribe?: number[]
  otherEmails?: string[]
  otherEmailsSubscribe?: number[]
  attribute?: { [key: string]: string }
}, config: {
  url: string
  token: string
  pointId: number
  brandId: number
  personId: number
}) {
  const gotOptions = Object.assign(reqOptions, {});
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  gotOptions.json = createClientObj(params, config);
  return await got.post(`https://${config.url}${api}`, gotOptions);
}

async function updateClient(params: {
  externalId?: string
  email?: string
  phone?: string
  name?: string
  middleName?: string
  lastName?: string
  fingerprint?: string
  birthdate?: string
  gender?: 0 | 1
  otherPhones?: string[]
  otherPhonesSubscribe?: number[]
  otherEmails?: string[]
  otherEmailsSubscribe?: number[]
  attribute?: { [key: string]: string }
}, responseLoyalme: any, config: {
  url: string
  token: string
  pointId: number
  brandId: number
  personId: number
}) {
  const newClientObj = createClientObj(params, config);
  const oldClientObj = createClientObj(responseLoyalme, config);
  if (_.isEqual(newClientObj, oldClientObj)) {
    return responseLoyalme;
  } else {
    const gotOptions = Object.assign(reqOptions, {});
    gotOptions.headers!.Authorization = `Bearer ${config.token}`;
    gotOptions.json = newClientObj;
    return await got.put(`https://${config.url}${api}/${responseLoyalme.id}`, gotOptions);
  }
}

export async function client(params: {
  externalId?: string
  email?: string
  phone?: string
  name?: string
  middleName?: string
  lastName?: string
  fingerprint?: string
  birthdate?: string
  gender?: 0 | 1
  otherPhones?: string[]
  otherPhonesSubscribe?: number[]
  otherEmails?: string[]
  otherEmailsSubscribe?: number[]
  attribute?: { [key: string]: string }
}, config: {
  url: string
  token: string
  pointId: number
  brandId: number
  personId: number
}) {
  let response: Response<any> | undefined;

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

  let clientResponse: any;
  if (response?.body.data?.[0]) {
    console.log('update');
    const clientRes: Response<any> = await updateClient(params, response.body.data[0], config);
    if (clientRes.body?.data) {
      clientResponse = clientRes.body.data;
    } else {
      clientResponse = clientRes.body;
    }
  } else {
    const clientRes: Response<any> = await createClient(params, config);
    if (clientRes.body?.data) {
      clientResponse = clientRes.body.data;
    } else {
      clientResponse = clientRes.body;
    }
  }
  return clientResponse;
}
