"use client";

import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
  Alert,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Snackbar,
  TextField,
} from "@mui/material";
import Cookies from "universal-cookie";
import { Close, CloudUpload, Delete, Telegram } from "@mui/icons-material";
import axios from "axios";
import { Textarea } from "@mui/joy";

const WeblogContent = () => {
  const editorRef = useRef(null);
  const url = process.env.NEXT_PUBLIC_URL;

  // snackbar and alert states----------------------------------
  const [message, setMessage] = useState();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  // Add image and show address in modal-------------------------
  const [imageL, setImage] = useState();
  const [imageForUpload, setImageForUpload] = useState();
  const [fileName, setFileName] = useState("فایلی انتخاب نشده...");
  // ----------
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [addressModal, setAddressModal] = useState(false);

  const DeleteImg = () => {
    setFileName("فایلی انتخاب نشده...");
    setImage();
    setImageForUpload();
    setImgUrl();
    setPreProductData({ ...preProductData, image_url: "" });
  };

  // Drag and Drop image ---------------------------

  function DragHandler(e) {
    e.preventDefault();
  }

  function DropHandler(e) {
    e.preventDefault();
    setImage(e.dataTransfer.files[0]);
  }

  const cookie = new Cookies();

  const Auth = cookie.get("tokenDastResi");

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${Auth}`,
    "Content-Type": " multipart/form-data",
  };

  const formData = new FormData();

  // upload image and copy URL to tinyMCE code editor --------------------
  async function handleImageUpload() {
    formData.append("file", imageForUpload);

    setLoading(true);
    await axios
      .post(
        `${url}/upload/upload_texture`,
        formData,
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.Done == true) {
          setAddress(response?.data.address);
          setAddressModal(true);
        } else {
          setAddressModal(false);
        }
      })
      .catch((error) => {
        console.log(error, "Error");
      });
    setLoading(false);
  }

  // handle article data and post data -----------------------------

  const [articleData, setArticleData] = useState({
    main_title: "",
    summary_content: "",
    main_content: "",
    tags: "",
    active: true,
  });

  const HandleCreateBlog = (e) => {
    switch (e?.target?.id) {
      case "title":
        setArticleData({ ...articleData, main_title: e.target.value });
        break;
      // case "summary-con":
      //   setArticleData({ ...articleData, summary_content: e.target.value })
      //   break;
      case "main-content":
        setArticleData({
          ...articleData,
          main_content: editorRef.current.getContent(),
        });
        break;
      case "tags":
        setArticleData({ ...articleData, tags: e.target.value });
        break;
    }
  };

  const headersCreateBlog = {
    accept: "application/json",
    Authorization: `Bearer ${Auth}`,
    "Content-Type": "application/json",
  };

  async function CreateBlog() {
    setLoading(true);
    await axios
      .post(`${url}/panel/blogs/`, articleData, {
        headers: headersCreateBlog,
      })
      .then((response) => {
        if (response.data.Done === true) {
          console.log(response);
          setAlert(true);
          setMessage(response?.data?.Message);
          setArticleData({
            main_title: "",
            summary_content: "",
            main_content: "",
            tags: "",
            active: true,
          });
          setLoading(false);
        } else {
          setMessage(response?.data?.Message);
          setErrorAlert(true);
          setLoading(false);
        }
      })
      .catch(function (error) {
        // setMessage(" متاسفیم،خطایی رخ داده است ");
        // setErrorAlert(true);
        setLoading(false);
      });
  }

  return (
    <>
      <div className="flex flex-col justify-center w-full ">
        <div className="flex flex-col w-full ">
          <h3 className="text-xl text-khas"> عنوان مقاله </h3>
          <TextField
            onChange={(e) => HandleCreateBlog(e)}
            className="w-3/4"
            id="title"
            variant="outlined"
          />
        </div>

        <Divider className="my-6" />

        <div className="flex flex-col w-full ">
          <h3 className="text-xl text-khas"> خلاصه مقاله </h3>
          <Textarea
            minRows={5}
            className="w-3/4"
            id="summary-con"
            variant="outlined"
            onChange={(e) =>
              setArticleData({
                ...articleData,
                summary_content: e.target.value,
              })
            }
          />
        </div>

        <Divider className="my-6" />

        <div className="w-full flex flex-row justify-center items-center m-auto">
          <div className="w-3/4">
            <Editor
              onChange={(e) => HandleCreateBlog(e)}
              id="main-content"
              apiKey="5md725nosspz6b344o5vvh8a1q7bu02ibksh72czppkz9csn"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              // initialValue="<p>This is the initial content of the editor.</p>"
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            {/* <Button onClick={log}>Log editor content</Button> */}
          </div>

          <div className="w-1/4 flex flex-row justify-around items-center gap-6 my-5">
            <div>
              <form
                onClick={() => document.getElementById("fileInput").click()}
                onDragOver={(e) => DragHandler(e)}
                onDrop={(e) => DropHandler(e)}
                className="flex flex-col justify-center items-center border-2 cursor-pointer border-dashed border-asliLight w-64 h-44 rounded-3xl hover:animate-pulse"
              >
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  hidden
                  accept="image/*"
                  onChange={({ target: { files } }) => {
                    setImage(URL.createObjectURL(files[0]));
                    setImageForUpload(files[0]);
                    setFileName(files[0].name);
                  }}
                />
                {imageL ? (
                  <img
                    className="w-full h-full p-1 rounded-3xl"
                    src={imageL}
                    alt=" آپلود تصویر "
                  />
                ) : (
                  <div className="text-center">
                    <CloudUpload className="text-3xl text-asliLight" />
                    <p> انتخاب تصویر </p>
                  </div>
                )}
              </form>
              <div className="w-52 flex flex-row justify-between items-center mt-1 p-1 text-sm">
                <Delete
                  titleAccess="حذف عکس"
                  className="text-khas hover:text-orange-600 cursor-pointer"
                  onClick={() => DeleteImg()}
                />
                <p>{fileName}</p>
              </div>
              <button
                className="border rounded-xl p-1 border-1 bg-khas text-white mx-auto w-full mt-3"
                onClick={() => handleImageUpload()}
              >
                {" "}
                {loading ? <CircularProgress /> : "آپلود"}{" "}
              </button>
            </div>
          </div>
          {addressModal ? (
            <Alert
              className="mx-4 text-center absolute"
              action={
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAddressModal(false);
                    setAddress("");
                  }}
                >
                  <Close fontSize="inherit" className="mx-3" />
                </IconButton>
              }
              variant="filled"
              severity="info"
            >
              <p className="mx-10">{address}</p>
            </Alert>
          ) : null}
        </div>

        <Divider className="my-6" />

        <div className="flex flex-col w-full ">
          <h3 className="text-xl text-khas"> تگ ها </h3>
          <TextField
            className="w-3/4"
            id="tags"
            variant="outlined"
            onChange={(e) => HandleCreateBlog(e)}
          />
        </div>

        <div className="w-full flex justify-end items-center my-10">
          <button
            onClick={() => CreateBlog()}
            className="border rounded-xl p-2 border-1 bg-khas text-white mx-auto min-w-[300px] mt-3 hover:bg-orange-500 transition-all duration-300"
          >
            {loading ? <CircularProgress /> : " آپلود مقاله "}
            {loading ? null : <Telegram />}
          </button>
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
      </div>
    </>
  );
};

export default WeblogContent;
