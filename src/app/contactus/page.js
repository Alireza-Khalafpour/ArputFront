"use client";

import GeneralLoader from "@/components/module/GeneralLoader";
import {
  Facebook,
  Instagram,
  Newspaper,
  Send,
  Telegram,
  WhatsApp,
} from "@mui/icons-material";
import { Alert, Input, Snackbar, Textarea } from "@mui/joy";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import axios from "axios";
import { useEffect, useState } from "react";

function ContactUs() {

  const url = process.env.NEXT_PUBLIC_URL


  const [message, setMessage] = useState();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [content, setContent] = useState();
  const [info, setInfo] = useState();
  const [number, setNumber] = useState();
  const [number2, setNumber2] = useState();

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  // ارسال اطلاعات فرم ارتباط با ما --------------

  function MakeContact() {
    setLoading(true);
    if (phone !== "" && phone.length == 11 && email !== "" && content !== "") {
      axios
        .post(
          `${url}/contact_us_form/create`,
          {
            mobile: phone,
            email: email,
            content: content,
          },
          {
            headers: headers,
          }
        )
        .then((response) => {
          if (response.data.Done === true) {
            setAlert(true);
            setMessage(response.data.Message);
            setAddCategoryModal(false);
          }
        })
        .catch(function (error) {
          setMessage(" متاسفیم،خطایی رخ داده است ");
          setErrorAlert(true);
          console.log(error, "Error");
        });
      setPhone("");
      setContent("");
      setEmail("");
      setLoading(false);
    } else {
      setMessage(" فیلد ها را به درستی تکمیل کنید ");
      setErrorAlert(true);
      setLoading(false);
    }
  }

  // دریافت داده برای صفحه ارتباط با ما--------------

  useEffect(() => {
    axios
      .get(`${url}/contact_us/show`, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setInfo(response?.data);
        setNumber(response?.data?.mobile[0]);
        setNumber2(response?.data?.tel[0]);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  }, []);

  const myArray = number?.split("");
  let newString = "";
  for (let i = 4; i < myArray?.length; i++) {
    newString = newString?.concat(myArray[i]);
  }
  const myArray2 = number2?.split("");
  let newString2 = "";
  for (let i = 4; i < myArray2?.length; i++) {
    newString2 = newString2?.concat(myArray2[i]);
  }

  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5549.386359235215!2d52.46493949044171!3d29.722570322303692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fb21a115caa0311%3A0xc9f48e432ab44733!2zRmFycyBQcm92aW5jZSwgU2hpcmF6LCBEaXN0cmljdCAxMNiMINm-2KfYsdqpINi52YTZhSDZiCDZgdmG2KfZiNix24wg2YHYp9ix2LMsIElyYW4!5e0!3m2!1sen!2sfr!4v1704699095426!5m2!1sen!2sfr"
        className="w-full h-full md:block hidden "
        allowfullscreen=""
        loading="lazy"
      ></iframe>

      <div className="md:absolute md:w-1/3 w-full h-full flex flex-col justify-center p-4 items-center gap-12 bg-gradient-to-b from-asliDark to-blue-800 rounded-xl mt-10 left-2">
        <h3 className="text-white text-2xl border-b-2 p-1 border-khas ">
          {" "}
          فرم ارتباط با ما{" "}
        </h3>

        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-[90%]"
          placeholder=" شماره تماس "
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="w-[90%]"
          placeholder=" ایمیل "
        />

        <Textarea
          className="w-[90%] min-h[600px]"
          minRows={5}
          placeholder="پیام خود را اینجا وارد کنید"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="w-1/3 p-3 bg-khas text-white rounded-2xl text-xl hover:animate-pulse "
          onClick={() => MakeContact()}
        >
          {" "}
          {loading ? (
            <GeneralLoader />
          ) : (
            <div>
              <Send /> ارسال{" "}
            </div>
          )}{" "}
        </button>

        <div className="flex flex-row justify-between items-center gap-4">
          <span className="w-12 h-12 rounded-full flex justify-center items-center border-2 border-white hover:text-khas text-white hover:bg-paszamine1 m-auto cursor-pointer transition-all duration-100">
            {" "}
            <Instagram />{" "}
          </span>
          <span className="w-12 h-12 rounded-full flex justify-center items-center border-2 border-white hover:text-blue-600 text-white hover:bg-paszamine1 m-auto cursor-pointer transition-all duration-100">
            {" "}
            <Facebook />{" "}
          </span>
          <span className="w-12 h-12 rounded-full flex justify-center items-center border-2 border-white hover:text-green-600  text-white hover:bg-paszamine1 m-auto cursor-pointer transition-all duration-100">
            {" "}
            <WhatsApp />{" "}
          </span>
          <span className="w-12 h-12 rounded-full flex justify-center items-center border-2 border-white hover:text-blue-700 text-white hover:bg-paszamine1 m-auto cursor-pointer transition-all duration-100">
            {" "}
            <Telegram />{" "}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <p className="text-white ">
            {" "}
            شماره تماس : <span>{digitsEnToFa(newString)}</span>
            <span>{digitsEnToFa("-98+")}</span>{" "}
          </p>
          <p className="text-white text-base">
            {" "}
            تلفن : <span>{digitsEnToFa(newString2)}</span>
            <span>{digitsEnToFa("-98+")}</span>{" "}
          </p>
          <p className="text-white text-base"> ایمیل : {info?.email[0]} </p>
          <p className="text-white text-base"> آدرس : {info?.address[0]} </p>
        </div>
      </div>

      <Snackbar
        open={alert}
        autoHideDuration={4000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        className="bg-green-700"
      >
        <Alert
          variant="filled"
          severity="success"
          className="text-lg text-white font-semibold bg-green-700 "
        >
          {" "}
          {message}{" "}
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorAlert}
        autoHideDuration={4000}
        onClose={() => setErrorAlert(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        className="bg-rose-700"
      >
        <Alert
          variant="filled"
          severity="error"
          className="text-lg text-white font-semibold bg-rose-700 "
        >
          {" "}
          {message}{" "}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ContactUs;
