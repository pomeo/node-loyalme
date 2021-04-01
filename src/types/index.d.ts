interface ILoyalmeConfig {
  url: string
  token: string
  pointId: number
  brandId: number
  personId: number
}

interface ILoyalmeBirthday {
  date: string
  timezone_type: number
  timezone: string
}

interface ILoyalmeClientHash {
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
  otherPhonesSubscribe?: number[]
  otherEmails?: string[]
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
  other_phones_subscribe?: number[]
  other_emails?: string[]
  other_emails_subscribe?: number[]
  person_id?: number
  point_id?: number
  brand_id?: number
}

interface IClientRequest {
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
  client_hash?: string | ILoyalmeClientHash[]
  other_phones?: string[]
  other_phones_subscribe?: number[]
  other_emails?: string[]
  other_emails_subscribe?: number[]
  attribute?: { [key: string]: string }
  person_id: number
  external_id?: string
}


interface IClientResponse {
  message?: string
  code?: number
  status_code?: number
  data?: {
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
  }[]
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

interface ILoyalmeError {
  message: string
  code: number
  status_code: number
}
