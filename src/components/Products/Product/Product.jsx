import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@mui/material';
import {AddShoppingCart} from '@material-ui/icons';

import useStyles from './styles';
import DOMPurify from 'dompurify';

const Product = ({product, onAddToCart}) => {
    const classes = useStyles();

    const sanitizedData = () => ({
        __html: DOMPurify.sanitize(product.description)
    })

    return (
        <Card className={classes.root}>
            <CardMedia  className={classes.media} image={product.image.url} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="h6">
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography variant='body2' color='textSecondary' dangerouslySetInnerHTML={sanitizedData()}/>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton arial-label="Add to Cart" onClick={()=>onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions >
        </Card>
    )
}

export default Product