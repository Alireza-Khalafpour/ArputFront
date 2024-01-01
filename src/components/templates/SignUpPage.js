'use client'


import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { Tab as BaseTab } from '@mui/base/Tab';
// import lottie from "lottie-web";
// import { defineElement } from "@lordicon/element";
import StepperModule from '../module/Stepper';
import { Alert, FormControl, IconButton, InputAdornment, OutlinedInput, Snackbar, TextField} from '@mui/material';
import { LoopOutlined, MobileFriendly, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';
import OtpInput from '../module/OtpInput';
import { useSelector } from 'react-redux';






export default function SignUpPage() {

  const steps = [' شماره همراه ', ' تکمیل ثبت نام '];

  const [message, setMessage] = useState();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false)

  // otp part-------------------------------------------------------

  const Otp = useSelector((state) => state.counter.Otp)


  // password part---------------------------------------------------

  const [password, setPassword] = useState()
  const [ConfirmPassword, setConfirmPassword] = useState()


  // -------------------------------------------------------------------


  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };


  const [value, setValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

// define "lord-icon" custom element with default properties
  // defineElement(lottie.loadAnimation);

  // Stepper Functions -----------------

  const [activeStep, setActiveStep] = useState(0);

  const [phoneNum, setPhoneNum] = useState("")


  const handleNextOtp = () => {

    if(phoneNum.length === 11 && phoneNum !== "") {

      setLoading(true);
      axios.post('https://supperapp-backend.chbk.run/register/otp',{"phone": phoneNum }, {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        })
        .then((response) => {
          if(response.data.Done === true){
            setMessage(" کد با موفقیت ارسال شد ")
            setAlert(true)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setLoading(false)
          }
        })
        .catch(function (error) {
          console.log(error, "Error");
          setMessage(" مشکلی پیش آمده است! ")
  
        });

    }else{

      setMessage(" شماره همراه خود را وارد کنید ")
      setErrorAlert(true)

    }

  };

  const handleNextCodeValidation = () => {

    if( Otp.length === 4 && password === ConfirmPassword) {

    setLoading(true);
    axios.post('https://supperapp-backend.chbk.run/register/shop',{ 
      "phone": phoneNum,
      "password": password,
      "code": Otp
     }, {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      })
      .then((response) => {
        console.log(response)
        if( response.data.Done === true){
          setMessage(" ثبت نام با موفقیت انجام شد. لطفا برای تکمیل اطلاعات وارد پروفایل خود شوید ")
          setAlert(true)
          // setTimeout(() => {
          // }, 1700);
        }else if(response.data.Done === false){
          setMessage(response.data.Error_text)
          setErrorAlert(true)
        }
      })
      .catch(function (error) {
        console.log(error, "Error");
        setMessage(" مشکلی پیش آمده است! ")

      });

      }else{
        setMessage(" لطفا اطلاعات را به درستی وارد کنید ")
        setErrorAlert(true)
      }

    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

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

        <div style={{direction:"ltr"}} className='md:w-[45vw] w-full' >
          <StepperModule activeStep={activeStep} />
        </div>

        
        <Grid className='w-full flex flex-row justify-center items-center' >

          <Grid className=' lg:w-2/4 w-full' >
            <div className='w-full flex justify-center items-center flex-col shadow-sm' >
              <div className='flex flex-col justify-center items-center' > 
                {
                  activeStep === 0 &&(
                    <Grid className=' w-full my-8 flex flex-col gap-3 ' >
                      <TextField
                          size="medium"
                          className="w-full"
                          fullWidth
                          value={phoneNum}
                          onChange={(e) => setPhoneNum(e.target.value)}
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
                    <Grid className=' w-full my-4 gap-2 justify-center items-center ' sx={{display:"flex", flexDirection:"column"}} >
                      
                      <Grid>
                        <OtpInput/>
                      </Grid>

                      <Grid className=' w-full text-center my-4 flex flex-col ' sx={{display:"flex", flexDirection:"column"}} >
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
                              type={!showPassword ? 'password' :'text' }
                              value={password}
                              onChange={(e) => setPassword(e.target.value) }
                              
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
                              type={!showPassword ? 'password' :'text' }
                              value={ConfirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value) }
                              
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



                    </Grid>

                  )
                }
              </div>
              <Grid className='sm:w-28 w-[50vw] text-center' >

                {
                  activeStep===0 &&(
                  <button
                    onClick={ () => handleNextOtp()}
                    className='text-white p-2 w-full bg-gradient-to-r from-asliDark to-asliLight hover:from-asliLight hover:to-asliDark transition-colors duration-500 rounded-full'
                    >
                       ارسال کد
                  </button>
                  )
                }

                {
                  activeStep===1 &&(
                  <button
                    onClick={() => handleNextCodeValidation()}
                    className='text-white p-2 w-full bg-gradient-to-r from-asliDark to-asliLight hover:from-asliLight hover:to-asliDark transition-colors duration-500 rounded-full'
                    type="button"
                    >
                      { loading ? <LoopOutlined/> : ' ثبت نام '} 
                  </button>
                  )
                }



                {
                  activeStep ===1 && (
                    <button
                    onClick={handleBack}
                    className='gap-1 hover:gap-3 transition-all duration-200 mt-4 hover:text-indigo-600'
                  >
                    <span>{"<<"}</span>  اصلاح شماره
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


        <Snackbar
          open={alert}
          autoHideDuration={2500}
          onClose={() => setAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          se
        >
          <Alert variant='filled' severity='success' className='text-lg text-white font-semibold' > {message} </Alert>
        </Snackbar>

        <Snackbar
          open={errorAlert}
          autoHideDuration={2500}
          onClose={() => setErrorAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          se
        >
          <Alert variant='filled' severity='error' className='text-lg text-white font-semibold' > {message} </Alert>
        </Snackbar>
    


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