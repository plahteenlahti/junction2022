import { bookDelivery } from '../wolt'
import { defineSecret } from 'firebase-functions/params'
import { getDelivery, getUser, updateDelivery } from '../db'
import { mockPreviewDelivery } from '../wolt/mock'
import { RequestHandler } from 'express'
import { WoltSecrets } from '../wolt/types'

const woltApiToken = defineSecret('WOLT_API_TOKEN')
const woltMerchantId = defineSecret('WOLT_MERCHANT_ID')

export const mockWoltPreviewDelivery: RequestHandler = async (req, res) => {
  const secrets: WoltSecrets = {
    apiToken: woltApiToken.value(),
    merchantId: woltMerchantId.value(),
  }

  await mockPreviewDelivery(secrets)

  res.send('done!')
}

export const confirmDelivery: RequestHandler = async (req, res) => {
  const secrets: WoltSecrets = {
    apiToken: woltApiToken.value(),
    merchantId: woltMerchantId.value(),
  }
  const deliveryId = req.params.id

  const delivery = await getDelivery(deliveryId)
  if (!delivery) {
    res.status(404).send({ result: 'not_found' })
    return
  }

  if (delivery.status !== 'accepted') {
    res.status(400).send({ result: 'invalid_order_status' })
    return
  }

  const recipient = await getUser(delivery.receiver_id)
  const sender = await getUser(delivery.sender_id)

  if (!recipient || !sender) {
    res.status(400).send({ result: 'invalid_user' })
    return
  }

  const response = await bookDelivery(
    secrets,
    sender,
    recipient,
    null,
    delivery.description
  )

  if (response.status === 'error') {
    res.status(400).send({ result: 'error', errorCode: response.errorCode })
  }

  await updateDelivery(deliveryId, {
    pickup_eta: response.pickupEta!,
    deliver_eta: response.dropoffEta!,
    woltDetails: {
      orderId: response.orderId!,
      trackingUrl: response.trackingUrl!,
      feeAmount: response.fee!.amount,
      feeCurrency: response.fee!.currency,
    },
    status: 'ordered',
  })

  res.status(201).send({ result: 'ok', deliveryOrderResponse: response })
}
