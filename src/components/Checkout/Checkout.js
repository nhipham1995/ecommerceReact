import React, {useState, useEffect} from 'react';
import PaymentForm from './PaymentForm';
import AddressForm from './AddressForm';
import {commerce} from '../../lib/commerce';

import { createTheme, ThemeProvider, Typography, Stepper, Paper, Step, StepLabel } from '@mui/material';
import { orange } from '@mui/material/colors';
import useStyle from './styles';

const theme = createTheme({
  status: {
    danger: orange[500],
  },
});

const steps = ['Shipping addresse', 'Payment Details'];

const CheckoutContent = ({cart}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  useEffect(()=>{
    const generateToken = async () =>{
      try {
          const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
          setCheckoutToken(token);
       } catch (error){

       }
    } 
    generateToken();
  }, [cart])

  const nextStep = () => setActiveStep((prevActiveStep)=>(prevActiveStep+1))
  const backStep = () => setActiveStep((prevActiveStep)=>(prevActiveStep-1))

  const next = (data) =>{
    setShippingData(data);
    nextStep();
  }

  const Form = () => activeStep === 0 ? <AddressForm commerce={commerce} checkoutToken={checkoutToken} next={next}/> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken}/>;
  const Confirmation = () => <div>Confirmation</div>
  const classes = useStyle(theme);

  
  return (
    <div className={classes.toolbar}>
        <main className={classes.layout}>
            <Paper className={classes.paper}>
                <Typography variant='h4' align='center'>
                  Checkout
                </Typography>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                  {steps.map(step=>(
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>}

            </Paper>
        </main>
    </div>
  )
}
const Checkout = ({cart})=>{
  return(
    <ThemeProvider theme={theme}>
      <CheckoutContent cart={cart}/>
    </ThemeProvider>
  )
}

export default Checkout