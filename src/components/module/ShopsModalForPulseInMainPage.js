"use client";

import {
  ArrowOutwardOutlined,
  AspectRatio,
  Favorite,
  Share,
} from "@mui/icons-material";
import { Alert, CardOverflow, IconButton, Snackbar } from "@mui/joy";
import axios from "axios";
import React, { useState } from "react";
import Cookies from "universal-cookie";
import GeneralLoader from "./GeneralLoader";
import {
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  Rating,
  Slide,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { addCommas, digitsEnToFa } from "@persian-tools/persian-tools";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShopsModalForPulseInMainPage = ({
  shops,
  displayStores,
  setDisplayStore,
  loading,
  pre_product_id,
}) => {
  const cookie = new Cookies();
  const url = process.env.NEXT_PUBLIC_URL
  const route = useRouter();
  const Auth = cookie.get("tokenDastResi") || null;

  const [message, setMessage] = useState();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${Auth}`,
    "Content-Type": "application/json",
  };


  async function CreatePulse(i) {
    await axios
      .post(`${url}/pulse/create`, {
        product_id: i.product_id,
        pre_product_id: pre_product_id,
        shop_id: i.seller_id,
        mac_address: "",
        ar_pulse: false,
        ip_address: cookie.get("UniqueID"),
      })
      .then((response) => {
        console.log(response);
        setTimeout(() => {
          route.push(`/products/${pre_product_id}`);
        }, 200);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Dialog
        fullWidth="true"
        maxWidth="xl"
        TransitionComponent={Transition}
        open={displayStores}
        onClose={() => setDisplayStore(false)}
      >
        <DialogTitle className="bg-slate-100 w-full text-center mx-auto">
          {" "}
          فروشگاه مورد نظر را انتخاب کنید{" "}
        </DialogTitle>
        <DialogContent className="flex flex-row items-center gap-5 bg-slate-100 overflow-x-scroll">
          {loading ? (
            <div>
              {" "}
              <GeneralLoader />{" "}
            </div>
          ) : (
            shops.map((i) => (
              <Card
                onClick={() => CreatePulse(i)}
                className="md:w-1/6 w-3/4 h-[200px] hover:shadow-2xl cursor-pointer"
              >
                <div className=" w-full h-full">
                  <CardOverflow>
                    <AspectRatio>
                      <image
                        // src={i.products_image[0]}
                        loading="lazy"
                        alt=""
                      />
                    </AspectRatio>
                  </CardOverflow>
                  <CardContent className="gap-3 m-auto text-right p-1 h-full w-full flex flex-col justify-center">
                    <span endDecorator={<ArrowOutwardOutlined />}>
                      فروشگاه {i.seller_name}
                    </span>
                    <div className="flex flex-row gap-1 items-center">
                      {" "}
                      <Rating value={3} readOnly />{" "}
                    </div>
                    <div className="p-1 text-black">
                      {digitsEnToFa(addCommas(i.price))} ریال
                    </div>
                    <Typography
                      className="w-full flex-nowrap text-nowrap !overflow-hidden"
                      level="body-sm"
                    >
                      {i.description}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            ))
          )}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={alert}
        autoHideDuration={4000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        className="bg-green-700 z-[300]"
        se
      >
        <Alert
          variant="filled"
          className="text-lg text-white font-semibold bg-green-700 text-center z-[300] "
        >
          {" "}
          {message} <Favorite className="text-rose-600" />{" "}
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorAlert}
        autoHideDuration={4000}
        onClose={() => setErrorAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        className="bg-rose-900 z-[300]"
        se
      >
        <Alert
          variant="filled"
          className="text-lg text-white font-semibold bg-rose-900 text-center z-[300]"
        >
          {" "}
          {message}{" "}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ShopsModalForPulseInMainPage;
