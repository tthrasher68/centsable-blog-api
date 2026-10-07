import express from 'express';

import { insertWebhookEvent } from '../db/index.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const signature = req.headers['x-webhook-signature'] || req.headers['x-hub-signature'];
  const secret = process.env.WEBHOOK_SECRET;

  if (secret && signature) {
    const expected = Buffer.from(secret).toString('hex');
    if (signature !== expected) {
      return res.status(401).json({ error: 'Invalid webhook signature' });
    }
  }

  try {
    const eventName = req.body?.event || 'unknown';
    await insertWebhookEvent(eventName, req.body || {});
    return res.status(200).json({ ok: true, event: eventName });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to process webhook' });
  }
});

export default router;
