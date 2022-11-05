export namespace Wolt {
  type LocationDetails = {
    formatted_address: string
    coordinates?: {
      lon: number
      lat: number
    }
  }

  export type ContactDetails = {
    name: string
    phone_number: string
    send_tracking_link_sms: boolean
  }

  export type CustomerSupport = {
    email: string
    phone_number: string
    url: string
  }

  export type Content = {
    count: number
    description: string
    identifier: string
    tags: string[]
  }

  type Price = {
    amount: number
    currency: string // ISO 4217 three-letter currency code
  }

  type Tip = {
    type: 'pre_delivery_courier_tip'
    price: Price
  }

  type Tracking = { id: string; url: string }

  export type DeliveryFeeRequestPayload = {
    pickup: { location: LocationDetails }
    dropoff: { location: LocationDetails }
    scheduled_dropoff_time?: string
  }

  export type DeliveryFeeResponse = {
    created_at: string
    pickup: { location: LocationDetails }
    dropoff: { location: LocationDetails }
    fee: Price
    time_estimate_minutes: number | null
    scheduled_dropoff_time: string | null
  }

  type OrderLocationDetails = {
    location: LocationDetails
    comment?: string
    contact_details: ContactDetails
  }

  type OrderLocationResponseDetails = OrderLocationDetails & { eta: string }

  export type DeliveryOrderRequestPayload = {
    pickup: OrderLocationDetails
    dropoff: OrderLocationDetails
    customer_support: CustomerSupport
    merchant_order_reference_id?: string
    is_no_contact: boolean
    contents: Content[]
    tips: Tip[]
    min_preparation_time_minutes: number
    scheduled_dropoff_time?: string
  }

  export type DeliveryOrderResponse = {
    pickup: OrderLocationResponseDetails
    dropoff: OrderLocationResponseDetails
    customer_support: CustomerSupport
    merchant_order_reference_id: string | null
    is_no_contact: boolean
    contents: Content[]
    tips: Tip[]
    price: Price
    tracking: Tracking
    wolt_order_reference_id: string
    min_preparation_time_minutes: number
    scheduled_dropoff_time: string | null
  }

  export type VenuelessDeliveryPublicApiErrorResponse = {
    error_code: string
    reason: string
    details: string
  }
}

export type WoltSecrets = {
  apiToken: string
  merchantId: string
}
