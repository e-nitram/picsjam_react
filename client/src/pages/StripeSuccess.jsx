import React from 'react';
import { useSearchParams } from 'react-router-dom';

function StripeSuccess() {
  const [searchParams, setSearchParams] = useSearchParams();
  const checkoutSuccessId = searchParams.get('session_id');

  return (
    <div style={{ color: "white" }}>Stripe Payment Successed: {checkoutSuccessId}</div>
  );
}

export default StripeSuccess;
