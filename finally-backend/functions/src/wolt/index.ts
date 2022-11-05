import { createDeliveryOrder, getDeliveryFee } from './api'
import { CUSTOMER_SUPPORT_INFO } from './constants'
import { stringifyAddress } from '../utils'
import { User } from '../types'
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

export const bookDelivery = async (
  secrets: WoltSecrets,
  sender: User,
  recipient: User,
  dropoffTime: Date | null, // null means "as soon as possible"
  itemName: string
  // eslint-disable-next-line max-params
) => {
  const pickupContact = {
    name: recipient.name,
    phone_number: recipient.phone,
    send_tracking_link_sms: false,
  }
  const dropoffContact = {
    name: sender.name,
    phone_number: sender.phone,
    send_tracking_link_sms: false,
  }
  const fromAddress = stringifyAddress(sender.address)
  const toAddress = stringifyAddress(recipient.address)
  const itemInfo: Wolt.Content = {
    count: 1,
    description: itemName,
    identifier: itemName,
    tags: [],
  }
  const deliveryOrderResponse = await createDeliveryOrder(
    secrets,
    fromAddress,
    toAddress,
    pickupContact,
    dropoffContact,
    CUSTOMER_SUPPORT_INFO,
    [itemInfo],
    dropoffTime?.toISOString()
  )
  if (deliveryOrderResponse.status === 'ok') {
    const { response } = deliveryOrderResponse
    return {
      status: 'ok' as const,
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
