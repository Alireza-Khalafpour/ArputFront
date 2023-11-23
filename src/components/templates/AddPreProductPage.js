'use client'


import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Avatar, ListDivider, ListItemDecorator, Option, Select } from '@mui/joy';
import { Edit, Numbers, StackedBarChart } from '@mui/icons-material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Grid, Input, Slider } from '@mui/material';




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



const AddPreProductPage = () => {

    // API PART *******************************************************************************************

    // Category Get API ---------------------
    useEffect(() => {
        axios.get('https://supperapp-backend.chbk.run/category/list')
        .then((response) => {
            console.log(response , "Categoryssssssss");
        })
        .catch(function (error) {
            console.log(error, "err categorizesss");
        })

    },[])

    //STATES AND FUNCTIONS PART ****************************************************************************

    //Category select step--------------------------
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleReset = () => {
      setActiveStep(0);
    };

    // Pre-product Input information ----------------
    const [value, setValue] = useState(30);

    const handleSliderChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleInputChange = (event) => {
      setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };
  
    const handleBlur = () => {
      if (value < 0) {
        setValue(0);
      } else if (value > 100) {
        setValue(100);
      }
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
                    <Step className='' >
                        <StepLabel>
                            <div className='text-xl font-bold text-right' >
                            گام دوم: درج اطلاعات کالا 
                            </div>
                        </StepLabel>
                        <StepContent className='flex flex-col gap-12 p-3 m-5' >
                            <div className='w-[70%] my-7 ' > 
                                {/* <Typography className='text-lg font-bold text-asliLight' id="input-slider" gutterBottom>
                                    عرض
                                </Typography> */}
                                <Grid container spacing={2} alignItems="center">
                                    <Grid className='text-lg font-bold text-asliLight' item>
                                        عرض به سانتی متر
                                    </Grid>
                                    <Grid item xs>
                                    <Slider
                                        value={typeof value === 'number' ? value : 0}
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                        max={1000}
                                        min={0}
                                    />
                                    </Grid>
                                    <Grid item>
                                    <Input
                                        value={value}
                                        size="small"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 1000,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                    </Grid>
                                </Grid>


                            </div>

                            <div className='w-[70%] my-7' > 
                                {/* <Typography className='text-lg font-bold text-asliLight' id="input-slider" gutterBottom>
                                    عرض
                                </Typography> */}
                                <Grid container spacing={2} alignItems="center">
                                    <Grid className='text-lg font-bold text-asliLight' item>
                                        طول به سانتی متر
                                    </Grid>
                                    <Grid item xs>
                                    <Slider
                                        value={typeof value === 'number' ? value : 0}
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                        max={1000}
                                        min={0}
                                    />
                                    </Grid>
                                    <Grid item>
                                    <Input
                                        value={value}
                                        size="small"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 1000,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                    </Grid>
                                </Grid>

                            </div>

                            <div className='w-[70%] my-7' > 
                                {/* <Typography className='text-lg font-bold text-asliLight' id="input-slider" gutterBottom>
                                    عرض
                                </Typography> */}
                                <Grid container spacing={2} alignItems="center">
                                    <Grid className='text-lg font-bold text-asliLight' item>
                                        وزن به کیلوگرم
                                    </Grid>
                                    <Grid item xs>
                                    <Slider
                                        value={typeof value === 'number' ? value : 0}
                                        onChange={handleSliderChange}
                                        aria-labelledby="input-slider"
                                        max={1000}
                                        min={0}
                                    />
                                    </Grid>
                                    <Grid item>
                                    <Input
                                        prefix='Kg'
                                        value={value}
                                        size="small"
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 1000,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                        }}
                                    />
                                    </Grid>
                                </Grid>

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
                    <Step className='' >
                        <StepLabel>
                            <div className='text-xl font-bold text-right' >
                            گام سوم: درج ویژگی ها  
                            </div>
                        </StepLabel>
                        <StepContent className='flex flex-col gap-12 p-3 m-5' >

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

export default AddPreProductPage;