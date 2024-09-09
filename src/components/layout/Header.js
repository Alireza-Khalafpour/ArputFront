'use client'

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Alert } from '@mui/material';
import { Apps, ArrowDropDown, ChatOutlined, CloseRounded, ExitToApp, Favorite, LoginOutlined, Logout, NotificationsActive, Person, Person2, Phone, Settings, ShoppingBasket, SpaceDashboard, ThreePRounded, VideoLabel, Wallet } from '@mui/icons-material';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { Menu, MenuItem, Modal, ModalDialog } from '@mui/joy';
import axios from 'axios';
import Image from 'next/image';
import "../styles/LandingPageStyles/style.css"
import HeaderDropMenu from '../templates/HeaderDropMenu';


export default function Header() {

  const cookie = new Cookies();
  const Au = cookie.get("tokenDastResi")
  const route = useRouter()
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [name , setName] = React.useState("");
  const [family , setFamily] = React.useState("");

  const [alert, setAlert] = React.useState(false)

  const [addressError, setAddressError] = React.useState(false);
  const [infoError, setInfoError] = React.useState(false);
  const [triggered, setTriggered]= React.useState(0)

  
  
  async function getUSer(Auth) {
    await axios.get('https://supperapp-backend.chbk.run/register/current_user', {
      headers:{
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
      }
      })
      .then((response) => {
        setName(response?.data.data[0].name)
        setFamily(response?.data.data[0].family)
        if(cookie.get("role") !== "admin" && cookie.get("role") !== "client") {
          if(response?.data.data[0]?.address.length == 0 ){
            setTimeout(() => {
              setAddressError(true)
              setAlert(true)
            }, 3000);
          }
          if(response?.data.data[0].name == "" || response?.data.data[0].name == null || response?.data.data[0].shop_name == ""){
            setTimeout(() => {
                setInfoError(true)
                setAlert(true)
              }, 3000);
            }
          }
        })
        .catch((error) => {
          console.log("Error on getting current user");
        });
      }
      
      React.useEffect(() => {
        setTimeout(() => {
          getUSer(Au)
        }, 250);
      },[])
      
      
      const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  function handleLogout() {
    cookie.remove("tokenDastResi");
    cookie.remove("role");
    cookie.remove("welcommed")
    handleCloseUserMenu()
    setTimeout(() => {
      window?.location?.reload();
    }, 800);
    setTimeout(() => {
      window?.location?.replace("/");
    }, 1400);
  }


  return (

    <>

      <div className="w-full min-h-[90px]">
        
        <nav className="navbar navbar-expand-lg flex flex-row justify-center w-full items-center !fixed z-[200] backdrop-blur-xl ">
          <Link className="md:block hidden w-1/6" href="/">
            <Image src="/favicon.ico" width={80} height={80} className='m-auto' />
          </Link>

          <Link className="md:hidden block w-1/3" href="/">
            <Image src="/favicon.ico" width={50} height={50} className='m-auto' />
          </Link>

          <div className='w-full flex flex-row items-center gap-5 justify-around px-6' >
            <ul className="navbar-nav mx-auto flex flex-row justify-center md:!bg-transparent !shadow-none !bg-transparent ">

              <li className="nav-item md:block hidden">
              <Link href="/" className='hover:text-asliLight nav-link ' >  خانه </Link>
              </li>

              <li className='nav-item md:block hidden' >
                <Link href="/products" className='hover:text-asliLight nav-link ' > گالری</Link>
              </li>

              <li className='nav-item md:block hidden' >
                <Link href="/weblog" className='hover:text-asliLight nav-link ' > وبلاگ </Link>
              </li>

              <li className='nav-item md:block hidden' >
                <Link href="/aboutus" className='hover:text-asliLight nav-link ' > درباره ما </Link>
              </li>

              <li className='nav-item md:block hidden' >
                <Link href="/contactus" className='hover:text-asliLight nav-link ' > تماس با ما</Link>
              </li>

            </ul>

            {
                cookie.get("tokenDastResi")
                ?
                (
                  <div className='flex flex-row justify-center items-center gap-1' >
                  
                    {
                      cookie.get("role") !== "client" 
                      ?
                       (
                        <>
                          <IconButton color="inherit">
                            <NotificationsActive className='w-7 h-7' />
                          </IconButton>
                          <IconButton color="inherit">
                            <Link href="/dashboard/my-wallet">
                              <Wallet className='w-7 h-7' />
                            </Link>
                         </IconButton>
                          <HeaderDropMenu name={name} family={family} />
                        </>
                       )
                       :
                       (
                        <>
                        <IconButton color="inherit">
                          <Link href="/profile/favorites">
                            <Favorite titleAccess='علاقه مندی ها' className='w-7 h-7' />
                          </Link>
                       </IconButton>
                       <IconButton color="inherit">
                          <Link href="/dashboard/ticketChat">
                            <ChatOutlined titleAccess='چت با پشتیبانی' className='w-7 h-7' />
                          </Link>
                       </IconButton>
                       <IconButton onClick={() => handleLogout()} color="inherit">
                            <Logout titleAccess=' خروج ' className='w-7 h-7 text-red-500 hover:text-red-700' />
                       </IconButton>
                      </>
                       )

                    }

                  </div>
                )
                :
                (
                  <ul className="navbar-nav md:!bg-transparent !shadow-none !bg-transparent">

                    <li class="nav-item">
                      <Link href="/signin" class="nav-link dark_btn md:block hidden text-white hover:!text-black " > ورود | ثبت نام </Link>
                      <Link href="/signin" class=" md:hidden block " >  <LoginOutlined/> </Link>
                    </li>
                  </ul>
                )
              }

          </div>
        </nav>

      </div>

      <Modal
          open={alert}
          onClose={() => setAlert(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          // disableEscapeKeyDown= "true"
          className='m-auto text-center md:!w-[40vw] !w-[80vw] '
          >
          <Alert variant='filled' severity='error' className='flex flex-col justify-center items-center w-full ' > 
          
              <p className='text-2xl' > ابتدا اطلاعات زیر را تکمیل کنید </p>

              <div className='flex md:flex-row flex-col gap-4 justify-center items-center mt-5 ' >
                {
                  infoError &&
                  <Link onClick={() => setAlert(false)} href="/profile" className='rounded-xl p-4 bg-khas text-white hover:bg-orange-600 cursor-pointer ' >
                  تکمیل پروفایل
                </Link>
                }
                {
                addressError &&
                <Link onClick={() => setAlert(false)} href="/profile/updateAddress" className='rounded-xl p-4 bg-khas text-white hover:bg-orange-600 cursor-pointer ' >
                  تکمیل آدرس
                </Link>
                }
              </div>

           </Alert>
      </Modal>

    </>


  );
}