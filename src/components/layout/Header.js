'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Divider, MenuList } from '@mui/material';
import { Apps, ArrowDropDown, CloseRounded, ExitToApp, Home, InstallMobileOutlined, LoginOutlined, NotificationsActive, Person, Phone, Settings, ShoppingBasket, SpaceDashboard, ThreePRounded, VideoLabel } from '@mui/icons-material';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { Menu, MenuItem, Modal, ModalDialog } from '@mui/joy';
import axios from 'axios';
import Image from 'next/image';
import "../styles/LandingPageStyles/style.css"


export default function Header() {

  const cookie = new Cookies();

  const Au = cookie.get("tokenDastResi") ? cookie.get("tokenDastResi") : null 

  const route = useRouter()
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [name , setName] = React.useState("");

  const [dropMenu, setDrpMenu] = React.useState(false)

  const [open, setOpen] = React.useState(false);

  const [videoModal, setVideoModal] = React.useState(false);



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
        console.log("Error on getting current user");
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


  return (
    // <div className='w-full fixed z-[200]'>
    //   <AppBar position="static" className='bg-asliDark' >
    //     <Toolbar className='flex flex-row justify-between w-full h-full items-center' >
    //       {/* <IconButton
    //         size="large"
    //         edge="start"
    //         color="inherit"
    //         aria-label="menu"
    //         sx={{ mr: 2 }}
    //       >
    //         <MenuIcon />
    //       </IconButton> */}
    //       <div className='w-4/5 flex flex-row justify-start h-full items-center gap-20'>
    //         <Link href="/" className='cursor-pointer'  >
    //           <Image src="/favicon.ico" width={66} height={66} />
    //         </Link>

    //         <ul className='md:flex hidden flex-row justify-center items-center h-full gap-6' >

    //         <Link href="/products" className='hover:border-b-2 border-b-khas text-xl transition-all duration-75 cursor-pointer pb-2 ' > فروشگاه <Apps className='text-khas'/> </Link>

    //           <button className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer pb-2 ' onClick={() => setOpen(true) } >
    //             <Link href="https://superapp-storage.storage.iran.liara.space/ARPutMarketApp.apk" >اپ موبایل <InstallMobileOutlined className='text-khas' /> </Link>
    //           </button>              
    //           <Link href="/aboutus" className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer pb-2 ' > درباره ما <ThreePRounded className='text-khas'/> </Link>
    //           <Link href="/contactus" className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer pb-2 ' >   تماس با ما <Phone className='text-khas' /> </Link>
    //           <button onClick={() => setVideoModal(true)} className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer pb-2 ' > ویدیو <VideoLabel className='text-khas' /> </button>
    //         </ul>



    //       </div>

    //         <div className='w-1/5 flex justify-end items-center'>

    //         {
    //             cookie.get('tokenDastResi')
    //             ?
    //             (
    //               <div className='flex flex-row justify-center items-center gap-1' >
                  
    //                 <IconButton color="inherit">
    //                   <NotificationsActive className='w-7 h-7' />
    //                 </IconButton>

    //                 <IconButton color="inherit">
    //                   <Link href="/buying_basket">
    //                     <ShoppingBasket className='w-7 h-7' />
    //                   </Link>
    //                 </IconButton>

    //                 <IconButton
    //                   aria-controls="menu-appbar"
    //                   aria-haspopup="true"
    //                   onClick={handleMenu}
    //                   color="inherit"
    //                 >
    //                   <AccountCircle className='w-7 h-7' />
    //                 </IconButton>
    //                 <Menu
    //                   className='top-14 min-w-[140px] '
    //                   id="menu-appbar"
    //                   anchorEl={anchorEl}
    //                   anchorOrigin={{
    //                     vertical: 'top',
    //                     horizontal: 'right',
    //                   }}
                      
    //                   transformOrigin={{
    //                     vertical: 'top',
    //                     horizontal: 'right',
    //                   }}
    //                   open={Boolean(anchorEl)}
    //                   onClose={handleClose}
    //                   onClick={handleClose}
    //                 >
    //                   <MenuItem> {name} </MenuItem>
    //                   <Divider/>
    //                   <MenuItem onClick={() => handleClose()} className='gap-2 hover:bg-sky-200 transition-colors duration-200 w-full'> <Link href="/" > <Home className='text-asliLight' /> خانه  </Link> </MenuItem>
    //                   <MenuItem onClick={() => handleClose()} className='gap-2 hover:bg-sky-200 transition-colors duration-200 w-full '> <Link href="/profile" > <Person className='text-asliLight' /> پروفایل  </Link> </MenuItem>
    //                   <MenuItem onClick={() => handleClose()} className='gap-2 hover:bg-sky-200 transition-colors duration-200 w-full '> <Link href="/dashboard"> <SpaceDashboard className='text-asliLight' /> داشبورد   </Link> </MenuItem>
    //                   <MenuItem onClick={() => handleClose()} className='gap-2 hover:bg-sky-200 transition-colors duration-200'><Settings className='text-asliLight' /> برروزرسانی رمزعبور </MenuItem>
    //                   <Divider/>
    //                   <MenuItem className='text-rose-800 hover:bg-rose-200 gap-2 transition-colors duration-200 font-bold w-full ' onClick={() => handleLogout() }> <ExitToApp/> خروج </MenuItem>
    //                 </Menu>


    //               </div>
    //             )

    //             :
    //             (
                
    //             <div className='relative flex flex-row items-center justify-center gap-2 '>
                
    //               <Link href="/signin" className='text-base text-paszamine1 border p-1 rounded-xl bg-khas ' >
    //                   <p className='md:block hidden' > ورود / ثبت نام </p>
    //                   <LoginOutlined className='w-6 h-6 md:hidden block'  />
    //               </Link>

    //               <button onClick={() => setVideoModal(true)} className=' md:hidden block text-base text-paszamine1 border p-1 rounded-xl bg-khas ' > <VideoLabel className='text-white w-6 h-6 ' /> </button>

    //             </div>
    //             )
    //           }

    //         </div>


    //     <Modal open={open} onClose={() => setOpen(false)}>
    //     <ModalDialog
    //       aria-labelledby="nested-modal-title"
    //       aria-describedby="nested-modal-description"
    //       sx={(theme) => ({
    //         [theme.breakpoints.only('xs')]: {
    //           top: 'unset',
    //           bottom: 0,
    //           left: 0,
    //           right: 0,
    //           borderRadius: 0,
    //           transform: 'none',
    //           maxWidth: 'unset',
    //         },
    //       })}
    //     >
    //       <Typography id="nested-modal-title" level="h2">
    //         پیش نیاز
    //       </Typography>
    //       <Divider></Divider>
    //       <Typography id="nested-modal-description"  className="font-semibold py-5">
    //          قبل از نصب برنامه اطمینان حاصل فرمایید که برنامه ی google play services for Ar بر روی گوشی همراه شما نصب و بروزرسانی شده باشد.
    //       </Typography>
    //       <div className='w-full mt-4 mb-2 text-center' >
    //         <Link href="https://superapp-storage.storage.iran.liara.space/Google-Play-Services-for-AR-1.41.233110983.apk" className="rounded-lg bg-khas text-white p-3 w-full border  " > دانلود google play services for Ar </Link>

    //       </div>
    //     </ModalDialog>
    //   </Modal>


    //   <Modal open={videoModal} onClose={() => setVideoModal(false)} >
    //       <div className='w-full h-full flex justify-center items-center text-center' >

    //           <button className='bg-red-600 rounded-full p-3 absolute top-[9%] right-[15%] font-bold hover:bg-red-700 transition-all duration-150 ' onClick={() => setVideoModal(false)} >
    //             <CloseRounded className="text-white font-bold" />
    //           </button>
              
    //           <div className="w-[70vw] h-[70vh]">
    //             <span className='block m-auto' ></span>
    //             <iframe 
    //               className='w-full h-full'
    //               src="https://www.aparat.com/video/video/embed/videohash/cY0jN/vt/frame?titleShow=true&autoplay=true" 
    //               allow="autoplay" 
    //               allowFullScreen="true" 
    //               webkitallowfullscreen="true" 
    //               mozallowfullscreen="true"
    //             ></iframe>
    //           </div>


    //       </div>
    //   </Modal>

    //     </Toolbar>
    //   </AppBar>

    // </div>



    // -------------------------------------------------------------------

    <>

      <div className="w-full min-h-[90px]">
        
        <nav className="navbar navbar-expand-lg flex flex-row justify-center w-full items-center !fixed z-[200] backdrop-blur-xl ">
          <Link className="w-1/6" href="/">
            <Image src="/favicon.ico" width={80} height={80} className='m-auto' />
          </Link>
          {/* <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon">
              
              <div class="toggle-wrap">
                <span class="toggle-bar"></span>
              </div>
            </span>
          </button> */}

          <div className="w-5/6">
            <ul className="navbar-nav mx-auto flex flex-row justify-center ">

              <li className="nav-item">
              <Link href="/" className='hover:text-asliLight nav-link ' >  خانه </Link>
              </li>

              <li className='nav-item' >
                <Link href="/products" className='hover:text-asliLight nav-link ' > فروشگاه</Link>
              </li>

              <li className='nav-item' >
                <Link href="/aboutus" className='hover:text-asliLight nav-link ' > درباره ما </Link>
              </li>

              <li className='nav-item' >
                <Link href="/contactus" className='hover:text-asliLight nav-link ' > تماس با ما</Link>
              </li>


              <li className="nav-item has_dropdown">
                <a className="nav-link" href="#">صفحه‌ها</a>
                <span className="drp_btn"><i> <ArrowDropDown/>  </i></span>
                <div className="sub_menu">
                  <ul>
                    <li><a href="about.html"> درباره ما </a></li>
                    <li><a href="reviews.html">نظرات</a></li>
                    <li><a href="contact.html"> ارتباط با ما </a></li>
                    <li><a href="faq.html">سوالات متداول</a></li>
                    <li><a href="sign-in.html">ورود</a></li>
                    <li><a href="sign-up.html">ثبت نام</a></li>
                    <li><a href="blog-list.html">لیست بلاگ</a></li>
                    <li><a href="blog-single.html">جزییات بلاگ</a></li>
                  </ul>
                </div>
              </li>

              <li class="nav-item">
                <Link href="/signin" class="nav-link dark_btn animate-bounce" > ورود | ثبت نام </Link>
              </li>
            </ul>
          </div>
        </nav>

      </div>

    </>


  );
}