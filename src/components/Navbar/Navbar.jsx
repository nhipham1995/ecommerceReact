import React from 'react'
import {Link, useLocation} from 'react-router-dom';

import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography, Icon } from '@mui/material';
import {ShoppingCart} from '@material-ui/icons';
import { createTheme, ThemeProvider } from '@mui/material';
import { orange } from '@mui/material/colors';

import logo from '../../assets/logo.webp';
import useStyles from './styles';

const theme = createTheme({
    status: {
      danger: orange[500],
    },
});

const AppBarContent = ({totalItems})=>{
    const classes = useStyles(theme);
    const location= useLocation();
    return (
        <AppBar position="fixed" className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color='inherit'>
                        <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
                        Commerce.js
                    </Typography>
                    <div className={classes.row}/>
                    {location.pathname === '/' ? (
                        <div className={classes.button}>
                            <IconButton component={Link} to='/cart' aria-label='Show cart item' color='inherit'>
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>

                            </IconButton>
                        </div>
                    ) : null}
                </Toolbar>
            </AppBar>
    )
}
const Navbar = ({totalItems}) => {
    return (
        <ThemeProvider theme={theme}>
            <AppBarContent totalItems={totalItems}/>
        </ThemeProvider>
    )
}

export default Navbar