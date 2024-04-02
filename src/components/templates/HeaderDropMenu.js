'use client'



import * as React from 'react';

import Link from 'next/link';
import Cookies from 'universal-cookie';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import { Avatar, Menu, MenuItem, Typography } from '@mui/material';
import { AccountCircle, ExitToApp, Person, SpaceDashboard } from '@mui/icons-material';
import { redirect, useRouter } from 'next/navigation';

const data = [
  { icon: <People />, label: 'Authentication' },
  { icon: <Dns />, label: 'Database' },
  { icon: <PermMedia />, label: 'Storage' },
  { icon: <Public />, label: 'Hosting' },
];

const FireNav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});



export default function HeaderDropMenu({name,family}) {

    const route = useRouter();
    const cookie = new Cookies();
    const Au = cookie.get("tokenDastResi") ? cookie.get("tokenDastResi") : null 


  const [open, setOpen] = React.useState(true);
  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

   function handleLogout() {
    cookie.remove("tokenDastResi");
    cookie.remove("role");
    cookie.remove("welcommed")
    handleCloseUserMenu()
    setTimeout(() => {
      window?.location?.reload();
      // redirect("/")
    }, 800);

  }


  return (

    <div>
                  <Box sx={{ flexGrow: 0 }}>
                  <Tooltip>
                    <IconButton className='border hover:bg-transparent ' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <AccountCircle className='w-7 h-7' /> <span className='text-lg md:block hidden' > {name} {family} </span>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    onClick={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu} className='gap-2 hover:bg-sky-200 transition-colors duration-200 w-full'> <Link href="/" > <Home className='text-asliLight' /> خانه  </Link> </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu} className='gap-2 hover:bg-sky-200 transition-colors duration-200 w-full '> <Link href="/profile" > <Person className='text-asliLight' /> پروفایل  </Link> </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu} className='gap-2 hover:bg-sky-200 transition-colors duration-200 w-full '> <Link href="/dashboard"> <SpaceDashboard className='text-asliLight' /> داشبورد   </Link> </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu} className='gap-2 hover:bg-sky-200 transition-colors duration-200'><Settings className='text-asliLight' /> برروزرسانی رمزعبور </MenuItem>
                    <Divider/>
                    <MenuItem className='text-rose-800 hover:bg-rose-200 gap-2 transition-colors duration-200 font-bold w-full ' onClick={() => handleLogout() }> <ExitToApp/> خروج </MenuItem>

                  </Menu>
                </Box>
    
    
    </div>
  );
}
