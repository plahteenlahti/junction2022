import { createDeliveryOrder, getDeliveryFee } from './api'
import { CUSTOMER_SUPPORT_INFO } from './constants'
import { Wolt, WoltSecrets } from './types'

export const previewDelivery = async (
  secrets: WoltSecrets,
  pickupAddress: string,
  dropoffAddress: string,
  dropoffTime: Date | null // null means "as soon as possible"
) => {
  const deliveryFeeResponse = await getDeliveryFee(
    secrets,
    pickupAddress,
    dropoffAddress,
    dropoffTime?.toISOString()
  )
  if (deliveryFeeResponse.status === 'ok') {
    const { response } = deliveryFeeResponse
    return {
      status: 'ok' as const,
      fee: response.fee,
      timeEstimate: response.time_estimate_minutes,
    }
  }
  return {
    status: 'error' as const,
    errorCode: deliveryFeeResponse.response.error_code,
  }
}

type ContactInfo = {
  name: string
  phoneNumber: string // international format
}

export const bookDelivery = async (
  secrets: WoltSecrets,
  pickupAddress: string,
  dropoffAddress: string,
  dropoffTime: Date | null, // null means "as soon as possible"
  recipient: ContactInfo,
  sender: ContactInfo,
  itemName: string
  // eslint-disable-next-line max-params
) => {
  const pickupContact = {
    ...recipient,
    phone_number: recipient.phoneNumber,
    send_tracking_link_sms: false,
  }
  const dropoffContact = {
    ...sender,
    phone_number: sender.phoneNumber,
    send_tracking_link_sms: false,
  }
  const itemInfo: Wolt.Content = {
    count: 1,
    description: itemName,
    identifier: itemName,
    tags: [],
  }
  const deliveryOrderResponse = await createDeliveryOrder(
    secrets,
    pickupAddress,
    dropoffAddress,
    pickupContact,
    dropoffContact,
    CUSTOMER_SUPPORT_INFO,
    [itemInfo],
    dropoffTime?.toISOString()
  )
  if (deliveryOrderResponse.status === 'ok') {
    const { response } = deliveryOrderResponse
    return {
      status: 'ok',
      fee: response.price,

      orderId: response.wolt_order_reference_id,
      trackingId: response.tracking.id,
      trackingUrl: response.tracking.url,

      pickupEta: response.pickup.eta,
      dropoffEta: response.dropoff.eta,
    }
  }
  return {
    status: 'error' as const,
    errorCode: deliveryOrderResponse.response.error_code,
  }
}
