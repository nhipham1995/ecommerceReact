import React from 'react'
import {Button, Typography } from '@mui/material';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';

const PaymentForm = ({checkoutToken}) => {
  return (
    <div>
      <Review checkoutToken={checkoutToken}/>
    </div>
  )
}

export default PaymentForm