'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Avatar, ListDivider, ListItemDecorator, Option, Select } from '@mui/joy';
import { Edit, StackedBarChart } from '@mui/icons-material';

// select part for first step ----------------
const options = [
    { value: '1', label: 'سرامیک' },
    { value: '2', label: 'کاشی' },
    { value: '3', label: 'تایل' },
  ];
  
  function renderValue(option) {
    if (!option) {
      return null;
    }
  
    return (
      <>
        <ListItemDecorator>
          <Edit/>
        </ListItemDecorator>
        {option.label}
      </>
    );
  }



const AddTextureMainPage = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };
  
    return (
        <div className='w-full flex justify-center items-center' >

            <div className='w-[70%] '>
                <Stepper className='flex' activeStep={activeStep} orientation="vertical">
                    <Step className='py-4'>
                        <StepLabel >
                            <div className='text-xl font-bold text-right ' >
                            گام اول: انتخاب گروه کالا 
                            </div>
                        </StepLabel>
                        <StepContent>
                            <div className='w-[30%] my-8'>
                                <Select
                                    defaultValue="1"
                                    slotProps={{
                                        listbox: {
                                        sx: {
                                            '--ListItemDecorator-size': '44px',
                                        },
                                        },
                                    }}
                                    sx={{
                                        '--ListItemDecorator-size': '44px',
                                        minWidth: 240,
                                    }}
                                    renderValue={renderValue}
                                    >
                                    {options.map((option, index) => (
                                        <div key={option.value}>
                                        {index !== 0 ? <ListDivider role="none" inset="startContent" /> : null}
                                        <Option value={option.value} label={option.label}>
                                            <ListItemDecorator>
                                                <StackedBarChart/>
                                            </ListItemDecorator>
                                            {option.label}
                                        </Option>
                                        </div>
                                    ))}
                                </Select>
                            </div>
                            <div>
                                <div className=' w-full text-left '>
                                    <button
                                        className='w-36 p-2 rounded-2xl bg-asliLight hover:bg-sky-600 text-white'
                                        onClick={handleNext}
                                    >
                                     انتخاب گروه کالا
                                    </button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>
                            <div className='text-xl font-bold text-right' >
                            گام دوم: درج اطلاعات کالا 
                            </div>
                        </StepLabel>
                        <StepContent>
                            <Typography> توضیحات اضافه </Typography>
                            <div className='my-8' >

                            </div>
                            <div>
                                <div className='flex flex-row gap-3 w-full justify-end'>
                                    <button
                                        className='w-24 p-2 rounded-2xl bg-asliLight hover:bg-sky-600 text-white'
                                        onClick={handleNext}
                                    >
                                    ادامه
                                    </button>
                                    <button
                                    className='p-2 rounded-2xl  hover:bg-red-100'
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    >
                                    بازگشت
                                    </button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                </Stepper>
                {/* {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                    Reset
                    </Button>
                </Paper>
                )} */}
            </div>

        </div>

    );
}

export default AddTextureMainPage;