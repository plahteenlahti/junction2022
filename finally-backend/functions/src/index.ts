import * as admin from 'firebase-admin'
import * as cors from 'cors'
import * as express from 'express'
import * as functions from 'firebase-functions'

import { confirmDelivery, mockWoltPreviewDelivery } from './routes/delivery'
import { createMockDeliveries, createMockUsers } from './db/mockData'
import { defineSecret } from 'firebase-functions/params'

const woltApiToken = defineSecret('WOLT_API_TOKEN')
const woltMerchantId = defineSecret('WOLT_MERCHANT_ID')

admin.initializeApp()

const app = express()

// Automatically allow cross-origin requests
app.use(cors({ origin: true }))

app.get('/helloworld', (req, res) => {
  res.send('Hello World!')
})

app.get('/mock/send-wolt-request', mockWoltPreviewDelivery)

app.get('/mock/create', async (req, res) => {
  try {
    await createMockDeliveries()
    await createMockUsers()
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message)
    }
  }
  res.status(201).send('ok')
})

app.post('/confirm/:id', confirmDelivery)

// Expose Express API as a single Cloud Function:
export const orders = functions
  .runWith({ secrets: [woltMerchantId, woltApiToken] })
  .region('europe-west3')
  .https.onRequest(app)
