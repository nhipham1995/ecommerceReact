import React from 'react';
// import ReactDatePicker from "react-datepicker";
import {TextField, Grid} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({name, label, required}) => {
    const {control} = useFormContext();
    const isError = false;

  return (
    <div>
        <Grid item xs={12} sm={6}>
            <Controller
                as={TextField}
                control={control}
                fullWidth
                name={name}
                label={label}   
                required= {required}
                error={isError}

                //we success to add input First Name
                render = {({field})=> (
                  <TextField
                      fullWidth
                      label={label}
                      required
                      variant='standard'
                      style={{minWidth: '250px'}}
                      {...field}
                  />
              )}
            >
            </Controller>
        </Grid>
    </div>
    
  )
}

export default FormInput;