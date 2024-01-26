'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Divider, MenuList } from '@mui/material';
import { Apps, ArrowCircleDownTwoTone, ArrowDownward, Close, ExitToApp, ExpandCircleDown, Home, InstallMobileOutlined, LoginOutlined, MenuOpen, MenuRounded, NotificationsActive, Payment, Person, Phone, Settings, ShoppingBasket, SpaceDashboard, Store, ThreePRounded } from '@mui/icons-material';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { Avatar, Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem, Modal, ModalDialog } from '@mui/joy';
import axios from 'axios';
import Image from 'next/image';


export default function Header() {

  const cookie = new Cookies();

  const Au = cookie.get("tokenDastResi") ? cookie.get("tokenDastResi") : null 

  const route = useRouter()
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [name , setName] = React.useState("");

  const [dropMenu, setDrpMenu] = React.useState(false)

  const [open, setOpen] = React.useState(false);

  React.useEffect(() =>{
    getUSer(Au)
  },[])

  function getUSer(Auth) {
    axios.get('https://supperapp-backend.chbk.run/register/current_user', {
      headers:{
        'accept': 'application/json',
        'Authorization': `Bearer ${Auth}`,
      }
      })
      .then((response) => {
        setName(response.data.data[0].name)
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  }


  const handleLogout = () => {
    cookie.remove("tokenDastResi");
    cookie.remove("role");
    setTimeout(() => {
      window.location.replace("/")
    }, 500);
    setAnchorEl(null);
  }


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [productsList, setProductsList] = React.useState(false)

  return (
    <div className='w-full' >
      <AppBar position="static" className='bg-asliDark' >
        <Toolbar className='flex flex-row justify-between w-full h-full items-center' >
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <div className='w-4/5 flex flex-row justify-start h-full items-center gap-20'>
            <Link href="/" className='cursor-pointer'  >
              <Image src="/favicon.ico" width={66} height={66} />
            </Link>

            <ul className='md:flex hidden flex-row justify-center items-center h-full gap-6' >

            <Link href="/products" className='hover:border-b-2 border-b-khas text-xl transition-all duration-75 cursor-pointer pb-2 ' > فروشگاه <Apps className='text-khas'/> </Link>


              {/* <Dropdown>
                <MenuButton
                  slots={{ root: IconButton }}
                  slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                  sx={{ borderRadius: 40 }}
                >
                  <h3 onClick={() => setProductsList(true)}  className=' text-white text-base pb-2 hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer ' > محصولات <ExpandCircleDown className='text-khas animate-bounce ' /></h3>
                </MenuButton>
                <Menu
                  className='bg-paszamine2'
                  variant="soft"
                  invertedColors
                  aria-labelledby="apps-menu-demo"
                  sx={{
                    '--List-padding': '0.5rem',
                    '--ListItemDecorator-size': '3rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 100px)',
                    gridAutoRows: '100px',
                    gap: 1,
                  }}
                >
                  <MenuItem orientation="vertical" className='font-bold'>
                    <ListItemDecorator>
                      <Avatar className="bg-asliLight text-white font-bold" >س</Avatar>
                    </ListItemDecorator>
                    سرامیک
                  </MenuItem>
                  <MenuItem orientation="vertical" className='font-bold'>
                    <ListItemDecorator>
                      <Avatar className="bg-asliLight text-white font-bold" >ک</Avatar>
                    </ListItemDecorator>
                    کاشی
                  </MenuItem>
                  <MenuItem orientation="vertical" className='font-bold'>
                    <ListItemDecorator>
                      <Avatar className="bg-asliLight text-white font-bold" >م</Avatar>
                    </ListItemDecorator>
                    موزاییک
                  </MenuItem>
                  <MenuItem orientation="vertical" className='font-bold'>
                    <ListItemDecorator>
                      <Avatar className="bg-asliLight text-white font-bold" >س</Avatar>
                    </ListItemDecorator>
                    سفال
                  </MenuItem>
                  <MenuItem orientation="vertical" className='font-bold'>
                    <ListItemDecorator>
                      <Avatar className="bg-asliLight text-white font-bold" >گ</Avatar>
                    </ListItemDecorator>
                    گل
                  </MenuItem>
                </Menu>
              </Dropdown> */}
              <button className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer pb-2 ' onClick={() => setOpen(true) } >
                <Link href="https://superapp-storage.storage.iran.liara.space/ARPutMarketApp.apk" >اپ موبایل <InstallMobileOutlined className='text-khas' /> </Link>
              </button>              
              <Link href="/aboutus" className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer pb-2 ' > درباره ما <ThreePRounded className='text-khas'/> </Link>
              <Link href="/contactus" className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer pb-2 ' >   تماس با ما <Phone className='text-khas' /> </Link>
            </ul>



          </div>

            <div className='w-1/5 flex justify-end items-center'>

            {
                cookie.get('tokenDastResi')
                ?
                (
                  <div className='flex flex-row justify-center items-center gap-1' >
                  
                    <IconButton color="inherit">
                      <NotificationsActive className='w-7 h-7' />
                    </IconButton>

                    <IconButton color="inherit">
                      <Link href="/buying_basket">
                        <ShoppingBasket className='w-7 h-7' />
                      </Link>
                    </IconButton>

                    <IconButton
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <AccountCircle className='w-7 h-7' />
                    </IconButton>
                    <Menu
                      className='top-14 min-w-[140px] '
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={() => handleClose()}
                      onClick={() => handleClose()}
                    >
                      <MenuItem onClick={handleClose}> {name} </MenuItem>
                      <Divider/>
                      <MenuItem className='gap-2 hover:bg-sky-200 transition-colors duration-200 w-full'> <Link href="/" > <Home className='text-asliLight' /> خانه  </Link> </MenuItem>
                      <MenuItem className='gap-2 hover:bg-sky-200 transition-colors duration-200 w-full '> <Link href="/profile" > <Person className='text-asliLight' /> پروفایل  </Link> </MenuItem>
                      <MenuItem className='gap-2 hover:bg-sky-200 transition-colors duration-200 w-full '> <Link href="/dashboard"> <SpaceDashboard className='text-asliLight' /> داشبورد   </Link> </MenuItem>
                      {/* <MenuItem className='gap-2 hover:bg-sky-200 transition-colors duration-200'> <ُ className='text-asliLight' /> سبد خرید  </MenuItem> */}
                      <MenuItem className='gap-2 hover:bg-sky-200 transition-colors duration-200 w-full '> <Settings className='text-asliLight' /> تنظیمات  </MenuItem>
                      <Divider/>
                      <MenuItem className='text-rose-800 hover:bg-rose-200 gap-2 transition-colors duration-200 font-bold w-full ' onClick={() => handleLogout() }> <ExitToApp/> خروج </MenuItem>
                    </Menu>

                    
                  {
                    dropMenu
                    ?
                    (<Close onClick={() => setDrpMenu((p) => !p )} className='w-8 h-8 text-white mx-2' />)
                    :
                    (<MenuRounded onClick={() => setDrpMenu((p) => !p )} className='w-8 h-8 text-white mx-2 md:hidden block' />)
                  }

                  {
                    dropMenu && 
                    (
                      <div onClick={() => setTimeout(() => { setDrpMenu(false) }, 500)} className="absolute bottom-[-265px] left-[-5px] w-[100vw] h-max bg-gradient-to-r from-blue-900 to-asliDark z-50 md:hidden block ">
                        <ul className="dropdown-content z-50 menu p-4 gap-6 w-[100vw] left-0 transition-all duration-700 flex flex-col ">
                          <Link href="/products" className='hover:border-b-2 border-b-khas text-xl transition-all duration-75 cursor-pointer p-3  border-b-2 w-full flex flex-row justify-between ' > فروشگاه <Apps className='text-khas'/> </Link>

                          <button className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer p-3 border-b-2 w-full flex flex-row justify-between ' onClick={() => setOpen(true) } >
                            <Link href="https://superapp-storage.storage.iran.liara.space/ARPutMarketApp.apk" >اپ موبایل <InstallMobileOutlined className='text-khas' /> </Link>
                          </button>
                          <Link href="/aboutus" className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer p-3 w-full border-b-2 flex flex-row justify-between ' > درباره ما <ThreePRounded className='text-khas'/> </Link>
                          <Link href="/contactus" className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer p-3 w-full border-b-2 flex flex-row justify-between ' >   تماس با ما <Phone className='text-khas' /> </Link>

                        </ul>
                      </div>
                    )
                  }

                  </div>
                )

                :
                (
                
                <div className='relative flex flex-row items-center '>
                
                  <Link href="/signin" className='text-base text-paszamine1 border p-2 rounded-xl bg-khas ' >
                      <p className='md:block hidden' > ورود / ثبت نام </p>
                      <LoginOutlined className='w-7 h-7 md:hidden block'  />
                  </Link>

                  {
                    dropMenu
                    ?
                    (<Close onClick={() => setDrpMenu((p) => !p )} className='w-8 h-8 text-white mx-2' />)
                    :
                    (<MenuRounded onClick={() => setDrpMenu((p) => !p )} className='w-8 h-8 text-white mx-2 md:hidden block' />)
                  }
                  
                  {
                    dropMenu && 
                    (
                      <div onClick={() => setTimeout(() => { setDrpMenu(false) }, 500)} className="absolute bottom-[-265px] left-[-5px] w-[100vw] h-max bg-gradient-to-r from-blue-900 to-asliDark z-50 md:hidden block ">
                        <ul className="dropdown-content z-50 menu p-4 gap-6 w-[100vw] left-0 transition-all duration-700 flex flex-col ">
                          <Link href="/products" className='hover:border-b-2 border-b-khas text-xl transition-all duration-75 cursor-pointer p-3  border-b-2 w-full flex flex-row justify-between ' > فروشگاه <Apps className='text-khas'/> </Link>
                          <button className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer p-3 w-full border-b-2 flex flex-row justify-between ' onClick={() => setOpen(true) } >
                            <Link href="https://superapp-storage.storage.iran.liara.space/ARPutMarketApp.apk" >اپ موبایل <InstallMobileOutlined className='text-khas' /> </Link>
                          </button>
                          <Link href="/aboutus" className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer p-3 w-full border-b-2 flex flex-row justify-between ' > درباره ما <ThreePRounded className='text-khas'/> </Link>
                          <Link href="/contactus" className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer p-3 w-full border-b-2 flex flex-row justify-between ' >   تماس با ما <Phone className='text-khas' /> </Link>

                        </ul>
                      </div>
                    )
                  }

                </div>
                )
              }

            </div>


        <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset',
            },
          })}
        >
          <Typography id="nested-modal-title" level="h2">
            پیش نیاز
          </Typography>
          <Divider></Divider>
          <Typography id="nested-modal-description"  className="font-semibold py-5">
             قبل از نصب برنامه اطمینان حاصل فرمایید که برنامه ی google play services for Ar بر روی گوشی همراه شما نصب و بروزرسانی شده باشد.
          </Typography>
          <div className='w-full mt-4 mb-2 text-center' >
            <Link href="https://superapp-storage.storage.iran.liara.space/Google-Play-Services-for-AR-1.41.233110983.apk" className="rounded-lg bg-khas text-white p-3 w-full border  " > دانلود google play services for Ar </Link>

          </div>
        </ModalDialog>
      </Modal>

        </Toolbar>
      </AppBar>

    </div>
  );
}