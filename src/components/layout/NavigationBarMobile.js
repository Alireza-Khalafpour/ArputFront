'use client'


import { Download, FavoriteBorder, Home, HomeRounded, Login, Person, Phone, Search, StackedBarChart } from "@mui/icons-material";
import Link from "next/link";
import "../styles/NavigationBarMobile.css"
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Tab, { tabClasses } from '@mui/joy/Tab';
import { Box, ListItemDecorator, TabList, Tabs } from "@mui/joy";


const NavigationBarMobile = () => {

    const cookie = new Cookies();

    const ActiveState = cookie.get('activeList');
    const role = cookie.get('role');

    const [activeList, setActiveList] = useState(1);
    const [isClient, setIsClient] = useState(true);

    useEffect(() => {
        if(ActiveState !== null){
            setActiveList(ActiveState);
        }else{
            setActiveList(1)
        }
        if(role == undefined || role == null || role == "client"){
            setIsClient(true);
        }else{
            setIsClient(false);
        }
    },[])

    const handleClickLink = (i) => {
        cookie.set('activeList',i)
        setActiveList(i)
    }

    // ---------------------------------

    const [scrollDirection, setScrollDirection] = useState(0)
    const[showNav, setShowNav] = useState(true)

    // window.addEventListener("scroll", HideShowNavbar)
    // window.addEventListener("scrollend", OnScrollEnd)

    // function HideShowNavbar(){
    //     if(window.scrollY > scrollDirection){
    //         setShowNav(false)
    //     }else{
    //         setShowNav(true)
    //     }
    // }

    // function OnScrollEnd(){
    //     setScrollDirection(window.scrollY)
    // }

    const [index, setIndex] = useState(0);
    const colors = ['primary', 'danger', 'success', 'warning'];
    
    // ---------------------------------


    return (
        <>
    

    <div className={`  sm:hidden block z-40 text-center bottom-0 fixed w-[100vw] transition-all duration-500 ease-out ${showNav ? 'ok' : 'hidden' } `} id="bottomMenu" >
        <Box
        sx={{
            width: '100%',
            flexGrow: 1,
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
        }}
        >
        <Tabs
            size="lg"
            aria-label="Bottom Navigation"
            sx={(theme) => ({
            p:0,
            borderRadius: 16,
            mx: 'auto',
            [`& .${tabClasses.root}`]: {
                py: 2,
                flex: 1,
                transition: '0.5s',
                fontWeight: 'md',
                fontSize: 'md',
            },
            })}
        >
            <TabList
            variant="soft"
            size="sm"
            disableUnderline
            sx={{ borderRadius: 'lg', p: 0 }}
            >
            <Tab
                disableIndicator
                orientation="vertical"
            >
                <Link href="/" className="p-1" >
                    <ListItemDecorator>
                    <HomeRounded />
                    </ListItemDecorator>
                </Link>
            </Tab>
            <Tab
                disableIndicator
                orientation="vertical"
            >
                <Link href="/" className="p-1" >
                    <ListItemDecorator>
                    <FavoriteBorder />
                    </ListItemDecorator>
                </Link>
            </Tab>
            <Tab
                disableIndicator
                orientation="vertical"
            >
                <Link href="/products" >
                    <ListItemDecorator>
                    <StackedBarChart />
                    </ListItemDecorator>
                </Link>
            </Tab>
            <Tab
                disableIndicator
                orientation="vertical"
            >
                <Link href="/contactus" className="p-1" >
                    <ListItemDecorator>
                    <Phone />
                    </ListItemDecorator>
                </Link>
            </Tab>
            <Tab
                disableIndicator
                orientation="vertical"
            >
                <Link href="signin" >
                    <ListItemDecorator>
                    <Login />
                    </ListItemDecorator>
                </Link>
            </Tab>
            </TabList>
        </Tabs>
        </Box>
    </div>

        
        </>
    );
}

export default NavigationBarMobile;