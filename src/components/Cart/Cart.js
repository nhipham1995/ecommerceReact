import React from 'react';
import {Link} from 'react-router-dom';
import CartItem from './CartItem/CartItem';


import {Container, Typography, Button, Grid} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';
import useStyles from './styles';

const theme = createTheme({
    status: {
      danger: orange[700],
    },
});

const CartContent = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {
    const classes = useStyles(theme);
    const isEmpty = !(cart.line_items && cart.line_items.length);

    const EmptyCart = ()=> (
        <Typography variant='subtitle1'>
            You gave no items in your shopping cart, start add somes!
        </Typography>
    )

    const FilledCart = () => (
        <>
            <Grid container spacing={3} >
                {cart.line_items.map((item)=>(
                    <Grid item xs={12} sm={4} lg={3} key={item.id} >
                        <CartItem item={item}      
                                  handleUpdateCartQty={handleUpdateCartQty}
                                  handleRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h4' className={classes.cardDetails}>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                    <div>
                        <Button className={classes.emptyButton} 
                                component= {Link}
                                to='/'
                                size='medium' 
                                variant='contained' 
                                color='secondary' 
                                type='button'
                                onClick={handleEmptyCart}>
                            Empty Cart
                        </Button>
                        <Button className={classes.checkoutButton} 
                                component={Link}
                                to='/checkout'
                                size='medium' 
                                variant='contained' 
                                color='primary' 
                                type='button' 
                                sx={{m:2}}>
                            Checkout
                        </Button>
                    </div>
                </Typography>
            </div>
        </>
      
    )
  return (
    <Container>
        <div className={classes.toolbar}/>
        <Typography className={classes.title} variant='h3' sx={{m:2}}>
            Your Shopping Cart
        </Typography>
        {isEmpty ? <EmptyCart/> : <FilledCart/>}
    </Container>
  )
}

const Cart = ({cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {
    if(!cart.line_items) return 'Loading...';
    return (
        <ThemeProvider theme={theme}>
            <CartContent cart={cart} 
                         handleUpdateCartQty={handleUpdateCartQty}
                         handleRemoveFromCart={handleRemoveFromCart}
                         handleEmptyCart={handleEmptyCart}/>
        </ThemeProvider>
    )
}
export default Cart