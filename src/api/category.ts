import _ from 'lodash';
import debug from 'debug';
import got, { OptionsOfJSONResponseBody, Response } from 'got';

const logger = debug('loyalme:request:Category');
const api = '/category';

const reqOptions: OptionsOfJSONResponseBody = {
  headers: {},
  responseType: 'json',
  throwHttpErrors: false
}

function createCategoryObj(params: IParamsCategory,
                           config: ILoyalmeConfig) {
  const reqObject: ICategoryRequest = {
    point_id: config.pointId
  };
  if (params.name) {
    reqObject.name = params.name;
  }
  if (params.externalId) {
    reqObject.external_id = params.externalId;
  }
  if (params.external_id) {
    reqObject.external_id = params.external_id;
  }
  if (params.parentId !== undefined) {
    reqObject.parent_id = params.parentId;
  }
  if (params.parent_id !== undefined) {
    reqObject.parent_id = params.parent_id;
  }
  return reqObject;
}

async function getCategory(params: {
  key: string
  value: string
  token: string
  url: string
}): Promise<Response<ICategoryResponse>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.searchParams = {};
  gotOptions.searchParams[params.key] = params.value;
  gotOptions.headers!.Authorization = `Bearer ${params.token}`;
  logger(gotOptions);
  return await got.get(`https://${params.url}${api}`, gotOptions);
}

async function createCategory(params: IParamsCategory,
                              config: ILoyalmeConfig): Promise<Response<ICategoryResponseOne>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  gotOptions.json = createCategoryObj(params, config);
  logger(gotOptions);
  return await got.post(`https://${config.url}${api}`, gotOptions);
}

async function updateCategory(params: IParamsCategory,
                              item: ICategoryDataResponse,
                              config: ILoyalmeConfig): Promise<ICategoryDataResponse | undefined> {
  const newCategoryObj = createCategoryObj(params, config);
  const tmpCategoryObj = createCategoryObj(item, config);
  const oldCategoryObj = Object
    .keys(newCategoryObj)
    .reduce((result, key) => {
      if (typeof tmpCategoryObj[key] !== 'undefined') {
        result[key] = tmpCategoryObj[key];
      }
      return result;
    }, {} as ICategoryRequest);
  if (_.isEqual(newCategoryObj, oldCategoryObj)) {
    return item;
  } else {
    const gotOptions = Object.assign({}, reqOptions);
    gotOptions.headers!.Authorization = `Bearer ${config.token}`;
    gotOptions.json = newCategoryObj;
    logger(gotOptions);
    const response = await got.put(`https://${config.url}${api}/${item.id}`, gotOptions) as Response<ICategoryResponseOne>;
    if (response.body.data) {
      return response.body.data;
    } else {
      throw new Error(JSON.stringify(response.body, null, 2));
    }
  }
}

export async function category(params: IParamsCategory[],
                               config: ILoyalmeConfig) {

  const arr: ICategoryDataResponse[] = [];

  for (const item of params) {
    const response = await getCategory({
      key: 'external_id',
      value: item.externalId!,
      token: config.token,
      url: config.url
    })

    if (response.body?.data?.[0]) {
      const cat = await updateCategory(item, response.body.data[0], config);
      if (cat) {
        arr.push({
          id: cat.id!,
          name: cat.name!,
          parent_id: cat.parent_id!,
          external_id: cat.external_id!
        })
      }
    } else {
      const { body } = await createCategory(item, config);
      if (body?.data) {
        const cat = body.data;
        arr.push({
          id: cat.id!,
          name: cat.name!,
          parent_id: cat.parent_id!,
          external_id: cat.external_id!
        })
      } else {
        throw new Error(JSON.stringify(body, null, 2));
      }
    }
  }

  return arr;
}
