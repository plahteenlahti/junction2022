type WoltDetails = {
  orderId: string
  feeAmount: number
  feeCurrency: string

  trackingUrl: string
}

export type DeliveryStatus =
  | 'created'
  | 'accepted'
  | 'ordered'
  | 'shipped'
  | 'delivered'
  | 'rejected'
  | 'error'

export type Delivery = {
  id: string
  receiver_id: string
  sender_id: string
  paying_user_id: string
  status: DeliveryStatus
  description: string

  pickup_eta?: string
  deliver_eta?: string

  woltDetails?: WoltDetails
}

export type Address = {
  city: string
  country: string
  line1: string
  line2: string
  postcode: string
}

export type User = {
  id: string
  address: Address
  email: string
  name: string
  phone: string
}
