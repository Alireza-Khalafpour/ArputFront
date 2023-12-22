'use client'


import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { BusinessRounded, Person, Person3, StoreRounded, Visibility, VisibilityOff } from '@mui/icons-material';
import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Tabs } from '@mui/base/Tabs';
import { TabsList as BaseTabsList } from '@mui/base/TabsList';
import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
import { Tab as BaseTab } from '@mui/base/Tab';
// import lottie from "lottie-web";
// import { defineElement } from "@lordicon/element";
import { Alert, CircularProgress, FormControl, IconButton, InputAdornment, OutlinedInput, Snackbar } from '@mui/material';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';





export default function SignInPage() {

  const [showPassword, setShowPassword] = useState(false);

  const cookie = new Cookies()
  const [message, setMessage] = useState();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState();
  const [pass, setPass] = useState();

  const route = useRouter();
 
  let formData = new FormData();

  formData.append('username', userName); 
  formData.append('password', pass);


  async function HandleSubmit() {
    setLoading(true);
    await axios.post('https://supperapp-backend.chbk.run/register/login', formData , {
      'accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      })
      .then((response) => {
        cookie.set("tokenDastResi", response.data.access_token, {secure:true, maxAge: 60 * 60 * 24 * 365 } );
        setAlert(true)
        console.log(response)
        setMessage(" خوش آمدید ")
        setTimeout(() => {
          route.push("/dashboard")
        }, 1700);
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error, "Error");
        setMessage( error.response.data.detail)
        setErrorAlert(true)
        setLoading(false)
      });

  }

  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

// define "lord-icon" custom element with default properties
  // defineElement(lottie.loadAnimation);

  return (

    <>
    
    <div className='w-full h-screen flex justify-center items-center' >
      <Grid className='flex flex-row justify-center items-center max-w-7xl md:w-[62vw] w-full min-w-7xl shadow-[0_35px_60px_-12px_rgba(0,0,0,0.65)] bg-[#EEF0F0] rounded-2xl md:h-[87vh] h-full p-8' >

        <Grid className='lg:w-2/4  w-full' >

            <div className='text-center mx-auto gap-12 my-6'>
              <Avatar style={{backgroundColor:"#1D9BF0", width:66 , height:66}} className='mx-auto text-white'>
                {/* <lord-icon trigger="loop" src="https://cdn.lordicon.com/kthelypq.json" state="in-account" delay="700" className="w-full" ></lord-icon> */}
                <Person3/>
              </Avatar>
              <h1 className='mx-auto text-xl '>
                 ورود
              </h1>
            </div>

            <div>
              <Tabs defaultValue={0} className='transition-all duration-500 text-center'>
                <TabsList >
                  <Tab value={0} className="items-center gap-1" > کاربر <Person/> </Tab>
                  <Tab value={1} className="items-center gap-1" >تامین کننده <StoreRounded/></Tab>
                  <Tab value={2} className="items-center gap-1" > نمایندگی <BusinessRounded/> </Tab>
                </TabsList>
                <TabPanel value={0}>
                  <Grid className='md:w-4/5 w-full text-center mx-auto ' >
                        <TextField
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            size="small"
                            className="mt-8 w-full"
                            fullWidth
                            mb={5}
                            placeholder="نام کاربری "
                            margin="normal"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'black',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#443DC0',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#443DC0',
                                  borderStyle: "dashed",
                                },
                              },
                            }}
                        />
                        <FormControl
                            
                            variant="outlined" 
                            margin='normal' 
                            className='w-full mb-8'
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'black',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#443DC0',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#443DC0',
                                  borderStyle: "dashed",
                                },
                              },
                            }}
                        >
                            <OutlinedInput
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                size="small"
                                placeholder='رمز عبور'
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


                        <Grid className='w-full flex justify-between items-center gap-2 my-4' >
                          <button
                            className='text-white p-2 w-1/2 bg-gradient-to-r from-asliDark to-asliLight hover:from-asliLight hover:to-asliDark transition-colors duration-500 rounded-full'  
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={() => HandleSubmit()}
                          >
                            {loading ? <CircularProgress size="medium" /> : "ورود"}
                          </button>
                          <span className='w-1/2 hover:text-[#443DC0] hover:font-semibold hover:cursor-pointer hover:border-b-[3px]' > فراموشی رمز </span>
                        </Grid>
                        <Grid className=' w-full my-8 text-center self-center flex justify-center gap-2'>

                          <span> حساب کاربری نداری؟  </span>   
                          <Link href="/signup" className='flex flex-row font-bold hover:font-extrabold rounded-full text-center transition-all duration-300' style={{color:"#6434D8"}}  >
                              <span className='text-[1.06rem]' >ثبت نام</span>   
                              {/* <lord-icon
                                  src="https://cdn.lordicon.com/vduvxizq.json"
                                  trigger="loop"
                                  delay="700"
                                  state="in-ternd-flat-3"
                              > 
                              </lord-icon> */}
                          </Link>

                        </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={1} >
                  <Grid className='md:w-4/5 w-full text-center mx-auto ' >
                        <TextField
                            size="small"
                            className="mt-8 w-full"
                            fullWidth
                            mb={5}
                            placeholder="نام کاربری "
                            margin="normal"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'black',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#443DC0',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#443DC0',
                                  borderStyle: "dashed",
                                },
                              },
                            }}
                        />
                        <FormControl
                            variant="outlined" 
                            margin='normal' 
                            className='w-full mb-8'
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'black',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#443DC0',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#443DC0',
                                  borderStyle: "dashed",
                                },
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


                        <Grid className='w-full flex justify-between items-center gap-2 my-4' >
                          <button
                            className='text-white p-2 w-1/2 bg-gradient-to-r from-asliDark to-asliLight hover:from-asliLight hover:to-asliDark transition-colors duration-500 rounded-full'  
                            type="submit"
                            fullWidth
                            variant="contained"
                          >
                            ورود 
                          </button>
                          <span className='w-1/2 hover:text-[#443DC0] hover:text-lg hover:cursor-pointer ' > فراموشی رمز </span>
                        </Grid>
                        <Grid className=' w-full my-8 text-center self-center flex justify-center gap-2'>

                          <span> حساب کاربری نداری؟  </span>   
                          <Link href="#" className='flex flex-row font-bold hover:font-extrabold rounded-full text-center transition-all duration-300' style={{color:"#6434D8"}}  >
                              <span className='text-[1.06rem]' >ثبت نام</span>   
                              {/* <lord-icon
                                  src="https://cdn.lordicon.com/vduvxizq.json"
                                  trigger="loop"
                                  delay="700"
                                  state="in-ternd-flat-3"
                              > 
                              </lord-icon> */}
                          </Link>

                        </Grid>
                  </Grid>
                </TabPanel>
                <TabPanel value={2}>
                  <Grid className='md:w-4/5 w-full text-center mx-auto ' >
                        <TextField
                            size="small"
                            className="mt-8 w-full"
                            fullWidth
                            mb={5}
                            placeholder="نام کاربری "
                            margin="normal"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'black',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#443DC0',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#443DC0',
                                  borderStyle: "dashed",
                                },
                              },
                            }}
                        />
                        <FormControl
                            variant="outlined" 
                            margin='normal' 
                            className='w-full mb-8'
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                  borderColor: 'black',
                                },
                                '&:hover fieldset': {
                                  borderColor: '#443DC0',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#443DC0',
                                  borderStyle: "dashed",
                                },
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

                        <Grid className='w-full flex justify-between items-center gap-2 my-4' >
                          <button
                            className='text-white p-2 w-1/2 bg-gradient-to-r from-asliDark to-asliLight hover:from-asliLight hover:to-asliDark transition-colors duration-500 rounded-full'  
                            type="submit"
                          >
                            ورود 
                          </button>
                          <span className='w-1/2 hover:text-asliLight hover:text-lg hover:cursor-pointer ' > فراموشی رمز </span>
                        </Grid>
                        <Grid className=' w-full my-8 text-center self-center flex justify-center gap-2'>

                          <span> حساب کاربری نداری؟  </span>   
                          <Link href="/signup" className='flex flex-row font-bold hover:font-extrabold rounded-full text-center transition-all duration-300' style={{color:"#6434D8"}}  >
                              <span className='text-[1.06rem]' >ثبت نام</span>   
                          </Link>

                        </Grid>
                  </Grid>
                </TabPanel>
              </Tabs>
            </div>

        </Grid>

        <div id="illustrationSignin" className='w-2/4 h-[60vh] lg:block hidden'></div>
      </Grid>

    </div>
    <Snackbar
      open={alert}
      autoHideDuration={4000}
      onClose={() => setAlert(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      se
    >
      <Alert variant='filled' severity='success' className='text-lg text-white font-semibold' > {message} </Alert>
    </Snackbar>

    <Snackbar
      open={errorAlert}
      autoHideDuration={4000}
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

const TabsList = forwardRef((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseTabsList
      ref={ref}
      className={clsx(
        'mb-4 rounded-xl bg-[#1D9BF0] flex items-center justify-center content-between min-w-tabs-list shadow-lg',
        className,
      )}
      {...other}
    />
  );
});

TabsList.propTypes = {
  className: PropTypes.string,
};

const Tab = forwardRef((props, ref) => {
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
                  ? 'text-[#1D9BF0] bg-white'
                  : 'text-white bg-transparent focus:text-white hover:bg-[#4695ca]'
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

const TabPanel = forwardRef((props, ref) => {
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