type WoltDetails = {
  orderId: string
  feeAmount: number
  feeCurrency: string
}

type DeliveryStatus =
  | 'created'
  | 'accepted'
  | 'ordered'
  | 'shipped'
  | 'delivered'
  | 'rejected'
  | 'error'

export type Delivery = {
  receiver_id: string
  sender_id: string
  status: DeliveryStatus
  description: string

  pickup_eta?: string
  deliver_eta?: string

  woltDetails?: WoltDetails
}

export type Address = {
  city?: string
  country?: string
  line1?: string
  line2?: string
  postcode?: string
}

export type User = {
  address?: Address | null
  email?: string | null
  name?: string | null
  phone?: string | null
}
