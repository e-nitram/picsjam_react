const express = require('express');
const { createCheckoutSession } = require('../../libs/stripe');
const router = express.Router();

router.post('/checkout', async (req, res) => {
  const successUrl = `${process.env.WEBHOOK_URI}/stripe-success?session_id={CHECKOUT_SESSION_ID}&openExternalBrowser=1`;

  try {
    const session = await createCheckoutSession(successUrl);
    res.json({url: session.url});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/success', async (req, res) => {
  res.json({ success: true })
})

router.get('/public-key', async (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

module.exports = router;