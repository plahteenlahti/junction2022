export type WoltDetails = {
  id: string
  feeAmount: number
  feeCurrency: string
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
  collection_time?: Date
  deliver_time?: Date
  description?: string

  est_collection_time?: Date
  est_deliver_time?: Date

  receiver_id: string
  sender_id: string

  status: DeliveryStatus
  wolt?: WoltDetails
}

export type Address = {
  city: string
  country: string
  line1: string
  line2: string
  postcode: string
}

export type User = {
  address: Address
  email: string
  phone: string
}
