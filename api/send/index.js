import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json({ type: '*/*' }))

import webpush from 'web-push'

const defaultVapidDetails = {
  subject: 'mailto:example@yourdomain.org',
  publicKey: 'BC8ygaVnDFVOM8akuGRXNQhfMAbgUjExGHtx1A7bClqex95gHNQtIv70ULZoZhI2WvjBovXYrouCGJ70jZczpUo',
  privateKey: 'S3s7NCu8wjgZd3B_PwmQfc1HeLa3EhBN--IBtb9tvCE',
}

const send = o => webpush.sendNotification(o.subscription, JSON.stringify(o.payload || { title: 'Hello' }), {
  vapidDetails: { ...defaultVapidDetails, ...o.vapidDetails },
  headers: { Urgency: 'high' },
  TTL: 0
})

app.get('/api/send', cors(), async (req, res) => {
  if (req.query.json) res.json(await send(JSON.parse(req.query.json)))
  else res.send()
})

app.post('/api/send', cors(), async (req, res) => {
  res.json(await send(req.body))
})

export default app
