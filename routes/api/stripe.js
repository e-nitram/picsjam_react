const express = require('express');
const { createCheckoutSession } = require('../../libs/stripe');
const router = express.Router();
const UserModel = require('../../models/User');
const authMiddleware = require('../../middleware/auth');

router.post('/checkout', authMiddleware, async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  const { planId } = req.body;
  const successUrl = `${process.env.WEBHOOK_URI}/stripe-success?session_id={CHECKOUT_SESSION_ID}&openExternalBrowser=1&planId=${planId}`;
  if (!planId) {
    return res.status(400).json({ success: false, msg: 'painId is required' });
  }

  try {
    const session = await createCheckoutSession(
      successUrl,
      user.subscription.customerId,
      planId
    );
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/plans', async (req, res) => {
  res.json({
    pro: process.env.STRIPE_PRO_PLAN_ID,
    unlimited: process.env.STRIPE_UNLIMITED_PLAN_ID
  });
});

router.post('/success', authMiddleware, async (req, res) => {
  const userId = req.user._id;
  const { planId } = req.body;
  try {
    let user = await UserModel.findById(userId);
    user.subscription.planId = planId;
    await user.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/public-key', async (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

module.exports = router;
