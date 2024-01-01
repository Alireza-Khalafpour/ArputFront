'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Divider } from '@mui/material';
import { ArrowCircleDownTwoTone, ArrowDownward, ExitToApp, ExpandCircleDown, Home, InstallMobileOutlined, LoginOutlined, NotificationsActive, Payment, Person, Settings, ShoppingBasket, SpaceDashboard, Store } from '@mui/icons-material';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import { Avatar, Dropdown, ListItemDecorator, Menu, MenuButton, MenuItem } from '@mui/joy';


export default function Header() {

  const cookie = new Cookies();

  const route = useRouter()
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    cookie.remove("tokenDastResi");
    setTimeout(() => {
      route.push("/")
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
            <Typography variant='h4' >
              لوگو
            </Typography>

            <ul className='flex flex-row justify-center items-center h-full gap-6' >
              <Dropdown>
                <MenuButton
                  slots={{ root: IconButton }}
                  slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
                  sx={{ borderRadius: 40 }}
                >
                  <h3 onClick={() => setProductsList(true)}  className=' text-white pb-2 hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer ' > محصولات <ExpandCircleDown className='text-khas animate-bounce ' /></h3>
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
              </Dropdown>
              <h3 className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer pb-2 ' >اپ موبایل <InstallMobileOutlined className='text-khas' /> </h3>
              <Link href="/signup" className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer pb-2 ' > ثبت فروشگاه <Store className='text-khas'/> </Link>
              <h3 className='hover:border-b-2 border-b-khas transition-all duration-75 cursor-pointer pb-2 ' > لیست هزینه اشتراک <Payment className='text-khas' /> </h3>
            </ul>



          </div>

            <div className='w-1/5 flex justify-end items-center'>

            {
                cookie.get('tokenDastResi')
                ?
                (
                  <div>
                  
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
                      className='top-14 '
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}> کارخانه آرپوت سرام  </MenuItem>
                      <Divider/>
                      <MenuItem className='gap-2 hover:bg-sky-200 transition-colors duration-200' onClick={handleClose}> <Link href="/" > <Home className='text-asliLight' /> خانه  </Link> </MenuItem>
                      <MenuItem className='gap-2 hover:bg-sky-200 transition-colors duration-200' onClick={handleClose}> <Link href="/profile" > <Person className='text-asliLight' /> پروفایل  </Link> </MenuItem>
                      <MenuItem className='gap-2 hover:bg-sky-200 transition-colors duration-200' onClick={handleClose}> <Link href="/dashboard"> <SpaceDashboard className='text-asliLight' /> داشبورد   </Link> </MenuItem>
                      {/* <MenuItem className='gap-2 hover:bg-sky-200 transition-colors duration-200' onClick={handleClose}> <ُ className='text-asliLight' /> سبد خرید  </MenuItem> */}
                      <MenuItem className='gap-2 hover:bg-sky-200 transition-colors duration-200' onClick={handleClose}> <Settings className='text-asliLight' /> تنظیمات  </MenuItem>
                      <Divider/>
                      <MenuItem className='text-rose-800 hover:bg-rose-200 gap-2 transition-colors duration-200 font-bold' onClick={() => handleLogout() }> <ExitToApp/> خروج </MenuItem>
                    </Menu>

                  </div>
                )

                :
                (
                
                  <Link href="/signin" className='text-base text-paszamine1' >
                      ورود / ثبت نام
                      <LoginOutlined className='w-7 h-7'  />
                  </Link>

                
                )
              }

            </div>

        </Toolbar>
      </AppBar>
    </div>
  );
}