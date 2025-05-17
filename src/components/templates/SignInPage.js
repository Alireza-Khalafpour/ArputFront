// 'use client'

// import Avatar from '@mui/material/Avatar';
// import TextField from '@mui/material/TextField';
// import Grid from '@mui/material/Grid';
// import { BusinessRounded, Person, Person3, StoreRounded, Visibility, VisibilityOff } from '@mui/icons-material';
// import { forwardRef, useState } from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import { Tabs } from '@mui/base/Tabs';
// import { TabsList as BaseTabsList } from '@mui/base/TabsList';
// import { TabPanel as BaseTabPanel } from '@mui/base/TabPanel';
// import { Tab as BaseTab } from '@mui/base/Tab';
// // import lottie from "lottie-web";
// // import { defineElement } from "@lordicon/element";
// import { Alert, CircularProgress, FormControl, IconButton, InputAdornment, OutlinedInput, Snackbar } from '@mui/material';
// import axios from 'axios';
// import Cookies from 'universal-cookie';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import GeneralLoader from '../module/GeneralLoader';
// import ForgotPassword from './ForgotPassword';

// export default function SignInPage() {

//   const [showPassword, setShowPassword] = useState(false);
//   const url = process.env.NEXT_PUBLIC_URL

//   const cookie = new Cookies()
//   const [message, setMessage] = useState();
//   const [alert, setAlert] = useState(false);
//   const [errorAlert, setErrorAlert] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [userName, setUserName] = useState();
//   const [pass, setPass] = useState();

//   const route = useRouter();

//   let formData = new FormData();

//   formData.append('username', userName);
//   formData.append('password', pass);

//   async function HandleSubmit() {
//     setLoading(true);
//     await axios.post(`${url}/register/login`, formData , {
//       'accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded',
//       })
//       .then((response) => {
//         cookie.set("tokenDastResi", response.data.access_token, {secure:true, maxAge: 14400  } );
//         cookie.set("role", response.data.role, {secure:true, maxAge: 14400  } );
//         cookie.set("welcommed", false, {secure:true, maxAge: 14400  } );
//         cookie.remove('activeList');
//         setAlert(true)
//         setMessage(" در حال ورود...")
//         if(response.data.role == 'client') {
//           setTimeout(() => {
//             route.push("/")
//           }, 1000);
//         }else{
//           setTimeout(() => {
//             route.push("/dashboard")
//           }, 1000);
//         }
//         setLoading(false)
//       })
//       .catch(function (error) {
//         console.log(error, "Error");
//         setMessage( error.response.data.detail)
//         setErrorAlert(true)
//         setLoading(false)
//       });

//   }

//   function handleLoginWithEnterKey(e) {
//     if(e.key == "Enter"){
//       document.getElementById("LoginBtn").focus();
//       HandleSubmit()
//     }
//   }

//   function handleFocusNextField(e) {
//     if(e.key == "Enter"){
//       document.getElementById("passField").focus();
//     }
//   }

//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };

// // define "lord-icon" custom element with default properties
//   // defineElement(lottie.loadAnimation);

//   return (

//     <>

//     <div className='w-full h-screen flex justify-center items-center' >
//       <Grid className='flex flex-row justify-center items-center max-w-7xl md:w-[62vw] w-full min-w-7xl shadow-[0_35px_60px_-12px_rgba(0,0,0,0.65)] bg-[#EEF0F0] rounded-2xl md:h-[87vh] h-full p-8' >

//         <Grid className='lg:w-2/4  w-full' >

//             <div className='text-center mx-auto gap-12 my-6'>
//               <Avatar style={{backgroundColor:"#1D9BF0", width:66 , height:66}} className='mx-auto text-white'>
//                 {/* <lord-icon trigger="loop" src="https://cdn.lordicon.com/kthelypq.json" state="in-account" delay="700" className="w-full" ></lord-icon> */}
//                 <Person3/>
//               </Avatar>
//               <h1 className='mx-auto text-xl '>
//                  ورود
//               </h1>
//             </div>

//             <div>

//             <Grid className='md:w-4/5 w-full text-center mx-auto ' >
//                         <TextField
//                             value={userName}
//                             onChange={(e) => setUserName(e.target.value)}
//                             onKeyDown={(e) => handleFocusNextField(e)}
//                             size="small"
//                             className="mt-8 w-full"
//                             fullWidth
//                             mb={5}
//                             placeholder="نام کاربری "
//                             margin="normal"
//                             sx={{
//                               '& .MuiOutlinedInput-root': {
//                                 '& fieldset': {
//                                   borderColor: 'black',
//                                 },
//                                 '&:hover fieldset': {
//                                   borderColor: '#443DC0',
//                                 },
//                                 '&.Mui-focused fieldset': {
//                                   borderColor: '#443DC0',
//                                   borderStyle: "dashed",
//                                 },
//                               },
//                             }}
//                         />
//                         <FormControl

//                             variant="outlined"
//                             margin='normal'
//                             className='w-full mb-8'
//                             sx={{
//                               '& .MuiOutlinedInput-root': {
//                                 '& fieldset': {
//                                   borderColor: 'black',
//                                 },
//                                 '&:hover fieldset': {
//                                   borderColor: '#443DC0',
//                                 },
//                                 '&.Mui-focused fieldset': {
//                                   borderColor: '#443DC0',
//                                   borderStyle: "dashed",
//                                 },
//                               },
//                             }}
//                         >
//                             <OutlinedInput
//                                 value={pass}
//                                 onChange={(e) => setPass(e.target.value)}
//                                 onKeyDown={(e) => handleLoginWithEnterKey(e)}
//                                 id='passField'
//                                 size="small"
//                                 placeholder='رمز عبور'
//                                 type={!showPassword ? 'password' :'text' }

//                                 endAdornment={
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={handleClickShowPassword}
//                                     onMouseDown={handleMouseDownPassword}
//                                     edge="end"
//                                     >
//                                     {showPassword ? <Visibility /> : <VisibilityOff />}
//                                     </IconButton>
//                                 </InputAdornment>
//                                 }
//                                 label="رمز عبور"
//                                 margin='normal'
//                             />
//                         </FormControl>

//                         <Grid className='w-full flex justify-between items-center gap-2 my-4' >
//                           <button
//                             className='text-white p-2 w-1/2 bg-gradient-to-r from-asliDark to-asliLight hover:from-asliLight hover:to-asliDark transition-colors duration-500 rounded-full'
//                             type="submit"
//                             id='LoginBtn'
//                             fullWidth
//                             variant="contained"
//                             onClick={() => HandleSubmit()}
//                           >
//                             {loading ? <span className='text-sm' > <GeneralLoader/>  </span>: "ورود"}
//                           </button>

//                           <ForgotPassword/>

//                         </Grid>
//                         <Grid className=' w-full my-8 text-center self-center flex justify-center gap-2'>

//                           <span> حساب کاربری نداری؟  </span>
//                           <Link href="/signup" className='flex flex-row font-bold hover:font-extrabold rounded-full text-center transition-all duration-300' style={{color:"#6434D8"}}  >
//                               <span className='text-[1.06rem]' >ثبت نام</span>
//                               {/* <lord-icon
//                                   src="https://cdn.lordicon.com/vduvxizq.json"
//                                   trigger="loop"
//                                   delay="700"
//                                   state="in-ternd-flat-3"
//                               >
//                               </lord-icon> */}
//                           </Link>

//                         </Grid>
//                   </Grid>

//             </div>

//         </Grid>

//         <div id="illustrationSignin" className='w-2/4 h-[60vh] lg:block hidden'></div>
//       </Grid>

//     </div>
//     <Snackbar
//       open={alert}
//       autoHideDuration={4000}
//       onClose={() => setAlert(false)}
//       anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       se
//     >
//       <Alert variant='filled' severity='success' className='text-lg text-white font-semibold' > {message} </Alert>
//     </Snackbar>

//     <Snackbar
//       open={errorAlert}
//       autoHideDuration={4000}
//       onClose={() => setErrorAlert(false)}
//       anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       se
//     >
//       <Alert variant='filled' severity='error' className='text-lg text-white font-semibold' > {message} </Alert>
//     </Snackbar>

//     </>

//   );
// }

// const resolveSlotProps = (fn, args) => (typeof fn === 'function' ? fn(args) : fn);

// const TabsList = forwardRef((props, ref) => {
//   const { className, ...other } = props;
//   return (
//     <BaseTabsList
//       ref={ref}
//       className={clsx(
//         'mb-4 rounded-xl bg-[#1D9BF0] flex items-center justify-center content-between min-w-tabs-list shadow-lg',
//         className,
//       )}
//       {...other}
//     />
//   );
// });

// TabsList.propTypes = {
//   className: PropTypes.string,
// };

// const Tab = forwardRef((props, ref) => {
//   return (
//     <BaseTab
//       ref={ref}
//       {...props}
//       slotProps={{
//         ...props.slotProps,
//         root: (ownerState) => {
//           const resolvedSlotProps = resolveSlotProps(
//             props.slotProps?.root,
//             ownerState,
//           );
//           return {
//             ...resolvedSlotProps,
//             className: clsx(
//               ` ${
//                 ownerState.selected
//                   ? 'text-[#1D9BF0] bg-white'
//                   : 'text-white bg-transparent focus:text-white hover:bg-[#4695ca]'
//               } ${
//                 ownerState.disabled
//                   ? 'cursor-not-allowed opacity-50'
//                   : 'cursor-pointer'
//               } text-sm leading-[1.3] font-semibold w-full py-2.5 px-3 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-indigo-light`,
//               resolvedSlotProps?.className,
//             ),
//           };
//         },
//       }}
//     />
//   );
// });

// Tab.propTypes = {
//   /**
//    * The props used for each slot inside the Tab.
//    * @default {}
//    */
//   slotProps: PropTypes.shape({
//     root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
//   }),
// };

// const TabPanel = forwardRef((props, ref) => {
//   const { className, ...other } = props;
//   return (
//     <BaseTabPanel
//       ref={ref}
//       className={clsx(
//         'py-5 px-3 bg-[#EEF0F0] dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 rounded-xl  w-full text-sm',
//         className,
//       )}
//       {...other}
//     />
//   );
// });

// TabPanel.propTypes = {
//   className: PropTypes.string,
// }

// ---------------------------------------------------------------------

// *********************************************************************

// *********************************************************************

//----------------------------------------------------------------------

"use client";

import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import {
  BusinessRounded,
  Person,
  Person3,
  StoreRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Tabs } from "@mui/base/Tabs";
import { TabsList as BaseTabsList } from "@mui/base/TabsList";
import { TabPanel as BaseTabPanel } from "@mui/base/TabPanel";
import { Tab as BaseTab } from "@mui/base/Tab";
// import lottie from "lottie-web";
// import { defineElement } from "@lordicon/element";
import {
  Alert,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GeneralLoader from "../module/GeneralLoader";
import ForgotPassword from "./ForgotPassword";
import SignUpPage from "./SignUpPage";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "@/app/GlobalRedux/Features/userData/UserData";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const url = process.env.NEXT_PUBLIC_URL;

  const dispatch = useDispatch()

  const cookie = new Cookies();
  const [message, setMessage] = useState();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userName, setUserName] = useState();
  const [pass, setPass] = useState();

  const route = useRouter();

  let formData = new FormData();

  formData.append("username", userName);
  formData.append("password", pass);

  async function HandleSubmit() {
    setLoading(true);
    await axios
      .post(`${url}/register/login`, formData, {
        accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .then((response) => {
        cookie.set("tokenDastResi", response.data.access_token, {
          secure: true,
          maxAge: 14400,
        });
        dispatch(setData(response.data));
        cookie.set("role", response.data.role, { secure: true, maxAge: 14400 });
        cookie.set("welcommed", false, { secure: true, maxAge: 14400 });
        cookie.remove("activeList");
        setAlert(true);
        setMessage(" در حال ورود...");
        if (response.data.role == "client") {
          setTimeout(() => {
            route.push("/");
          }, 1000);
        } else {
          setTimeout(() => {
            route.push("/dashboard");
          }, 1000);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error, "Error");
        setMessage(error.response.data.detail);
        setErrorAlert(true);
        setLoading(false);
      });
  }

  function handleLoginWithEnterKey(e) {
    if (e.key == "Enter") {
      document.getElementById("LoginBtn").focus();
      HandleSubmit();
    }
  }

  function handleFocusNextField(e) {
    if (e.key == "Enter") {
      document.getElementById("passField").focus();
    }
  }

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [signIn, setSignIn] = useState(true);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center transition-all duration-1000 ">
        <div
          className={`relative flex md:flex-row flex-col justify-center items-center md:w-[82vw] w-full min-w-7xl shadow-[0_35px_60px_-12px_rgba(0,0,0,0.65)] bg-[#EEF0F0] rounded-2xl md:h-[77vh] h-full transition-all duration-1000 `}
        >
          {signIn == true ? (
            <>
              <div
                className={` h-full flex flex-col justify-center items-center gap-10 text-white bg-asliLight rounded-r-2xl transition-all duration-1000 ${
                  signIn == false ? "md:w-2/3 w-full opacity-0" : "md:w-1/3 w-full opacity-100"
                }  `}
              >
                <h2 className="text-4xl font-semibold ">سلام مجدد</h2>
                <div className="text-center">
                  <p className="mb-1"> با ما در ارتباط باشید </p>
                  <p> لطفا با اطلاعات خود وارد شوید </p>
                </div>

                <button
                  onClick={() => setSignIn(false)}
                  className="border-2 border-white bg-white/15 p-2 px-8 rounded-2xl hover:bg-white/30"
                >
                  ثبت نام
                </button>
              </div>
              <div
                className={`transition-all duration-1000 h-full flex flex-row justify-center items-center ${
                  signIn == false ? "md:w-1/3 w-full" : "md:w-2/3 w-full"
                } `}
              >
                <div
                  id="illustrationSignin"
                  className="w-96 h-96 lg:block hidden absolute right-[23%] transition-all duration-1000"
                ></div>
                <Grid className="lg:w-2/3  w-full">
                  <div className="text-center mx-auto gap-12 my-6">
                    <h1 className="mx-auto text-3xl "> ورود به حساب کاربری </h1>
                  </div>

                  <div>
                    <Grid className="w-4/5 text-center mx-auto ">
                      <TextField
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        onKeyDown={(e) => handleFocusNextField(e)}
                        size="small"
                        className="mt-8 w-full"
                        fullWidth
                        mb={5}
                        placeholder="نام کاربری "
                        margin="normal"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "black",
                            },
                            "&:hover fieldset": {
                              borderColor: "#443DC0",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#443DC0",
                              borderStyle: "dashed",
                            },
                          },
                        }}
                      />
                      <FormControl
                        variant="outlined"
                        margin="normal"
                        className="w-full mb-8"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              borderColor: "black",
                            },
                            "&:hover fieldset": {
                              borderColor: "#443DC0",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#443DC0",
                              borderStyle: "dashed",
                            },
                          },
                        }}
                      >
                        <OutlinedInput
                          value={pass}
                          onChange={(e) => setPass(e.target.value)}
                          onKeyDown={(e) => handleLoginWithEnterKey(e)}
                          id="passField"
                          size="small"
                          placeholder="رمز عبور"
                          type={!showPassword ? "password" : "text"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="رمز عبور"
                          margin="normal"
                        />
                      </FormControl>

                      <Grid className="w-full flex flex-col-reverse justify-between items-center gap-7 ">
                        <button
                          className="text-white p-2 w-1/2 bg-gradient-to-r from-asliDark to-asliLight hover:from-asliLight hover:to-asliDark transition-colors duration-500 rounded-full"
                          type="submit"
                          id="LoginBtn"
                          fullWidth
                          variant="contained"
                          onClick={() => HandleSubmit()}
                        >
                          {loading ? (
                            <span className="text-sm">
                              {" "}
                              <GeneralLoader />{" "}
                            </span>
                          ) : (
                            "ورود"
                          )}
                        </button>

                        <ForgotPassword />
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </div>
            </>
          ) : (
            <>
              <div
                className={`transition-all duration-1000 h-full flex flex-row justify-center items-center ${
                  signIn == false ? "md:w-2/3 w-full" : "md:w-1/3 w-full"
                } `}
              >
                <div
                  id="illustrationSignup"
                  className={`w-96 h-96 lg:block hidden absolute left-[23%] !transition-opacity !duration-1000  ${signIn == true ? " opacity-0 " : "opacity-100"}`}
                ></div>
                <div >
                  <SignUpPage/>
                </div>
              </div>

              <div
                className={` h-full flex flex-col justify-center items-center gap-10 text-white bg-asliLight rounded-l-2xl transition-all duration-1000 ${
                  signIn == false ? "md:w-1/3 w-full opacity-100" : "md:w-2/3 w-full opacity-0"
                }  `}
              >
                <h2 className="text-4xl font-semibold "> خوش آمدید </h2>
                <div className="text-center">
                  <p className="mb-1"> با ما در ارتباط باشید </p>
                  <p> لطفا با اطلاعات خود وارد شوید </p>
                </div>

                <button
                  onClick={() => setSignIn(true)}
                  className="border-2 border-white bg-white/15 p-2 px-8 rounded-2xl hover:bg-white/30"
                >
                  ورود
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <Snackbar
        open={alert}
        autoHideDuration={4000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        se
      >
        <Alert
          variant="filled"
          severity="success"
          className="text-lg text-white font-semibold"
        >
          {" "}
          {message}{" "}
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorAlert}
        autoHideDuration={4000}
        onClose={() => setErrorAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        se
      >
        <Alert
          variant="filled"
          severity="error"
          className="text-lg text-white font-semibold"
        >
          {" "}
          {message}{" "}
        </Alert>
      </Snackbar>
    </>
  );
}

const resolveSlotProps = (fn, args) =>
  typeof fn === "function" ? fn(args) : fn;

const TabsList = forwardRef((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseTabsList
      ref={ref}
      className={clsx(
        "mb-4 rounded-xl bg-[#1D9BF0] flex items-center justify-center content-between min-w-tabs-list shadow-lg",
        className
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
            ownerState
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              ` ${
                ownerState.selected
                  ? "text-[#1D9BF0] bg-white"
                  : "text-white bg-transparent focus:text-white hover:bg-[#4695ca]"
              } ${
                ownerState.disabled
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              } text-sm leading-[1.3] font-semibold w-full py-2.5 px-3 m-1.5 border-0 rounded-md flex justify-center focus:outline-0 focus:shadow-outline-indigo-light`,
              resolvedSlotProps?.className
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
        "py-5 px-3 bg-[#EEF0F0] dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 rounded-xl  w-full text-sm",
        className
      )}
      {...other}
    />
  );
});

TabPanel.propTypes = {
  className: PropTypes.string,
};
