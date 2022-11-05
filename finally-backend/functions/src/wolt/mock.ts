import { createDeliveryOrder, getDeliveryFee } from './api'
import { Wolt } from './types'

export const MOCK_CONTACT: Wolt.ContactDetails = {
  name: 'John Doe',
  phone_number: '+358123456789',
  send_tracking_link_sms: false,
}
export const MOCK_CUSTOMER_SUPPORT: Wolt.CustomerSupport = {
  email: 'john@doe.com',
  phone_number: '+358123456789',
  url: 'www.johndoe.com',
}

export const TO_ADDRESS = 'Otakaari 24, 02150 Espoo'
export const FROM_ADDRESS = 'Veturitallinkuja, 00520 Helsinki'
export const SCHEDULED_TIME = new Date(
  Date.now() + 62 * 60 * 1000
).toISOString()

export const mockGetDeliveryFee = async () => {
  return getDeliveryFee(FROM_ADDRESS, TO_ADDRESS, SCHEDULED_TIME)
}
export const mockGetDeliveryOrder = async () => {
  return createDeliveryOrder(
    FROM_ADDRESS,
    TO_ADDRESS,
    MOCK_CONTACT,
    MOCK_CONTACT,
    MOCK_CUSTOMER_SUPPORT,
    [],
    SCHEDULED_TIME
  )
}
