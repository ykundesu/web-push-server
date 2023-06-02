const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express()
app.use(cors())
app.use(express.json({ type: '*/*' }))

const webpush = require('web-push');

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

app.post('/api/submit', cors(), async (req, res) => {
  request.post({url:'https://sssokuhoupusher-1-b0836240.deta.app/', form:req.body}, (error, response, body) => {await res.json(req.body)});
  //res.json(await send(req.body))
})

export default app
