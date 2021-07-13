import _ from 'lodash';
import got, { OptionsOfJSONResponseBody, Response } from 'got';

const api = '/product';

const reqOptions: OptionsOfJSONResponseBody = {
  headers: {},
  responseType: 'json',
  throwHttpErrors: false
}

function createProductObj(params: IParamsProduct,
                          config: ILoyalmeConfig) {
  const reqObject: IProductRequest = {
    point_id: config.pointId,
    categories: params.categories.map((item: ICategoryDataResponse) => {
      if (isNaN(Number(item))) {
        return item.id;
      } else {
        return item;
      }
    })
  };
  if (params.title) {
    reqObject.title = params.title;
  }
  if (params.extItemId) {
    reqObject.ext_item_id = params.extItemId;
  }
  if (params.ext_item_id) {
    reqObject.ext_item_id = params.ext_item_id;
  }
  if (params.points !== undefined) {
    reqObject.points = params.points;
  }
  if (params.barcode) {
    reqObject.barcode = params.barcode;
  }
  if (params.price) {
    reqObject.price = params.price;
  }
  if (params.isActive !== undefined) {
    reqObject.is_active = params.isActive;
  }
  if (params.is_active !== undefined) {
    reqObject.is_active = params.is_active;
  }
  if (params.typeId !== undefined) {
    reqObject.type_id = params.typeId;
  }
  if (params.type_id !== undefined) {
    reqObject.type_id = params.type_id;
  }
  if (params.pointId !== undefined) {
    reqObject.point_id = params.pointId;
  }
  if (params.point_id !== undefined) {
    reqObject.point_id = params.point_id;
  }
  if (params.accrualRate !== undefined) {
    reqObject.accrual_rate = params.accrualRate;
  }
  if (params.accrual_rate !== undefined) {
    reqObject.accrual_rate = params.accrual_rate;
  }
  if (params.extPhotoUrl !== undefined) {
    reqObject.ext_photo_url = params.extPhotoUrl;
  }
  if (params.ext_photo_url !== undefined) {
    reqObject.ext_photo_url = params.ext_photo_url;
  }
  return reqObject;
}

async function getProduct(params: {
  key: string
  value: string
  token: string
  url: string
}): Promise<Response<IProductResponse>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.searchParams = {};
  gotOptions.searchParams[params.key] = params.value;
  gotOptions.headers!.Authorization = `Bearer ${params.token}`;
  return await got.get(`https://${params.url}${api}`, gotOptions);
}

async function createProduct(params: IParamsProduct,
                             config: ILoyalmeConfig): Promise<Response<IProductResponseOne>> {
  const gotOptions = Object.assign({}, reqOptions);
  gotOptions.headers!.Authorization = `Bearer ${config.token}`;
  gotOptions.json = createProductObj(params, config);
  return await got.post(`https://${config.url}${api}`, gotOptions);
}

async function updateProduct(params: IParamsProduct,
                             item: IProductDataResponse,
                             config: ILoyalmeConfig): Promise<IProductDataResponse | undefined> {
  const newProductObj = createProductObj(params, config);
  const tmpProductObj = createProductObj(item, config);
  const oldProductObj = Object
    .keys(newProductObj)
    .reduce((result, key) => {
      if (typeof tmpProductObj[key] !== 'undefined') {
        result[key] = tmpProductObj[key];
      }
      return result;
    }, {} as IProductRequest);
  if (_.isEqual(newProductObj, oldProductObj)) {
    return item;
  } else {
    const gotOptions = Object.assign({}, reqOptions);
    gotOptions.headers!.Authorization = `Bearer ${config.token}`;
    gotOptions.json = newProductObj;
    const response = await got.put(`https://${config.url}${api}/${item.id}`, gotOptions) as Response<IProductResponseOne>;
    if (response.body.data) {
      return response.body.data;
    } else {
      throw new Error(JSON.stringify(response.body, null, 2));
    }
  }
}

export async function product(products: IParamsProduct[],
                              categories: IParamsCategory[],
                              config: ILoyalmeConfig,
                              loyalme: ILoyalmeClass) {

  const arr: IProductDataResponse[] = [];

  const arrCat = await loyalme.category(categories);
  const arrCategories = arrCat.map((item: ICategoryDataResponse) => item.id);

  for (const item of products) {
    item.categories = arrCategories;
    const response = await getProduct({
      key: 'ext_item_id',
      value: item.extItemId!,
      token: config.token,
      url: config.url
    })

    if (response.body?.data?.[0]) {
      const prdt = await updateProduct(item, response.body.data[0], config);
      if (prdt) {
        arr.push(prdt);
      }
    } else {
      const { body } = await createProduct(item, config);
      if (body?.data) {
        arr.push(body.data);
      } else {
        throw new Error(JSON.stringify(body, null, 2));
      }
    }
  }

  return arr;
}
