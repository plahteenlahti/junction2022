import * as admin from 'firebase-admin'
import * as cors from 'cors'
import * as express from 'express'
import * as functions from 'firebase-functions'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions
  .region('europe-west3')
  .https.onRequest((request, response) => {
    functions.logger.info('Hello logs!', { structuredData: true })
    response.send('Hello from Firebase!')
  })

// The Firebase Admin SDK to access Firestore.

admin.initializeApp()

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
export const addMessage = functions
  .region('europe-west3')
  .https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text
    // Push the new message into Firestore using the Firebase Admin SDK.

    const writeResult = await admin
      .firestore()
      .collection('messages')
      .add({ original: original })
    // Send back a message that we've successfully written the message
    res.json({ result: `Message with ID: ${writeResult.id} added.` })
  })

const app = express()

// Automatically allow cross-origin requests
app.use(cors({ origin: true }))

// Add middleware to authenticate requests
// app.use(myMiddleware);

// build multiple CRUD interfaces:
// app.get('/:id', (req, res) => res.send(Widgets.getById(req.params.id)));
app.post('/b', (req, res) => {
  console.log(req.body)
  res.send('Hello World!')
  // res.send(Widgets.create())
})

app.get('/helloworld', (req, res) => res.send('Hello World!'))
// app.put('/:id', (req, res) => res.send(Widgets.update(req.params.id, req.body)));
// app.delete('/:id', (req, res) => res.send(Widgets.delete(req.params.id)));
// app.get('/', (req, res) => res.send(Widgets.list()));

// Expose Express API as a single Cloud Function:
export const orders = functions.region('europe-west3').https.onRequest(app)