import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from 'utils/api';

function StripeSuccess() {
  const [searchParams, setSearchParams] = useSearchParams();
  const checkoutSuccessId = searchParams.get('session_id');
  const planId = searchParams.get('planId');

  useEffect(() => {
    api
      .post('/stripe/success', {
        planId
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ color: 'white' }}>
      Stripe Payment Successed: {checkoutSuccessId}
    </div>
  );
}

export default StripeSuccess;
