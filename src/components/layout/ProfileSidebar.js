
import { Face6, FavoriteBorder, HomeMax, NotificationsNone, Settings } from "@mui/icons-material";
import { Divider, Drawer, List, ListItem } from "@mui/material";
import Link from "next/link";

const ProfileSidebar = ({children}) => {
    return (
        <div className="w-full flex flex-row justify-center gap-3">

            <div className="w-1/6" >
                <List className="border-l-2 border-paszamine2 h-[100vh] font-extrabold">

                    <h1 className="w-full text-center py-12 text-2xl" > پرفایل </h1>

                    <ListItem disablePadding focusRipple className="mb-6" >
                    <Link href="/profile" className='  w-full shadow-none border-l-4 hover:border-khas hover:bg-paszamine2 text-paszamine3 hover:text-black transition-all duration-200 flex justify-start mr-4 cursor-pointer p-4  rounded-md gap-2' >
                        <Face6 />
                        <span> اطلاعات کاربر </span>
                    </Link>
                    </ListItem>
                    <ListItem disablePadding focusRipple className="mb-6" >
                    <Link href="/profile" className='  w-full shadow-none border-l-4 hover:border-khas hover:bg-paszamine2 text-paszamine3 transition-all duration-200 flex justify-start mr-4 cursor-pointer p-4 rounded-md gap-2' >
                        <FavoriteBorder />
                        <span> لیست علاقه مندی ها </span>
                    </Link>
                    </ListItem>
                    <ListItem disablePadding focusRipple className="mb-6" >
                    <Link href="/profile" className='  w-full shadow-none border-l-4 hover:border-khas hover:bg-paszamine2 text-paszamine3 transition-all duration-200 flex justify-start mr-4 cursor-pointer p-4 rounded-md gap-2' >
                        <Settings />
                        <span> تنظیمات </span>
                    </Link>
                    </ListItem>
                    <ListItem disablePadding focusRipple className="mb-6" >
                    <Link href="/profile" className='  w-full shadow-none border-l-4 hover:border-khas hover:bg-paszamine2 text-paszamine3 transition-all duration-200 flex justify-start mr-4 cursor-pointer p-4 rounded-md gap-2' >
                        <NotificationsNone />
                        <span> اعلان ها </span>
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