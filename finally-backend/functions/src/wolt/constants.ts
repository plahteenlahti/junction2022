import { Wolt } from './types'

export enum WoltErrorCode {
  INVALID_PAYLOAD = 'INVALID_PAYLOAD', // probably address issue
  INVALID_SCHEDULED_DROPOFF_TIME = 'INVALID_SCHEDULED_DROPOFF_TIME',
}

export const CUSTOMER_SUPPORT_INFO: Wolt.CustomerSupport = {
  email: 'best-team@junction2022.com',
  phone_number: '+358123456789',
  url: 'www.google.com',
}
