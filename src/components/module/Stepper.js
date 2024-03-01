import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const steps = [' شماره همراه ', ' رمز جدید '];

export default function StepperModule({activeStep}) {


  return (
    <div className='w-full'>
      <Stepper activeStep={activeStep} >
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};

          return (
            <Step className='gap-3' key={label} {...stepProps}>
              <StepLabel className='mx-1 gap-2'  {...labelProps}> {label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

    </div>
  );
}