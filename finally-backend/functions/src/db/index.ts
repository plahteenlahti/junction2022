import * as admin from 'firebase-admin'
import { Delivery, User } from '../types'

export const getDelivery = async (id: string): Promise<Delivery | null> => {
  const doc = await admin.firestore().collection('deliveries').doc(id).get()

  if (doc.exists) return doc.data() as Delivery
  return null
}

export const updateDelivery = async (id: string, data: Partial<Delivery>) => {
  const doc = admin.firestore().collection('deliveries').doc(id)
  await doc.update(data)
}

export const getUser = async (id: string): Promise<User | null> => {
  const doc = await admin.firestore().collection('users').doc(id).get()

  if (doc.exists) return doc.data() as User
  return null
}
