import React from 'react'
import {Button, Typography, Card, CardMedia, CardContent, CardActions} from '@mui/material';
import useStyles from './styles';

const CartItem = ({item, handleRemoveFromCart, handleUpdateCartQty}) => {
    const classes = useStyles();
  
    return (
        <Card>
            <CardMedia className={classes.media} alt={item.name} image={item.image?.url}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h6" gutterBottom>
                        {item.name}
                    </Typography>
                    <Typography variant="h6">
                        {item.price.formatted_with_symbol}
                    </Typography>
                </div>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <div arial-label="Add to Cart" className={classes.buttons} >
                    <Button className={classes.button} 
                            type="button" 
                            size='small' 
                            onClick={()=>handleUpdateCartQty(item.id, item.quantity-1)}>
                        -
                    </Button>
                    <Typography color='textSecondary'>
                        {item.quantity}
                    </Typography>
                    <Button type="button" 
                            size='small' 
                            className={classes.button}
                            onClick={()=>handleUpdateCartQty(item.id, item.quantity+1)}>
                        +
                    </Button>
                </div>
                <Typography variant="h7">
                    Total: €{item.price.raw*item.quantity}
                </Typography>
                <Button type="button" 
                        size="small" 
                        variant='contained' 
                        color='error'
                        onClick={()=>handleRemoveFromCart(item.id)}>
                    Remove
                </Button>
  
            </CardActions >
        </Card>
    )
}

export default CartItem