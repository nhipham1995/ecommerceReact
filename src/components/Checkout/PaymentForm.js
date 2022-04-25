import React, {useState} from 'react'
import {Button, Typography, Divider } from '@mui/material';
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Review from './Review';
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const PaymentForm = ({checkoutToken, backStep, nextStep, shippingData, onCaptureCheckout, timeout, test}) => {
  const [stripePromise, setStripePromise] = useState(() => loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY))

  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();
    console.log('stripe: ', stripe);
    console.log('elements: ', elements);

    if (!stripe || !elements) return console.log("dont have stripe or elements");

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement});
    if (error) {
      console.log('[error]', error);
    } else {
      console.log('shipping data: ',shippingData);
      console.log('payment method: ', paymentMethod);
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: { firstname: shippingData.firstName, lastname: shippingData.lastName, email: shippingData.mail },
        shipping: { name: 'International', street: shippingData.address, town_city: shippingData.city, county_state: shippingData.shippingSubdivision, postal_zip_code: shippingData.postalcode, country: shippingData.shippingCountry },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
            id: paymentMethod.id,
            stripe: paymentMethod.id
          },
        },
      };
      console.log(orderData);
      test();
      onCaptureCheckout(checkoutToken.id, orderData);
      timeout();
      nextStep();
    }
  };

  return (
    <div>
      <Review checkoutToken={checkoutToken}/>
      <Divider/>
      <Typography variant='h6' gutterBottom style={{}}>Payment Method</Typography>
      <Elements stripe={stripePromise} >
        <ElementsConsumer>
          {({elements, stripe})=>(
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement/>
              <br/>
              <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <Button variant='outlined' onClick={backStep}>Back</Button>
                <Button type='submit' variant='contained' disable='true' color='primary' >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  )
}

export default PaymentForm