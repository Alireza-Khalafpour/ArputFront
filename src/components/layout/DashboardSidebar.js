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
import { Accordion, AccordionSummary, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { AddRounded, Check, CheckCircleRounded, CloseRounded, ElectricBolt, ExpandMore, Factory, FactoryOutlined, FeaturedPlayListOutlined, Home, HourglassBottomOutlined, KeyboardArrowRight, ListAltOutlined, ManageAccountsOutlined, ManageSearchRounded, Payment, PaymentOutlined, Schedule, ShoppingBasket, Timer } from '@mui/icons-material';
import Link from 'next/link';
import Cookies from 'universal-cookie';
import NotAllowedPage from './NotAllowedPage';
import { Card, CardActions, Chip, ListItemDecorator } from '@mui/joy';



const drawerWidth = 250;



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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function DashbordSidebar({children}) {

  const cookie = new Cookies();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState(" داشبورد ")
  const [openPurchaseModal, setOpenPurchaseModal] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClosePurchaseModal = () => {
    setOpenPurchaseModal(false)
  }

  const handleOpenPurchaseModal = () => {
    setOpenPurchaseModal(true)
  }


  return (
    <div sx={{ display: 'flex' }}>
      <AppBar position="relative" open={open} className='bg-asliLight' style={{maxHeight: "4rem"}} >
        <Toolbar style={{maxHeight: '20px'}} >
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
            { title } 
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid open={open} className='w-full p-6 gap-8 flex flex-col' >

          {
            cookie.get("tokenDastResi")
            ?
            children
            :
            <NotAllowedPage/>
          }

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

            <ListItem disablePadding >
              <Link onClick={() => handleDrawerClose()} href="/dashboard" className='bg-[#092739] w-full mx-1 shadow-none border-none transition-all duration-200 flex justify-between cursor-pointer text-white p-3 hover:bg-slate-700 rounded-lg text-right' >
                <span> داشبورد </span>
                <Home className='text-khas' />
              </Link>
            </ListItem>

            
            <Divider className='bg-slate-500' />

            {/* <ListItem  disablePadding >
              <Accordion className='bg-[#092739] text-[#F2F2F2] w-full shadow-none border-none' >
                <AccordionSummary
                  expandIcon={<ExpandMore style={{color:"white"}} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className='hover:bg-slate-700 rounded-lg'
                >
                  <Typography> باندل  </Typography>
                </AccordionSummary>
                <Link  onClick={() => setTitle(" ایجاد باندل ")} href="/dashboard" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white ' >
                    ایجاد باندل
                    <ListAltOutlined className='text-khas'/>
                </Link>
              </Accordion>
            </ListItem> */}
            <Divider className='bg-slate-500' />

              {
                cookie.get("role") === "admin" && 
                <>
                                  <ListItem  disablePadding >
                <Accordion className='bg-[#092739] text-[#F2F2F2] w-full shadow-none border-none' >
                  <AccordionSummary
                    expandIcon={<ExpandMore style={{color:"white"}} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    className='hover:bg-slate-700 rounded-lg'
                  >
                    <Typography>  پنل ادمین </Typography>
                  </AccordionSummary>
                  <Link  onClick={() => handleDrawerClose()} href="/dashboard/create-category" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer hover:text-white text-white ' >
                        دسته بندی ها
                      <ListAltOutlined className='text-khas'/>
                  </Link>
                  <Link  onClick={() => handleDrawerClose()} href="/dashboard/CreateFeature" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white ' >
                          ویژگی ها    
                      <FeaturedPlayListOutlined className='text-khas'/>
                  </Link>
                  <Link onClick={() => handleDrawerClose()} href="/dashboard/create-factory" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white ' >
                         کارخانه ها    
                      <FactoryOutlined className='text-khas'/>
                  </Link>
                  <Link onClick={() => handleDrawerClose()} href="/dashboard/branches-list-Admin" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white ' >
                        لیست تمام نمایندگی ها  
                      <FactoryOutlined className='text-khas'/>
                  </Link>
                  <Link onClick={() => handleDrawerClose()} href="/dashboard/my-products"  className='text-right mr-4 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white p-3 ' >
                      مدیریت پیش محصول و محصولات (Admin)
                      <InboxIcon  className='text-khas'/>
                  </Link>
                  <Link  onClick={() => handleDrawerClose()} href="/dashboard/create-department" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white ' >
                        دپارتمان ها  
                      <ListAltOutlined className='text-khas'/>
                  </Link>
                  <Link  onClick={() => handleDrawerClose()} href="/dashboard/create-expire-pulse" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white ' >
                      زمانبندی پالس   
                      <Timer className='text-khas'/>
                  </Link>
                  <Link  onClick={() => handleDrawerClose()} href="/dashboard/create-price-pulse" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white ' >
                      قیمت پالس   
                      <PaymentOutlined className='text-khas'/>
                  </Link>
                  <Link  onClick={() => handleDrawerClose()} href="/dashboard/create-pulse-plan" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white ' >
                      برنامه پالس ها                        
                      <ElectricBolt className='text-khas'/>

                  </Link>
                </Accordion>
              </ListItem>
              <Divider className='bg-slate-500' />
                
                </>

              }


              {
                cookie.get("role") === "factory" &&

                <>
                
                <ListItem  disablePadding >
                  <Accordion className='bg-[#092739] text-[#F2F2F2] w-full shadow-none border-none' >
                    <AccordionSummary
                      expandIcon={<ExpandMore style={{color:"white"}} />}
                      className='hover:bg-slate-700 rounded-lg'
                    >
                      <Typography>  مدیریت نمایندگی ها </Typography>
                    </AccordionSummary>
                    <Link onClick={() => handleDrawerClose()} href="/dashboard/add-representation" className='text-right mr-4 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white p-3 ' >
                        ایجاد و لیست نمایندگی ها
                        <AddRounded className='text-khas'/>
                    </Link>
                  </Accordion>
                </ListItem>

                <Divider className='bg-slate-500' />

                </>
              }
                            {
                cookie.get("role") === "admin" &&

                <>
                
                <ListItem  disablePadding >
                  <Accordion className='bg-[#092739] text-[#F2F2F2] w-full shadow-none border-none' >
                    <AccordionSummary
                      expandIcon={<ExpandMore style={{color:"white"}} />}
                      className='hover:bg-slate-700 rounded-lg'
                    >
                      <Typography>  مدیریت نمایندگی ها </Typography>
                    </AccordionSummary>
                    <Link onClick={() => handleDrawerClose()} href="/dashboard/add-representation" className='text-right mr-4 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white p-3 ' >
                        (Admin)ایجاد و لیست نمایندگی ها
                        <AddRounded className='text-khas'/>
                    </Link>
                  </Accordion>
                </ListItem>

                <Divider className='bg-slate-500' />

                </>
              }

            

            <ListItem  disablePadding >
              <Accordion className='bg-[#092739] text-[#F2F2F2] w-full shadow-none border-none' >
                <AccordionSummary
                  expandIcon={<ExpandMore style={{color:"white"}} />}
                  className='hover:bg-slate-700 rounded-lg'
                >
                  <Typography>  محصولات </Typography>
                </AccordionSummary>
                {
                  cookie.get("role") === "factory" &&
                  <Link onClick={() => handleDrawerClose()} href="/dashboard/add-pre-product" className='text-right mr-4 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white p-3 ' >
                      ایجاد پیش محصول
                      <AddRounded className='text-khas'/>
                  </Link>
                }

                {
                  cookie.get("role") === "admin"  &&
                  <Link onClick={() => handleDrawerClose()} href="/dashboard/add-pre-product" className='text-right mr-4 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white p-3 ' >
                      ایجاد پیش محصول
                      <AddRounded className='text-khas'/>
                  </Link>
                }


                {
                  cookie.get("role") === "factory" &&
                    <Link onClick={() => handleDrawerClose()} href="/dashboard/my-products-factory"  className='text-right mr-4 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white p-3 ' >
                        مدیریت محصولات من
                        <InboxIcon  className='text-khas'/>
                    </Link>
                }
                                {
                  cookie.get("role") === "shop" &&
                    <Link onClick={() => handleDrawerClose()} href="/dashboard/my-products-shop"  className='text-right mr-4 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white p-3 ' >
                        مدیریت محصولات من
                        <InboxIcon  className='text-khas'/>
                    </Link>
                }

              </Accordion>
            </ListItem>
        
        <Divider className='bg-slate-500' />

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
                <Link onClick={() => handleDrawerClose()} href="/dashboard/my-wallet" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white ' >
                    کیف پول من
                    <Payment className='text-khas'/>
                </Link>
                <button onClick={() => handleOpenPurchaseModal()} className='text-right mr-4 p-3 w-full hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white ' >
                  خرید اشتراک
                </button>
              </Accordion>
            </ListItem>

        <Divider className='bg-slate-500' />

            <ListItem  disablePadding >
              <Accordion className='bg-[#092739] text-[#F2F2F2] w-full shadow-none border-none' >
                <AccordionSummary
                  expandIcon={<ExpandMore style={{color:"white"}} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  className='hover:bg-slate-700 rounded-lg'
                >
                  <Typography>  سفارشات </Typography>
                </AccordionSummary>
                <Link onClick={() => handleDrawerClose()} href="/dashboard/processing-orders" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white ' >
                      سفارشات در صف انتظار  
                    <HourglassBottomOutlined className='text-khas'/>
                </Link>
                <Link onClick={() => handleDrawerClose()} href="/dashboard/done-orders" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white ' >
                      سفارشات انجام شده    
                    <CheckCircleRounded className='text-khas'/>
                </Link>
              </Accordion>
            </ListItem>

        <Divider className='bg-slate-500' />

        <Link onClick={() => handleDrawerClose()} href="/dashboard/ticketChat" className='text-right mr-4 p-3 hover:bg-slate-700 rounded-lg transition-all duration-200 flex justify-between cursor-pointer text-white hover:text-white ' >
          تیکت و پشتیبانی
          <ManageAccountsOutlined className='text-khas'/>
        </Link>



        </List>



      </Drawer>


      <Dialog
        open={openPurchaseModal}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xl"
        onClose={() => handleClosePurchaseModal}
        className='h-[80vh]'
      >
        <DialogTitle className='w-full flex justify-between items-center' >
            <span className='' >  خرید اشتراک  </span>
           <button onClick={() => handleClosePurchaseModal()} className='bg-rose-600 hover:bg-rose-700 text-white hover:text-white rounded-full w-8 h-8' ><CloseRounded/></button>
        </DialogTitle>
        <DialogContent className='flex flex-row justify-center items-center gap-4' >


          <Card
          size="lg"
          variant="solid"
          color="neutral"
          invertedColors
          sx={{ bgcolor: 'neutral.900' }}
          className="h-max"
          >
            <Chip size="lg" variant="outlined">
              MOST POPULAR
            </Chip>
            <Typography level="h2">Unlimited</Typography>
            <div className='w-full border-2 border-white' ></div>
            <List
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                mx: 'calc(-1 * var(--ListItem-paddingX))',
              }}
            >
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Virtual Credit Cards
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Financial Analytics
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Checking Account
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                API Integration
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Cancel Anytime
              </ListItem>
            </List>
            <div className='w-full border-2 border-white' ></div>
            <CardActions>
              <Typography level="title-lg" sx={{ mr: 'auto' }}>
                5.990€{' '}
                <Typography fontSize="sm" textColor="text.tertiary">
                  / month
                </Typography>
              </Typography>
              <Button className='bg-khas text-white hover:text-white' endDecorator={<KeyboardArrowRight />}>Start now</Button>
            </CardActions>
          </Card>

          <Card
          size="lg"
          variant="solid"
          color="neutral"
          invertedColors
          className="h-max bg-asliDark "
          >
            <Chip size="lg" variant="outlined">
              MOST POPULAR
            </Chip>
            <Typography level="h2">Unlimited</Typography>
            <div className='w-full border-2 border-white' ></div>
            <List
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                mx: 'calc(-1 * var(--ListItem-paddingX))',
              }}
            >
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Virtual Credit Cards
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Financial Analytics
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Checking Account
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                API Integration
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Cancel Anytime
              </ListItem>
            </List>
            <div className='w-full border-2 border-white' ></div>
            <CardActions>
              <Typography level="title-lg" sx={{ mr: 'auto' }}>
                5.990€{' '}
                <Typography fontSize="sm" textColor="text.tertiary">
                  / month
                </Typography>
              </Typography>
              <Button className='bg-khas text-white hover:text-white' endDecorator={<KeyboardArrowRight />}>Start now</Button>
            </CardActions>
          </Card>

          <Card
          size="lg"
          variant="solid"
          color="neutral"
          invertedColors
          className="h-max "
          >
            <Chip size="lg" variant="outlined">
              MOST POPULAR
            </Chip>
            <Typography level="h2">Unlimited</Typography>
            <div className='w-full border-2 border-white' ></div>
            <List
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                mx: 'calc(-1 * var(--ListItem-paddingX))',
              }}
            >
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Virtual Credit Cards
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Financial Analytics
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Checking Account
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                API Integration
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Check />
                </ListItemDecorator>
                Cancel Anytime
              </ListItem>
            </List>
            <div className='w-full border-2 border-white' ></div>
            <CardActions>
              <Typography level="title-lg" sx={{ mr: 'auto' }}>
                5.990€{' '}
                <Typography fontSize="sm" textColor="text.tertiary">
                  / month
                </Typography>
              </Typography>
              <Button className='bg-khas text-white hover:text-white' endDecorator={<KeyboardArrowRight />}>Start now</Button>
            </CardActions>
          </Card>



        </DialogContent>

        <DialogActions className='w-full flex justify-start items-center' >
          <span className='text-lg' > برای استفاده از خدمات داشبورد ابتدا اشتراک تهیه کنید. </span>
        </DialogActions>
      </Dialog>



    </div>
  );
}