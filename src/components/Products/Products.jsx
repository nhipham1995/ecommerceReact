import React from 'react';
import {Grid} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';

import Product from './Product/Product.jsx';
import useStyle from './styles';


// const products = [
//     {id:1, name: 'shoes',  description: 'Running shoes.', price: '75$', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60'},
//     {id:2, name:'Macbook', description: "Apple macbook.", price: '1450$', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1926&q=80'}
// ]

const theme = createTheme({
    status: {
      danger: orange[500],
    },
});

const ProductsContent = ({products, onAddToCart})=>{
    const classes = useStyle(theme);
    return(
        <main className={classes.content}>
            <div className={classes.toolbar}>
                <Grid container justifyContent="center" spacing={4}>
                    {products.map(product=>{
                        return(
                            <Grid item key={product.id} xs={12} s={6} md={4} lg={3}>
                                <Product product={product} onAddToCart={onAddToCart}/>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        </main>
        
    )
}
const Products = ({products, onAddToCart}) => {
    return (
    <ThemeProvider theme={theme}>
        <ProductsContent products={products} onAddToCart={onAddToCart}/>
    </ThemeProvider>
  )
}

export default Products;