interface ILoyalmeClass {
  url: string
  token: string
  brandId: number
  pointId: number
  personId: number
  client: Function
  category: Function
  product: Function
}

interface ILoyalmeConfig {
  [index: string]: string | number
  url: string
  token: string
  pointId: number
  brandId: number
  personId: number
  clientId: number
}

interface ILoyalmeBirthday {
  [index: string]: string | number
  date: string
  timezone_type: number
  timezone: string
}

interface ILoyalmeReqBirthday {
  [index: string]: string
  day: string
  month: string
  year: string
}

interface ILoyalmeClientHash {
  [index: string]: string | number
  id: number
  client_hash: string
}

interface IParamsClient {
  externalId?: string
  email?: string
  phone?: string
  name?: string
  middleName?: string
  lastName?: string
  fingerprint?: string
  birthdate?: string | ILoyalmeBirthday
  gender?: 0 | 1
  otherPhones?: string[]
  otherPhonesValidate?: number[]
  otherPhonesSubscribe?: number[]
  otherEmails?: string[]
  otherEmailsValidate?: number[]
  otherEmailsSubscribe?: number[]
  attribute?: { [key: string]: string }
}

interface IParamsClientBoth extends IParamsClient {
  id?: number
  external_id?: string
  middle_name?: string
  last_name?: string
  client_hash?: string | ILoyalmeClientHash[]
  birthdate_select?: {
    day: string
    month: string
    year: string
  }
  other_phones?: string[]
  other_phones_validate?: number[]
  other_phones_subscribe?: number[]
  other_emails?: string[]
  other_emails_validate?: number[]
  other_emails_subscribe?: number[]
  person_id?: number
  point_id?: number
  brand_id?: number
}

interface IClientRequest {
  [index: string]: string
      | number
      | undefined
      | ILoyalmeReqBirthday
      | ILoyalmeClientHash[]
      | string[]
      | number[]
      | { [key: string]: string }
  point_id: number
  brand_id: number
  name?: string
  last_name?: string
  middle_name?: string
  email?: string
  birthdate_select?: ILoyalmeReqBirthday
  gender?: 0 | 1
  phone?: string
  client_hash?: string | ILoyalmeClientHash[]
  other_phones?: string[]
  other_phones_subscribe?: number[]
  other_emails?: string[]
  other_emails_subscribe?: number[]
  attribute?: { [key: string]: string }
  person_id: number
  external_id?: string
}

interface ICategoryRequest {
  [index: string]: string | number | undefined | null
  name?: string
  point_id: number
  parent_id?: number | null
  external_id?: string
}

interface IClientDataResponse {
  id: number
  point_id: number
  brand_id: number
  person_id: number
  name?: string
  middle_name?: string
  last_name?: string
  birthdate?: {
    date: string
    timezone_type: number
    timezone: string
  },
  gender?: 0 | 1
  address?: string
  passport_seria?: string
  passport_number?: string
  passport_issued_date?: string
  passport_issued_by?: string
  phones?: {
    phone: string
    subscription_status: number
    status: number
  }[]
  phone?: string
  emails?: {
    email: string
    subscription_status: number
    status: number
  }[]
  email?: string
  labels?: {
    id: number
    name: string
    description: string
  }[]
  points?: number
  status?: string
  created_at: {
    date: string
    timezone_type: number
    timezone: string
  }
  updated_at: {
    date: string
    timezone_type: number
    timezone: string
  }
  blocked_at?: {
    date: string
    timezone_type: number
    timezone: string
  }
  client_hash?: {
    id: number
    client_hash: string
  }[]
  external_id?: string
}

interface ILoyalmeResponse {
  message?: string
  code?: number
  status_code?: number
  meta?: {
    pagination?: {
      total?: number
      count?: number
      per_page?: number
      current_page?: number
      total_pages?: number
      links?: {
        prev?: string
        next?: string
      }
    }
  }
}

interface IClientResponse extends ILoyalmeResponse {
  data?: IClientDataResponse[]
}

interface ICategoryResponseOne extends ILoyalmeResponse {
  data?: ICategoryDataResponse
}

interface ICategoryResponse extends ILoyalmeResponse {
  data?: ICategoryDataResponse[]
}

interface IProductResponseOne extends ILoyalmeResponse {
  data?: IProductDataResponse
}

interface IProductResponse extends ILoyalmeResponse {
  data?: IProductDataResponse[]
}

interface ICategoryDataResponse {
  id: number
  parent_id?: number | null
  name?: string
  external_id?: string
}

interface IParamsCategory {
  externalId?: string
  external_id?: string
  parentId?: number | null
  parent_id?: number | null
  name?: string
}

interface ILoyalmeError {
  message: string
  code: number
  status_code: number
}

interface IClientMergeResponse {
  message: string
  status_code: number
}

interface IParamsProduct {
  [index: string]: any
}

interface IProductDataResponse {
  [key: string]: string
      | number
      | undefined
      | {
        id: number
        title?: string
      }[]
  id?: number
  points?: number
  ext_item_id?: number
  title?: string
  barcode?: string
  price?: number
  is_active?: number
  type_id?: number
  point_id: number
  accrual_rate?: number
  ext_photo_url?: string
  categories: {
    id: number
    title?: string
  }[]
}

interface IProductRequest {
  [key: string]: string
      | number
      | undefined
      | {
        id: number
        title?: string
      }[] | number[]
  id?: number
  points?: number
  ext_item_id?: number
  title?: string
  barcode?: string
  price?: number
  is_active?: number
  type_id?: number
  point_id: number
  accrual_rate?: number
  ext_photo_url?: string
  categories: {
    id: number
    title?: string
  }[] | number[]
}

interface IParamsPaymentStatus {
  title_en?: string
  title_ru?: string
  slug: string
  is_active?: number
}

interface IPaymentStatusResponse extends ILoyalmeResponse {
  data?: IPaymentStatusDataResponse[]
}

interface IPaymentStatusResponseOne extends ILoyalmeResponse {
  data?: IPaymentStatusDataResponse
}

interface IPaymentStatusDataResponse {
  id: number
  title_en: string
  title_ru: string
  slug: string
  is_active: number
  created_at: {
    date: string
    timezone_type: number
    timezone: string
  }
  updated_at: {
    date: string
    timezone_type: number
    timezone: string
  }
}

interface IPaymentStatusRequest {
  [index: string]: string | number | undefined
  title_en?: string
  title_ru?: string
  slug?: string
  is_active?: number
}

interface IParamsPaymentMethod {
  title_en?: string
  title_ru?: string
  slug: string
  is_active?: number
}

interface IPaymentMethodResponse extends ILoyalmeResponse {
  data?: IPaymentMethodDataResponse[]
}

interface IPaymentMethodResponseOne extends ILoyalmeResponse {
  data?: IPaymentMethodDataResponse
}

interface IPaymentMethodDataResponse {
  id: number
  title_en: string
  title_ru: string
  slug: string
  is_active: number
  created_at: {
    date: string
    timezone_type: number
    timezone: string
  }
  updated_at: {
    date: string
    timezone_type: number
    timezone: string
  }
}

interface IPaymentMethodRequest {
  [index: string]: string | number | undefined
  title_en?: string
  title_ru?: string
  slug?: string
  is_active?: number
}

interface IParamsOrderStatus {
  title_en?: string
  title_ru?: string
  slug: string
  is_active?: number
}

interface IOrderStatusResponse extends ILoyalmeResponse {
  data?: IOrderStatusDataResponse[]
}

interface IOrderStatusResponseOne extends ILoyalmeResponse {
  data?: IOrderStatusDataResponse
}

interface IOrderStatusDataResponse {
  id: number
  title_en: string
  title_ru: string
  slug: string
  is_active: number
  created_at: {
    date: string
    timezone_type: number
    timezone: string
  }
  updated_at: {
    date: string
    timezone_type: number
    timezone: string
  }
}

interface IOrderStatusRequest {
  [index: string]: string | number | undefined
  title_en?: string
  title_ru?: string
  slug?: string
  is_active?: number
}

interface IParamsOrder {
  status?: string
  person_id: number
  client_id: number
  point_id: number
  ext_order_id?: number
  extOrderId?: number
  payment_type?: string
  paymentType?: string
  shipping_type?: string
  shippingType?: string
  promo_code?: string
  promoCode?: string
  order_link?: string
  orderLink?: string
  payment_status_id?: number
  paymentStatusId?: number
  products?: IOrderProduct[]
}

interface IOrderResponse extends ILoyalmeResponse {
  data?: IOrderDataResponse[]
}

interface IOrderResponseOne extends ILoyalmeResponse {
  data?: IOrderDataResponse
}

interface IOrderDataResponse {
  id?: number
  status?: string
  person_id: number
  client_id: number
  point_id: number
  ext_order_id: number
  payment_type?: string
  shipping_type?: string
  promo_code?: string
  order_link?: string
  payment_status_id?: number
  amount?: number
  products?: IOrderProduct[]
}

interface IOrderProduct {
  quantity: number
  product_id: number
  price: number
}

interface IOrderRequest extends IParamsOrder {
  [index: string]: string | number | undefined | IOrderProduct[]
}

interface IParamsDeliveryMethod {
  title_en?: string
  title_ru?: string
  slug: string
  is_active?: number
}

interface IDeliveryMethodResponse extends ILoyalmeResponse {
  data?: IDeliveryMethodDataResponse[]
}

interface IDeliveryMethodResponseOne extends ILoyalmeResponse {
  data?: IDeliveryMethodDataResponse
}

interface IDeliveryMethodDataResponse {
  id: number
  title_en: string
  title_ru: string
  slug: string
  is_active: number
  created_at: {
    date: string
    timezone_type: number
    timezone: string
  }
  updated_at: {
    date: string
    timezone_type: number
    timezone: string
  }
}

interface IDeliveryMethodRequest {
  [index: string]: string | number | undefined
  title_en?: string
  title_ru?: string
  slug?: string
  is_active?: number
}

interface IParamsPromocode {
  code?: string
  activeFrom?: string
  activeTo?: string
  active_from?: string
  active_to?: string
  status?: 'is_active' | 'is_issued' | 'is_used' | 'is_inactive' | 'deleted'
  description?: string
}

interface IPromocodeResponse extends ILoyalmeResponse {
  data?: IPromocodeDataResponse[]
}

interface IPromocodeResponseOne extends ILoyalmeResponse {
  data?: IPromocodeDataResponse
}

interface IPromocodeDataResponse {
  id: number
  code: string
  active_from: string
  active_to: string
  status: 'is_active' | 'is_issued' | 'is_used' | 'is_inactive' | 'deleted'
  description: string
  created_at: {
    date: string
    timezone_type: number
    timezone: string
  }
  updated_at: {
    date: string
    timezone_type: number
    timezone: string
  }
}

interface IPromocodeRequest {
  [index: string]: string | number | undefined
  code?: string
  activeFrom?: string
  activeTo?: string
  active_from?: string
  active_to?: string
  status?: 'is_active' | 'is_issued' | 'is_used' | 'is_inactive' | 'deleted'
  description?: string
}

interface IParamsClientFingerprint {
  id: number
  fingerprint: string
}

interface IParamsCancelEvent {
  clientHash?: string
  activityKey?: string
  externalId?: string
  client_hash?: string
  activity_key?: string
  external_id?: string
}

interface IFireEventRequest {
  client_id?: number
  external_id?: string
  client_hash?: string
  activity_key?: string
  activity_created_at?: string
  activity_attributes?: {
    order_comment?: string
  }
}

interface IParamsFireEvent extends IFireEventRequest {
  clientId?: number
  externalId?: string
  clientHash?: string
  activityKey?: string
  activityCreatedAt?: string
  activityAttributes?: {
    order_comment?: string
    orderComment?: string
  }
}

interface IFireEventResponse extends ILoyalmeResponse {
  data?: IFireEventDataResponse
}

interface IFireEventDataResponse {
  id: number
  client_id: number
  external_id: number
  client_hash: string
  activity_key: string
  activity_created_at: string
}

interface IActivityListResponse extends ILoyalmeResponse {
  data?: IActivityListDataResponse[]
}

interface IActivityListDataResponse {
  id: number
  name: string
  system_name: string
  parent_id: number
  parent_system_name: string
  description: string
  example: string
  attributes: {
    id: number
    operation_id: number
    name: string
    system_name: string
    from_parent: number
    type: number
  }[]
}
