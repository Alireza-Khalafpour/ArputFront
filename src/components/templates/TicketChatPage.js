"use client";

import { useEffect, useState } from "react";
import {
  Add,
  AddRounded,
  CommentOutlined,
  Mail,
  Subject,
  Telegram,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Textarea,
  Typography,
} from "@mui/joy";
import {
  Alert,
  Autocomplete,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  TextField,
} from "@mui/material";
import * as shamsi from "shamsi-date-converter";
import axios from "axios";
import Cookies from "universal-cookie";
import TicketHistorySidebar from "../module/TicketHistorySidebar";
import { digitsEnToFa } from "@persian-tools/persian-tools";

const TicketChatPage = () => {
  const cookie = new Cookies();
  const Auth = cookie.get("tokenDastResi");
  const url = process.env.NEXT_PUBLIC_URL;

  const addEmoji = (emoji) => () => setContent(`${content}${emoji}`);
  const [departmentList, setDepartmentList] = useState([]);
  // ----------------
  const [message, setMessage] = useState();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  // ----------------
  const [departmentId, setDepartmentId] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [factoryId, setFactoryId] = useState("");
  const [factoryList, setfactoryList] = useState([]);
  const [enteryError, setEnteryError] = useState(false);
  // ---------------
  const [subResponse, setSubResponse] = useState("");
  const [resetChat, setResetChat] = useState(0);

  // get userId -------------------------------------

  async function getUSer(Au) {
    await axios
      .get(`${url}/register/current_user`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${Au}`,
        },
      })
      .then((response) => {
        setUserId(response.data.data[0].id);
      })
      .catch((error) => {
        console.log("Error on getting current user");
      });
  }

  // Get Departments list -----------------
  async function GetDepartmentList(Au) {
    await axios
      .get(`${url}/department/all_department`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${Au}`,
        },
      })
      .then((response) => {
        setDepartmentList(response.data.data);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  }

  // fetch factory list --------------------
  async function GetFactoryList() {
    await axios
      .get(`${url}/template/brand/data`)
      .then((response) => {
        setfactoryList(response.data.data);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  }

  useEffect(() => {
    const Auth = cookie.get("tokenDastResi");
    GetDepartmentList(Auth);
    getUSer(Auth);
    GetFactoryList();
  }, []);

  useEffect(() => {
    const Auth = cookie.get("tokenDastResi");
    GetDepartmentList(Auth);
    getUSer(Auth);
    GetFactoryList();
  }, [resetChat]);

  // send Ticket api  -------------------------
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${Auth}`,
    "Content-Type": "application/json",
  };

  async function SendTicket() {
    console.log(departmentId);
    if (subject != "" && departmentId != "" && departmentId != null) {
      setLoading(true);
      await axios
        .post(
          `${url}/ticket/create`,
          {
            subject: subject,
            content: content,
            department_id: departmentId,
            factory_id: factoryId,
            file: "",
          },
          {
            headers: headers,
          }
        )
        .then((response) => {
          if (response.data.Done === true) {
            setAlert(true);
            setMessage(response.data.Message);
          } else {
            setMessage(response.data.Message);
            setErrorAlert(true);
          }
        })
        .catch(function (error) {
          setMessage(" متاسفیم،خطایی رخ داده است ");
          setErrorAlert(true);
        });

      setDepartmentId("");
      setSubject("");
      setContent("");
    } else {
      setEnteryError(true);
      setMessage(" فیلد های ورودی را به درستی تکمیل کنید ");
      setErrorAlert(true);
    }
  }

  // Respond to an existing ticket-----------------------------
  async function RespondTicket() {
    setLoading(true);
    await axios
      .patch(
        `${url}/ticket/update_sub_response`,
        {
          id: subResponse?.id,
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
        } else {
          setMessage(response.data.Message);
          setErrorAlert(true);
        }
      })
      .catch(function (error) {
        setMessage(" متاسفیم،خطایی رخ داده است ");
        setErrorAlert(true);
      });

    setDepartmentId("");
    setSubject("");
    setContent("");
  }

  // reset all feilds -----------------
  const ResetAll = () => {
    setSubResponse("");
    setResetChat(1);
    document.getElementById("departments").focus();
    document.getElementById("departments").offsetTop(0);
  };

  return (
    <>
      <div className="flex flex-row justify-center items-start gap-4 border-2 rounded-xl ">
        <div className="flex flex-col gap-5 text-center w-1/4">
          <div className="w-full border-2 border-paszamine2 rounded-xl flex-col flex justify-center items-center gap-6 pb-7 ">
            <h3 className="text-lg text-white bg-khas w-full px-2 py-5 rounded-t-xl text-center ">
              {" "}
              مشخصات تیکت{" "}
            </h3>

            <Autocomplete
              className="md:w-3/4 w-full "
              noOptionsText=" داده ای موجود نیست "
              id="departments"
              options={departmentList}
              getOptionLabel={(i) => i.dep_name}
              onChange={(event, val) => {
                setDepartmentId(val.id);
                setEnteryError(false);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  error={enteryError}
                  helperText=" دپارتمان را انتخاب کنید "
                  label=" ارسال به دپارتمان "
                  dir="rtl"
                />
              )}
            />

            <TextField
              className="md:w-3/4 w-full "
              label=" موضوع تیکت "
              placeholder=" موضوع تیکت "
              error={enteryError}
              helperText="موضوع را مشخص کنید"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setEnteryError(false);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <Subject className="text-asliLight" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />

            <Autocomplete
              className="md:w-3/4 w-full "
              noOptionsText=" داده ای موجود نیست "
              id="factories"
              options={factoryList}
              getOptionLabel={(i) => i.brand_name}
              onChange={(event, val) => setFactoryId(val.brand_id)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label=" ارسال به کارخانه "
                  dir="rtl"
                />
              )}
            />
          </div>
          <ListItem
            onClick={() => ResetAll()}
            className="mb-5 w-3/4 rounded-xl border border-gray-600 p-1 mx-auto bg-blue-200 hover:bg-blue-300 cursor-pointer flex flex-row justify-between "
            disableGutters
          >
            <span> ایجاد تیکت جدید </span>

            <AddRounded />
          </ListItem>
          <TicketHistorySidebar
            setResetChat={setResetChat}
            alert={alert}
            setSubResponse={setSubResponse}
          />
        </div>

        <div className="flex flex-col relative w-3/4 h-screen border-2 border-paszamine2 border-paszamine rounded-xl ">
          <div
            id="chatHeader"
            className="flex flex-row justify-between rounded-lg items-center p-3 bg-asliLight "
          >
            <div className="text-white text-xl mr-8">
              {" "}
              {subResponse?.department}{" "}
            </div>
            <Avatar size="lg" variant="soft" className="ml-8" />
          </div>
          <div className="p-4 flex flex-col gap-4 w-full overflow-y-scroll overflow-x-hidden">
            <div className={`p-2 flex w-full justify-start `}>
              <div className={` w-[70%] bg-blue-200 rounded-xl p-2`}>
                {subResponse?.content}
                <div
                  className={`w-full bg-blue-200  rounded-b-xl px-3 text-left`}
                >
                  <p className="pt-3">
                    {" "}
                    {subResponse?.created_at
                      ? digitsEnToFa(subResponse?.created_at.split(" ")[1])
                      : ""}{" "}
                    |{" "}
                    {subResponse?.created_at
                      ? digitsEnToFa(
                          shamsi
                            .gregorianToJalali(subResponse?.created_at)
                            .join("/")
                        )
                      : ""}
                  </p>
                </div>
              </div>
              <Divider />
            </div>

            {subResponse?.sub_response?.map((i) => (
              <div
                className={`p-2 flex w-full ${
                  i?.role === "کارخانه" ? `justify-start` : `justify-end`
                } last:mb-48 `}
              >
                <div
                  className={` p-2 w-[70%] ${
                    i?.role === "کارخانه" ? "bg-blue-200" : "bg-orange-200"
                  } rounded-xl`}
                >
                  {i.content}
                  <div
                    className={`w-full ${
                      i?.role === "کارخانه" ? "bg-blue-200" : "bg-orange-200"
                    } rounded-b-xl px-3 text-left`}
                  >
                    <p className="pt-3">
                      {" "}
                      {i?.updated_at
                        ? digitsEnToFa(i?.updated_at.split(" ")[1])
                        : ""}{" "}
                      |{" "}
                      {i?.updated_at
                        ? digitsEnToFa(
                            shamsi.gregorianToJalali(i?.updated_at).join("/")
                          )
                        : ""}
                    </p>
                  </div>
                </div>
                <Divider />
              </div>
            ))}
          </div>

          <div id="footer" className="absolute bottom-16 w-full h-20 border">
            <Textarea
              placeholder=" اینجا بنویسید... "
              value={content}
              onChange={(event) => setContent(event.target.value)}
              minRows={2}
              maxRows={5}
              startDecorator={
                <div className="flex flex-row gap-1">
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("👍")}
                  >
                    👍
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("🏖")}
                  >
                    🏖
                  </IconButton>
                  <IconButton
                    variant="outlined"
                    color="neutral"
                    onClick={addEmoji("😍")}
                  >
                    😍
                  </IconButton>
                  <Button
                    variant="outlined"
                    color="neutral"
                    sx={{ ml: "auto" }}
                  >
                    <Add />
                  </Button>
                </div>
              }
              endDecorator={
                <div className="w-full flex flex-row justify-between">
                  <Typography
                    sx={{ ml: "auto" }}
                    className="bg-paszamine2 text-center items-center my-auto"
                  >
                    {content.length} تعداد کاراکتر
                  </Typography>
                  {subResponse == "" ? (
                    <button
                      onClick={() => SendTicket()}
                      className="p-3 flex flex-row w-20 rounded-xl bg-khas text-paszamine1 hover:bg-orange-500 hover:font-bold   "
                    >
                      {" "}
                      <Telegram /> ارسال{" "}
                    </button>
                  ) : (
                    <button
                      onClick={() => RespondTicket()}
                      className="p-3 flex flex-row w-20 rounded-xl bg-asliLight text-paszamine1 hover:bg-blue-600 hover:font-bold   "
                    >
                      {" "}
                      <Telegram /> پاسخ{" "}
                    </button>
                  )}
                </div>
              }
              sx={{ minWidth: 300 }}
            />
          </div>
        </div>
      </div>

      <Snackbar
        open={alert}
        autoHideDuration={4000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        se
      >
        <Alert
          variant="filled"
          severity="success"
          className="text-lg text-white font-semibold"
        >
          {" "}
          {message}{" "}
        </Alert>
      </Snackbar>

      <Snackbar
        open={errorAlert}
        autoHideDuration={4000}
        onClose={() => setErrorAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        se
      >
        <Alert
          variant="filled"
          severity="error"
          className="text-lg text-white font-semibold"
        >
          {" "}
          {message}{" "}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TicketChatPage;
