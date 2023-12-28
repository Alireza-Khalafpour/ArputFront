'use client'

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Divider } from '@mui/material';
import { ExitToApp, Home, LoginOutlined, NotificationsActive, Person, Settings, ShoppingBasket, SpaceDashboard } from '@mui/icons-material';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';


export default function Header() {

  const cookie = new Cookies();

  const route = useRouter()

  const handleLogout = () => {
    cookie.remove("tokenDastResi");
    setTimeout(() => {
      route.push("/")
    }, 1000);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='w-full' >
      <AppBar position="static" className='bg-asliDark' >
        <Toolbar className='flex flex-row justify-between w-full items-center' >
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant='h4' >
            لوگو
          </Typography>

            <div>

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