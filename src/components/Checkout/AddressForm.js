import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import FormInput from './CustomTextField';


import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@mui/material'; 
import {useForm, FormProvider, useFormContext} from 'react-hook-form';

const AddressForm = ({commerce, checkoutToken, next}) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const methods = useForm();
 
  const countries = Object.entries(shippingCountries).map(([code, name])=>({id: code, label: name}));
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name])=>({id: code, label: name}));
  const options = shippingOptions.map((sO)=>({id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  }

  const fetchSubdivisions = async (countryCode) =>{
    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  }

  const fetchShippingOptions = async (checkoutTokenId, country, region = null ) =>{
    const option = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});
    setShippingOptions(option);
    setShippingOption(option[0].id)
  }

  useEffect(()=>{
      fetchShippingCountries(checkoutToken.id)   
  }, [])

  useEffect(()=>{
      if(shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry])
 
  useEffect(()=>{
    if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
  }, [shippingSubdivision])

  
  return (
    <div style={{margin: '20px'}}>
        <Typography variant='h6' gutterBottom>Shipping Address</Typography>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit((data)=>{next(data, shippingCountry, shippingSubdivision, shippingOption)})}>
              <Grid container spacing={1}  >
                <Grid item xs={12} md={6} >
                  <FormInput required name='firstName' label='First Name' />
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInput required name='lastName' label='Last Name'/>
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInput required name='address' label='Address'/>
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInput required name='mail' label='Email'/>
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInput required name='city' label='City'/>
                </Grid>
                <Grid item xs={12} md={6} >
                  <FormInput required name='postalcode' label='ZIP/ Postal Code'/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Country</InputLabel>
                  <Select value={shippingCountry} fullWidth onChange={(e)=> setShippingCountry(e.target.value)}>
                      {countries.map((country) =>(
                        <MenuItem key={country.id} value={country.id}>
                          {country.label}
                        </MenuItem>
                      ))
                      }
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping SubDivision</InputLabel>
                  <Select value={shippingSubdivision} fullWidth onChange={(e)=> setShippingSubdivision(e.target.value)}>
                      {subdivisions.map((subdivision) =>(
                        <MenuItem key={subdivision.id} value={subdivision.id}>
                          {subdivision.label}
                        </MenuItem>
                      ))
                      }
                  </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputLabel>Shipping Options</InputLabel>
                  <Select value={shippingOption} fullWidth onChange={(e)=> setShippingOption(e.target.value)}>
                      {options.map((option) =>(
                        <MenuItem key={option.id} value={option.id}>
                          {option.label}
                        </MenuItem>
                      ))
                      }
                  </Select>
                </Grid>
              </Grid>
              <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '50px'}}>
                <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                <Button type='submit' variant='contained'>Next</Button>
              </div>
          </form>
        </FormProvider>
    </div>
  )
}


export default AddressForm