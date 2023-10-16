const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create and return checkout session in stripe
const createCheckoutSession = async (
  successUrl
) => {
  const productID = process.env.STRIPE_PRODUCT_ID_10_PHOTOS;
  const products = await stripe.products.retrieve(productID);
  // key - value format
  let metadata = {
    photo_page_id: "11111",
    purchased_photo_0: "",
    purchased_photo_1: "",
    purchased_photo_2: "",
    purchased_photo_3: "",
    purchased_photo_4: "",
    purchased_photo_5: "",
    purchased_photo_6: "",
    purchased_photo_7: "",
    purchased_photo_8: "",
    purchased_photo_9: "",
  };

  const sessionInput = {
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: products.default_price,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: successUrl,
    metadata: [], // for application use
    payment_intent_data: {
      metadata: [], // to show in stripe admin page
    },
  };
  console.log(sessionInput)
  try {
    const session = await stripe.checkout.sessions.create(sessionInput);
    return session;
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
  // return { url: "https://github.com/melodyxpot"}
}

module.exports = {
  createCheckoutSession
}