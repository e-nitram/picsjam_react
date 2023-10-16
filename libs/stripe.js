const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @param {*} email User's email to register to stripe customer
 * @returns return created user's stripe customer ID by his email
 */
const createStripeCustomerId = async (email) => {
  try {
    const stripeCustomer = await stripe.customers.create({
      email: email
    });
    return stripeCustomer.id;
  } catch (err) {
    throw new Error('Stripe customer Id Creation is failed!');
  }
};

const retrieveStripeCustomer = async (customerId) => {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer;
  } catch (err) {
    throw new Error('Error on Customer retrieving');
  }
};

/**
 * @param {*} successUrl
 * @param {*} customerId =>
 * @returns session url to implement stripe subscription
 */
const createCheckoutSession = async (successUrl, customerId, planId) => {
  const monthlySubscriptionPriceId = process.env.STRIPE_MONTHLY_SUBSCRIPTION_ID;

  const sessionInput = {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: monthlySubscriptionPriceId,
        quantity: 1
      }
    ],
    metadata: {
      planId: planId
    },
    success_url: successUrl,
    cancel_url: 'https://example.com/cancel',
    customer: customerId, // ID of the Stripe customer
    subscription_data: {
      metadata: [] // Add metadata if needed
    }
  };

  try {
    const session = await stripe.checkout.sessions.create(sessionInput);
    return session;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

/**
 * @param {*} customerId
 * @returns Find the list of subscriptions for one user and return.
 */
const checkSubscriptionStatus = async (customerId) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId
    });
    return subscriptions.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

/**
 * @param {*} subscriptions
 * @returns Activated subscriptions for one customer
 */
const hasActiveSubscription = (subscriptions) => {
  return subscriptions.some((subscription) => subscription.status === 'active');
};

module.exports = {
  createStripeCustomerId,
  createCheckoutSession,
  checkSubscriptionStatus,
  hasActiveSubscription
};
