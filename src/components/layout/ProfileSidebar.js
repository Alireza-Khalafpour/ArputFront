
import { Face6, FavoriteBorder, HomeMax, NotificationsNone, Settings } from "@mui/icons-material";
import { Badge } from "@mui/joy";
import { Divider, Drawer, List, ListItem } from "@mui/material";
import Link from "next/link";

const ProfileSidebar = ({children}) => {
    return (
        <div className="w-full flex flex-row justify-center gap-3">

            <div className="w-1/6" >
                <List className="border-l-2 border-paszamine2 h-[100vh] font-extrabold">

                    <h1 className="w-full text-center py-12 md:text-2xl text-lg" > پروفایل </h1>

                    <ListItem disablePadding focusRipple className="mb-6" >
                    <Link href="/profile" className='  w-full shadow-none border-l-4 hover:border-khas hover:bg-paszamine2 text-paszamine3 hover:text-black transition-all duration-200 flex justify-start mr-4 cursor-pointer p-4  rounded-md gap-2' >
                        <Face6 />
                        <span className="md:block hidden" > اطلاعات کاربر </span>
                    </Link>
                    </ListItem>
                    <ListItem disablePadding focusRipple className="mb-6" >
                    <Link href="/profile" className='  w-full shadow-none border-l-4 hover:border-khas hover:bg-paszamine2 text-paszamine3 transition-all duration-200 flex justify-start mr-4 cursor-pointer p-4 rounded-md gap-2' >
                        <FavoriteBorder />
                        <span className="md:block hidden" > لیست علاقه مندی ها </span>
                    </Link>
                    </ListItem>
                    <ListItem disablePadding focusRipple className="mb-6" >
                    <Link href="/profile" className='  w-full shadow-none border-l-4 hover:border-khas hover:bg-paszamine2 text-paszamine3 transition-all duration-200 flex justify-start mr-4 cursor-pointer p-4 rounded-md gap-2' >
                        <Settings />
                        <span className="md:block hidden" > تنظیمات </span>
                    </Link>
                    </ListItem>
                    <ListItem disablePadding focusRipple className="mb-6" >
                    <Link href="/profile" className='  w-full shadow-none border-l-4 hover:border-khas hover:bg-paszamine2 text-paszamine3 transition-all duration-200 flex justify-start mr-4 cursor-pointer p-4 rounded-md gap-2' >
                        <Badge color="warning" >
                            <NotificationsNone />
                        </Badge>
                        <span className="md:block hidden" > اعلان ها </span>
                    </Link>
                    </ListItem>


                </List>
            </div>

            
            <div className="w-5/6" >
                {children}
            </div>
        </div>
    );
}

export default ProfileSidebar;