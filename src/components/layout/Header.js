"use client";

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import { Alert, Dialog } from "@mui/material";
import {
  ChatOutlined,
  CloseRounded,
  Favorite,
  LoginOutlined,
  Logout,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

import Link from "next/link";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { Modal } from "@mui/joy";
import axios from "axios";
import Image from "next/image";
import "../styles/LandingPageStyles/style.css";
import HeaderDropMenu from "../templates/HeaderDropMenu";
import SearchPartHeader from "../templates/SearchPartHeader";
import { useSelector } from "react-redux";

export default function Header() {
  const cookie = new Cookies();
  const Au = cookie.get("tokenDastResi");
  const route = useRouter();
  const url = process.env.NEXT_PUBLIC_URL;
  const userData = useSelector((state) => state.userData?.value)
  console.log(userData)


  const [anchorEl, setAnchorEl] = React.useState(null);

  const [name, setName] = React.useState("");
  const [family, setFamily] = React.useState("");

  const [alert, setAlert] = React.useState(false);

  const [addressError, setAddressError] = React.useState(false);
  const [infoError, setInfoError] = React.useState(false);
  const [triggered, setTriggered] = React.useState(0);
  const [openSearchDialog, setOpenSearchDialog] = React.useState(false);

  async function getUSer(Auth) {
    await axios
      .get(`${url}/register/current_user`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${Auth}`,
        },
      })
      .then((response) => {
        setName(response?.data.data[0].name);
        setFamily(response?.data.data[0].family);
        if (cookie.get("role") !== "admin" && cookie.get("role") !== "client") {
          if (response?.data.data[0]?.address.length == 0) {
            setTimeout(() => {
              setAddressError(true);
              setAlert(true);
            }, 3000);
          }
          if (
            response?.data.data[0].name == "" ||
            response?.data.data[0].name == null ||
            response?.data.data[0].shop_name == ""
          ) {
            setTimeout(() => {
              setInfoError(true);
              setAlert(true);
            }, 3000);
          }
        }
      })
      .catch((error) => {
        console.log("Error on getting current user");
      });
  }

  React.useEffect(() => {
    setTimeout(() => {
      getUSer(Au);
    }, 250);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogout() {
    cookie.remove("tokenDastResi");
    cookie.remove("role");
    cookie.remove("welcommed");
    handleCloseUserMenu();
    setTimeout(() => {
      window?.location?.reload();
    }, 800);
    setTimeout(() => {
      window?.location?.replace("/");
    }, 1400);
  }

  return (
    <>
      <div className="w-full !min-h-[90px] !max-h-[90px] overflow-hidden">
        <nav className="navbar navbar-expand-lg flex flex-row justify-around w-full items-center !fixed z-[200] backdrop-blur-xl md:border-none border-b border-asliLight ">
          <Link
            className="md:flex hidden w-3/12 flex-row justify-center items-center  gap-0"
            href="/"
          >
            <Image
              src="/images/main-header-logo.png"
              width={110}
              height={110}
              className="m-1"
            />
            <h1 className="font-bold text-3xl text-asliDark">آرپوت مارکت </h1>
          </Link>

          <Link className="md:hidden block w-6/12" href="/">
            <Image
              src="/images/main-header-logo.png"
              width={90}
              height={90}
              className="m-auto"
            />
          </Link>

          <div className="flex flex-row items-center gap-1 justify-around px-6 w-full ">
            <ul className="navbar-nav mx-auto flex flex-row justify-center md:!bg-transparent !shadow-none !bg-transparent w-5/12 ">
              <li className="nav-item md:block hidden">
                <Link href="/" className="hover:text-asliLight nav-link ">
                  {" "}
                  خانه{" "}
                </Link>
              </li>

              <li className="nav-item md:block hidden">
                <Link
                  href="/products"
                  className="hover:text-asliLight nav-link "
                >
                  {" "}
                  گالری
                </Link>
              </li>

              <li className="nav-item md:block hidden">
                <Link href="/weblog" className="hover:text-asliLight nav-link ">
                  {" "}
                  وبلاگ{" "}
                </Link>
              </li>

              <li className="nav-item md:block hidden">
                <Link
                  href="/aboutus"
                  className="hover:text-asliLight nav-link "
                >
                  {" "}
                  درباره ما{" "}
                </Link>
              </li>

              <li className="nav-item md:block hidden">
                <Link
                  href="/contactus"
                  className="hover:text-asliLight nav-link "
                >
                  {" "}
                  تماس با ما
                </Link>
              </li>
            </ul>

            <div className="w-4/12">
              <div className="md:block hidden">
                <SearchPartHeader />
              </div>
              <IconButton
                className="md:hidden flex bg-khas text-white hover:bg-orange-600"
                type="button"
                sx={{ p: "8px" }}
                aria-label="search"
                onClick={() => setOpenSearchDialog(true)}
              >
                <SearchIcon />
              </IconButton>
              <Dialog
                onClose={() => setOpenSearchDialog(false)}
                open={openSearchDialog}
                fullScreen
              >
                <IconButton
                  className="p-1 rounded bg-red-400 text-white mb-3 text-lg"
                  onClick={() => setOpenSearchDialog(false)}
                  
                >
                  <CloseRounded />
                </IconButton>
                <SearchPartHeader />
              </Dialog>
            </div>

            {cookie.get("tokenDastResi") ? (
              <div className="flex flex-row justify-center items-center gap-1 w-2/12">
                {cookie.get("role") !== "client" ? (
                  <div>
                    <HeaderDropMenu name={name} family={family} />
                  </div>
                ) : (
                  <>
                    <IconButton color="inherit">
                      <Link href="/profile/favorites">
                        <Favorite
                          titleAccess="علاقه مندی ها"
                          className="w-7 h-7"
                        />
                      </Link>
                    </IconButton>
                    <IconButton color="inherit">
                      <Link href="/dashboard/ticketChat">
                        <ChatOutlined
                          titleAccess="چت با پشتیبانی"
                          className="w-7 h-7"
                        />
                      </Link>
                    </IconButton>
                    <IconButton onClick={() => handleLogout()} color="inherit">
                      <Logout
                        titleAccess=" خروج "
                        className="w-7 h-7 text-red-500 hover:text-red-700"
                      />
                    </IconButton>
                  </>
                )}
              </div>
            ) : (
              <ul className="navbar-nav md:!bg-transparent !shadow-none !bg-transparent md:w-1/12 w-4/12">
                <li class="nav-item">
                  <Link
                    href="/signin"
                    className="border-b-4 pb-1 border-black border-dotted rounded-sm hover:border-khas transition-all duration-200"
                  >
                    {" "}
                    <PersonOutlineOutlined className="text-2xl w-10 h-10" />{" "}
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>

      <Modal
        open={alert}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        // disableEscapeKeyDown= "true"
        className="m-auto text-center md:!w-[40vw] !w-[80vw] "
      >
        <Alert
          variant="filled"
          severity="error"
          className="flex flex-col justify-center items-center w-full "
        >
          <p className="text-2xl"> ابتدا اطلاعات زیر را تکمیل کنید </p>

          <div className="flex md:flex-row flex-col gap-4 justify-center items-center mt-5 ">
            {infoError && (
              <Link
                onClick={() => setAlert(false)}
                href="/profile"
                className="rounded-xl p-4 bg-khas text-white hover:bg-orange-600 cursor-pointer "
              >
                تکمیل پروفایل
              </Link>
            )}
            {addressError && (
              <Link
                onClick={() => setAlert(false)}
                href="/profile/updateAddress"
                className="rounded-xl p-4 bg-khas text-white hover:bg-orange-600 cursor-pointer "
              >
                تکمیل آدرس
              </Link>
            )}
          </div>
        </Alert>
      </Modal>
    </>
  );
}
