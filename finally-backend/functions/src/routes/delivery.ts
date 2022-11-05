import { defineSecret } from 'firebase-functions/params'
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
