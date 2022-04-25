import React, {useState, useEffect} from 'react';
import PaymentForm from './PaymentForm';
import AddressForm from './AddressForm';
import {commerce} from '../../lib/commerce';
import {Link} from 'react-router-dom';

import { createTheme, ThemeProvider, Typography, Stepper, Paper, Step, StepLabel, Divider, CircularProgress, Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import useStyle from './styles';

const theme = createTheme({
  status: {
    danger: orange[500],
  },
});

const steps = ['Shipping addresse', 'Payment Details'];

const CheckoutContent = ({cart, onCaptureCheckout, order, error}) => {

  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState({});
  useEffect(()=>{
    const generateToken = async () =>{
      try {
          const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
          setCheckoutToken(token);
       } catch (error){

       }
    } 
    generateToken();
  }, [cart]);

  const test = ()=>{
    console.log('run');
  }

  const nextStep = () => setActiveStep((prevActiveStep)=>(prevActiveStep+1))
  const backStep = () => setActiveStep((prevActiveStep)=>(prevActiveStep-1))

  const next = (data1, data2, data3, data4) =>{
    const data= {...data1, shippingCountry: data2, shippingSubdivision: data3, shippingOption: data4}
    console.log('data checkout: ', data);
    setShippingData(data);
    nextStep();
  }

  const timeout = ()=>{
    setTimeout(()=>{
      setIsFinished(true);
    }, 3000)
  }

  let Confirmation = () => order.customer ? (
    <>
      <div>
        <Typography variant='h5'>
          Thank you for your purchase, {order.customer.fisrtname} {order.customer.lastname}
        </Typography>
        <Divider className='classes.divider'/>
        <Typography variant='subtitle2'>
          Order ref: {order.customer.reference}
        </Typography>
        <br/>
        <Button component={Link} to='/' variant='outlined' type='button'> Back to Home</Button>
      </div>
    </>
  ) : isFinished ? (
    <div>
    <Typography variant='h5'>
      Thank you for your purchase
    </Typography>
    <Divider className='classes.divider'/>
    <br/>
    <Button component={Link} to='/' variant='outlined' type='button'> Back to Home</Button>
  </div>
  ): (<div className={classes.spinner}>
      <CircularProgress/>
  </div>);

  const Form = () => activeStep === 0 ? <AddressForm commerce={commerce} checkoutToken={checkoutToken} next={next}/> : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} onCaptureCheckout={onCaptureCheckout} timeout={timeout} test={test} nextStep={nextStep}/>;
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
const Checkout = ({cart, onCaptureCheckout, order})=>{
  return(
    <ThemeProvider theme={theme}>
      <CheckoutContent cart={cart} order={order} onCaptureCheckout={onCaptureCheckout}/>
    </ThemeProvider>
  )
}

export default Checkout