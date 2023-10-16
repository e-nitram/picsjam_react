import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React from 'react'

function StripeCheckout() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);

    if (result.error) {
      console.error(result.error.message);
    } else {
      // Send the token to your server for payment processing
      const response = await fetch('/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: result.token.id })
      });

      // Handle server response and errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
}

export default StripeCheckout;
