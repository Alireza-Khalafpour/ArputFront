'use client'


import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { Tab as BaseTab } from '@mui/base/Tab';
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import StepperModule from '../module/Stepper';
import { Button, FormControl, IconButton, InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material';
import { AccountCircle, MobileFriendly, Visibility, VisibilityOff } from '@mui/icons-material';
import OtpInput from '../module/OtpInput';





export default function SignUpPage() {

  const steps = [' شماره همراه ', ' کد ارسالی ', ' تکمیل ثبت نام '];


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };


  const [value, setValue] = useState(0);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

// define "lord-icon" custom element with default properties
  defineElement(lottie.loadAnimation);

  // Stepper Functions -----------------

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

  // -----------------------------------

  return (

    <>

      <div className='w-full h-screen flex justify-center items-center' >
        <div className='flex flex-col gap-10 justify-center items-center max-w-7xl md:w-[60vw] w-full md:h-[80vh] h-full min-w-7xl shadow-[0_35px_60px_-12px_rgba(0,0,0,0.65)] bg-[#EEF0F0] rounded-2xl p-8' >

        {/* <div>
          <h1> ایجاد حساب کاربری </h1>
          <h4> اطلاعات </h4>
        </div> */}

        <div style={{direction:"ltr"}} className='md:w-[45vw] w-full' >
          <StepperModule activeStep={activeStep} />
        </div>

        
        <Grid className='w-full flex flex-row justify-center items-center' >

          <Grid className=' lg:w-2/4 w-full' >
            <div className='w-full flex justify-center items-center flex-col shadow-sm' >
              <div className='flex flex-col justify-center items-center' > 
                {
                  activeStep === 0 &&(
                    <Grid className=' w-full my-8' >
                      <TextField
                          size="medium"
                          className="w-full"
                          fullWidth
                          placeholder=" شماره همراه "
                          sx={{
                              "& .MuiOutlinedInput-root": {
                                "& > fieldset": { borderColor: "black" },
                              },
                            }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <MobileFriendly />
                              </InputAdornment>
                            ),
                          }}
                      />
                    </Grid>

                  )
                }
                {
                  activeStep === 1 &&(
                    <Grid className=' w-full my-8' >
                      <OtpInput/>
                    </Grid>

                  )
                }
                {
                  activeStep === 2 &&(
                    <Grid className=' w-full text-center my-8' >
                      <FormControl
                        margin='normal' 
                        className=' mb-8'
                        sx={{
                            "& .MuiOutlinedInput-root": {
                              "& > fieldset": { borderColor: "black" },
                            },
                          }} 
                    >
                        <OutlinedInput
                            size="small"
                            placeholder='رمز عبور'
                            id="outlined-adornment-password"
                            type={!showPassword ? 'password' :'text' }
                            
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="رمز عبور"
                            margin='normal'
                        />
                      </FormControl>
                      <FormControl
                        margin='normal' 
                        className=' mb-8'
                        sx={{
                            "& .MuiOutlinedInput-root": {
                              "& > fieldset": { borderColor: "black" },
                            },
                          }} 
                    >
                        <OutlinedInput
                            size="small"
                            placeholder=' تکرار رمز عبور ' 
                            id="outlined-adornment-password"
                            type={!showPassword ? 'password' :'text' }
                            
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="رمز عبور"
                            margin='normal'
                        />
                      </FormControl>
                    </Grid>

                  )
                }
              </div>
              <Grid className='sm:w-28 w-[50vw] text-center' >

                {
                  activeStep!==2 &&(
                  <button
                    onClick={handleNext}
                    className='text-white p-2 w-full bg-gradient-to-r from-indigo-800 to-indigo-400 hover:from-indigo-900 hover:to-indigo-600 rounded-full'
                    type="button"
                    >
                      {activeStep === 0 && ' ارسال کد '} 
                      {activeStep === 1 && ' تایید '} 
                  </button>
                  )
                }
                {
                  activeStep===2 &&(
                  <button
                    className='text-white p-2 w-full bg-gradient-to-r from-indigo-800 to-indigo-400 hover:from-indigo-900 hover:to-indigo-600 rounded-full'
                    type="button"
                    >
                      ایجاد حساب
                  </button>
                  )
                }


                {
                  activeStep ===1 && (
                    <button
                    onClick={handleBack}
                    className='gap-1 hover:gap-3 transition-all duration-200 mt-4 hover:text-indigo-600'
                  >
                    <span>{"<<"}</span> مرحله قبل
                  </button>
                  )
                }
                {activeStep ===2 && (
                    <button
                    onClick={handleBack}
                    className='gap-1 hover:gap-3 transition-all duration-200 mt-4 hover:text-indigo-600'
                  >
                    <span>{"<<"}</span> مرحله قبل
                  </button>
                  )
                }

              </Grid>
            </div>
          </Grid>

          <div id="illustrationSignup" className='md:w-2/4 w-full h-[60vh] md:block hidden  '></div>
        </Grid>


        </div>

      </div>
    


    </>

  );
}

const resolveSlotProps = (fn, args) => (typeof fn === 'function' ? fn(args) : fn);

const TabsList = React.forwardRef((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseTabsList
      ref={ref}
      className={clsx(
        'mb-4 rounded-xl bg-indigo-500 flex items-center justify-center content-between min-w-tabs-list shadow-lg',
        className,
      )}
      {...other}
    />
  );
});

TabsList.propTypes = {
  className: PropTypes.string,
};

const Tab = React.forwardRef((props, ref) => {
  return (
    <BaseTab
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              ` ${
                ownerState.selected
                  ? 'text-indigo-500 bg-white'
                  : 'text-white bg-transparent focus:text-white hover:bg-indigo-400'
              } ${
                ownerState.disabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              } text-sm leading-[1.3] font-semibold w-full py-2.5 px-3 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-indigo-light`,
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

Tab.propTypes = {
  /**
   * The props used for each slot inside the Tab.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
};

const TabPanel = React.forwardRef((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseTabPanel
      ref={ref}
      className={clsx(
        'py-5 px-3 bg-[#EEF0F0] dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 rounded-xl  w-full text-sm',
        className,
      )}
      {...other}
    />
  );
});

TabPanel.propTypes = {
  className: PropTypes.string,
}