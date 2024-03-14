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

    window.addEventListener("scroll", HideShowNavbar)
    window.addEventListener("scrollend", OnScrollEnd)

    function HideShowNavbar(){
        if(window.scrollY > scrollDirection){
            setShowNav(false)
        }else{
            setShowNav(true)
        }
    }

    function OnScrollEnd(){
        setScrollDirection(window.scrollY)
    }

    const [index, setIndex] = useState(0);
    const colors = ['primary', 'danger', 'success', 'warning'];
    
    // ---------------------------------


    return (
        <>
    

            {/* <div className="z-40 bottom-0 fixed">
                        <div className="navigation relative w-full h-[70px] bg-asliDark justify-center items-center rounded-lg sm:hidden flex " >
                            <ul className="flex w-full" >
                                <li onClick={() => handleClickLink(1)} className={`list w-[75px] h-[70px] list-none text-white ${activeList == 1 ? "active" : null}`}  >
                                    <Link href="/" className="relative flex justify-center items-center flex-col text-center font-semibold w-full" >
                                        <span className="icon z-10 relative block line leading-[75px] mx-auto text-center transition duration-500 text-white " > <Home className="text-3xl" /> </span>
                                        <span className="textt absolute font-normal text-[1.1rem] transition-all duration-500 opacity-0 translate-y-5 text-white " > خانه </span>
                                    </Link>
                                </li>
            
                                <li onClick={() => handleClickLink(2)} className={`list w-[75px] h-[70px] list-none text-white ${activeList == 2 ? "active" : null}`} >
                                    <Link href="/contactus" className="relative flex justify-center items-center flex-col text-center font-semibold w-full" >
                                        <span className="icon z-10 relative block line leading-[75px] mx-auto text-center transition duration-500 text-white " > <Phone className="text-3xl" /> </span>
                                        <span className="textt absolute font-normal text-[1.1rem] transition-all duration-500 opacity-0 translate-y-5 text-white " > تماس با ما </span>
                                    </Link>
                                </li>
            
                                <li onClick={() => handleClickLink(3)} className={`list w-[75px] h-[70px] list-none text-white ${activeList == 3 ? "active" : null}`} >
                                    <Link href="/products" className="relative flex justify-center items-center flex-col text-center font-semibold w-full" >
                                        <span className="icon z-10 relative block line leading-[75px] mx-auto text-center transition duration-500 text-white " > <StackedBarChart className="text-3xl" /> </span>
                                        <span className="textt absolute font-normal text-[1.1rem] transition-all duration-500 opacity-0 translate-y-5 text-white " > گالری </span>
                                    </Link>
                                </li>
            
                                <li onClick={() => handleClickLink(4)} className={`list w-[75px] h-[70px] list-none text-white ${activeList == 4 ? "active" : null}`} >
                                    <Link href="" className="relative flex justify-center items-center flex-col text-center font-semibold w-full" >
                                        <span className="icon z-10 relative block line leading-[75px] mx-auto text-center transition duration-500 text-white " > <Download className="text-3xl" /> </span>
                                        <span className="textt absolute font-normal text-[1.1rem] transition-all duration-500 opacity-0 translate-y-5 text-white " > اپ آرپوت </span>
                                    </Link>
                                </li>
            
                                <li onClick={() => handleClickLink(5)} className={`list w-[75px] h-[70px] list-none text-white ${activeList == 5 ? "active" : null}`} >
                                    <Link href="/signin" className="relative flex justify-center items-center flex-col text-center font-semibold w-full" >
                                        <span className="icon z-10 relative block line leading-[75px] mx-auto text-center transition duration-500 text-white " > <Login className="text-3xl" /> </span>
                                        <span className="textt absolute font-normal text-[1.1rem] transition-all duration-500 opacity-0 translate-y-5 text-white " > ورود </span>
                                    </Link>
                                </li>
            
            
                                <div className="indicator absolute top-[-50%] w-[70px] h-[70px] bg-khas rounded-full border-[7px] border-paszamine1 transition-all duration-700 " ></div>
            
                            </ul>
                        </div>
                    </div> */}

            
            {/* <div className="z-40 right-0 fixed">
                <aside className="h-screen" >
                    <nav className="h-full flex flex-col border-l shadow-sm" >

                        <ul className="flex-1 px-3 w-20 flex flex-col items-center" >
                            <li>
                                <Home/>
                            </li>
                            <li>
                                <Phone/>
                            </li>
                            <li>
                                <StackedBarChart/>
                            </li>
                            <li>
                                <Download/>
                            </li>
                            <li>
                                <Login/>
                            </li>
                        </ul>

                    </nav>
                </aside>
            </div> */}

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
                // [`&:not(.${tabClasses.selected}):not(:hover)`]: {
                // opacity: 0.85,
                // },
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