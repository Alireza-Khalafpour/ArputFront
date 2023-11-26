'use client'

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Accordion, AccordionSummary } from '@mui/material';
import { AddRounded, ExpandMore, Home, ManageAccountsOutlined, ManageSearchRounded, Payment, ShoppingBasket } from '@mui/icons-material';
import Link from 'next/link';


const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     padding: theme.spacing(3),
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginRight: -drawerWidth,
//     ...(open && {
//       transition: theme.transitions.create('margin', {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginRight: 0,
//     }),
//     /**
//      * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
//      * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
//      * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
//      * proper interaction with the underlying content.
//      */
//     position: 'relative',
//   }),
// );

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
  backgroundColor:"#092739",
  color:"#F2F2F2"
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  color:"#F2F2F2"
}));

export default function DashbordSidebar({children}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // // navigation function--------
  // const NavigateTo = (address) => {
    
  // }

  return (
    <div sx={{ display: 'flex' }}>
      <AppBar position="relative" open={open}>
        <Toolbar className='bg-asliLight' >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            داشبورد 
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid open={open} className='w-full p-6 gap-8 flex flex-col' >

          {children}

      </Grid>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            color:"#F2F2F2",
            backgroundColor:"#0A2739",
            borderColor:"#F2F2F2",
          },
          
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon style={{color:"white"}} /> : <ChevronRightIcon style={{color:"white"}} />}
          </IconButton>
        </DrawerHeader>
        <Divider className='bg-slate-400' />
        <List className='relative' >

            <ListItem disablePadding focusRipple >
              <Link href="/dashboard" className='bg-[#092739] text-[#F2F2F2] w-full mx-1 shadow-none border-none transition-all duration-200 flex justify-between cursor-pointer p-3 hover:bg-slate-700 rounded-lg text-right' >
                <span> داشبورد </span>
                <Home className='text-khas' />
              </Link>
            </ListItem>

            <Divider className='bg-slate-400' />

            <ListItem  disablePadding focusRipple >
              <Accordion className='bg-[#092739] text-[#F2F2F2] w-full shadow-none border-none' >
                <AccordionSummary
                  expandIcon={<ExpandMore style={{color:"white"}} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className='hover:bg-slate-700 rounded-lg'
                >
                  <Typography>  محصولات </Typography>
                </AccordionSummary>
                <Link  href="/dashboard/add-pre-product" className='text-right mr-4 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer p-3 ' >
                    ایجاد محصول
                    <AddRounded className='text-khas'/>
                </Link>
                <Link  href="/dashboard/pre-product-list" className='text-right mr-4 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer p-3 ' >
                    لیست محصولات
                    <ManageSearchRounded className='text-khas'/>
                </Link>
                <Link href="#"  className='text-right mr-4 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer p-3 ' >
                    مدیریت محصولات من
                    <InboxIcon  className='text-khas'/>
                </Link>
              </Accordion>
            </ListItem>
        </List>
        <Divider className='bg-slate-400' />
        <List>
            <ListItem  disablePadding >
              <Accordion className='bg-[#092739] text-[#F2F2F2] w-full shadow-none border-none' >
                <AccordionSummary
                  expandIcon={<ExpandMore style={{color:"white"}} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className='hover:bg-slate-700 rounded-lg'
                >
                  <Typography>  مالی </Typography>
                </AccordionSummary>
                <Link href="/dashboard/my-wallet" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer ' >
                    کیف پول من
                    <Payment className='text-khas'/>
                </Link>
              </Accordion>
            </ListItem>
        </List>

        <Link href="/dashboard/ticketChat" className=' absolute bottom-2 w-[90%] text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer ' >
                      تیکت و پشتیبانی
                    <ManageAccountsOutlined className='text-khas'/>
        </Link>

      </Drawer>
    </div>
  );
}