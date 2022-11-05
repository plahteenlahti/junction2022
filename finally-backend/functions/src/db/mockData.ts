import * as admin from 'firebase-admin'
import { Address, Delivery, User } from '../types'

const getMockDelivery = (data?: Partial<Delivery>): Delivery => ({
  receiver_id: '0',
  sender_id: '1',
  status: 'created',

  description: 'One apple',
  ...data,
})

const getMockUser = (data?: Partial<User>): User => ({
  name: 'John Doe',
  email: 'first-user@zajo.io',
  phone: '+358123456789',
  address: {
    city: 'Helsinki',
    country: 'Finland',
    line1: 'table C29',
    line2: 'Otakaari 24',
    postcode: '02150',
  },
  ...data,
})

export const createMockDeliveries = async () => {
  await admin
    .firestore()
    .collection('deliveries')
    .doc('0')
    .create(getMockDelivery())
}

export const createMockUsers = async () => {
  const otherAddress: Address = {
    city: 'Helsinki',
    country: 'finland',
    line1: 'Mäntyniementie',
    line2: '',
    postcode: '',
  }
  await admin.firestore().collection('users').doc('0').create(getMockUser())
  await admin
    .firestore()
    .collection('users')
    .doc('1')
    .create(getMockUser({ address: otherAddress }))
}
