"use client";

import axios from "axios";
import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import {
  AddCircleOutline,
  AddCircleRounded,
  AddRounded,
  Category,
  CloudUpload,
  CurrencyExchangeRounded,
  Delete,
  DeleteForeverOutlined,
  DetailsOutlined,
  FilterAlt,
  FireTruckOutlined,
  FireTruckRounded,
  History,
  Payment,
  PostAddRounded,
  RefreshOutlined,
  Search,
  TableRowsRounded,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  MobileStepper,
  Modal,
  Slide,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo, useState } from "react";
import { MRT_Localization_FA as mrtLocalizationFa } from "material-react-table/locales/fa";
import { Alert, Input, ModalDialog, Snackbar } from "@mui/joy";

const BundleType = () => {
  const cookie = new Cookies();

  const Auth = cookie.get("tokenDastResi");

  const [data, setData] = useState([]);
  // add other Bundle states----------------------------
  const [AddBundleModal, setAddBundleModal] = useState(false);

  const [preProductId, setPreProductId] = useState("");
  const [albedo_texture_url, set_albedo_texture_url] = useState("");
  const [metalic_texture_url, set_metalic_texture_url] = useState("");
  const [normal_map_texture_url, set_normal_map_texture_url] = useState("");
  const [height_map_texture_url, set_height_map_texture_url] = useState("");

  const [preProductName, setPreProductName] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [bundleTypeModal, setBundleTypeModal] = useState(false);
  const [typeName, setTypeName] = useState("");

  // Alerts---------------------------------------
  const [message, setMessage] = useState();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  async function ListApi(Au) {
    await axios
      .get("https://supperapp-backend.chbk.run/pre_product/list/all", {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${Au}`,
        },
      })
      .then((response) => {
        setData(response.data.Data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  }

  useEffect(() => {
    const Auth = cookie.get("tokenDastResi");
    ListApi(Auth);
  }, []);

  // Add other bundle Api -------------------------------------------------------

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${Auth}`,
    "Content-Type": "application/json",
  };

  async function AddProductApi() {
    // setLoading(true);
    await axios
      .patch(
        "https://supperapp-backend.chbk.run/bundle/update",
        {
          id: preProductId,
          albedo_texture_url: albedo_texture_url,
          metalic_texture_url: metalic_texture_url,
          normal_map_texture_url: normal_map_texture_url,
          height_map_texture_url: height_map_texture_url,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log(response);
        setAlert(true);
        setMessage(response.data.Message);
        setLoading(false);
        handleCloseBundleModal();
        ListApi(Auth);
        setActiveStep(0);
      })
      .catch(function (error) {
        console.log(error, "Error");
        setMessage(" متاسفیم،خطایی رخ داده است ");
        setErrorAlert(true);
        handleCloseBundleModal();
      });
  }
  // Add new bundle type API ------------------------------

  const AddTypeApi = async () => {
    if (typeName !== "") {
      await axios
        .post(
          "https://supperapp-backend.chbk.run/bundle/type/create",
          {
            type_name: typeName,
            active: true,
          },
          {
            headers: headers,
          }
        )
        .then((response) => {
          if (response.data.Done == true) {
            setAlert(true);
            setMessage(response?.data?.Message);
            setLoading(false); 
            setTypeName("");
            setBundleTypeModal(false);
          } else {
            setMessage(response?.data?.Message);
            setErrorAlert(true);
          }
        })
        .catch((error) => {
          console.log(error, "Error");
          setMessage(" متاسفیم،خطایی رخ داده است ");
          setErrorAlert(true);
          setTypeName("");
        });
    }
  };

  // Add image and image name-----------------------------
  const [imageForUpload, setImageForUpload] = useState();

  const DeleteImg = (item) => {
    setImageForUpload();
    setActiveStep(item);
    if (item == 0) {
      set_albedo_texture_url("");
    } else if (item == 1) {
      set_metalic_texture_url("");
    } else if (item == 2) {
      set_normal_map_texture_url("");
    } else if (item == 3) {
      set_height_map_texture_url("");
    }
    document.getElementById("getTextureFile").value = null;
  };

  // Upload Texture---------------------------------------------------------------------------------

  const TextureHeaders = {
    accept: "application/json",
    Authorization: `Bearer ${Auth}`,
    "Content-Type": " multipart/form-data",
  };

  const formData = new FormData();

  async function handleImageUpload(Type) {
    formData.append("file", imageForUpload);

    setLoading(true);

    if (
      imageForUpload !== null &&
      imageForUpload !== undefined &&
      imageForUpload !== ""
    ) {
      switch (Type) {
        case "albedo_texture_url":
          await axios
            .post(
              "https://supperapp-backend.chbk.run/upload/upload_texture",
              formData,
              {
                headers: TextureHeaders,
              }
            )
            .then((response) => {
              if (response.data.Done == true) {
                set_albedo_texture_url(response.data.address);
                setAlert(true);
                setMessage(response.data.message);
                setActiveStep(1);
              } else {
                setErrorAlert(true);
                setMessage(response.data.message);
              }
            })
            .catch((error) => {
              console.log(error, "Error");
              setLoading(false);
            });
          setImageForUpload("");
          break;

        case "metalic_texture_url":
          await axios
            .post(
              "https://supperapp-backend.chbk.run/upload/upload_texture",
              formData,
              {
                headers: TextureHeaders,
              }
            )
            .then((response) => {
              if (response.data.Done == true) {
                set_metalic_texture_url(response.data.address);
                setAlert(true);
                setMessage(response.data.message);
                setActiveStep(2);
              } else {
                setErrorAlert(true);
                setMessage(response.data.message);
              }
            })
            .catch((error) => {
              console.log(error, "Error");
              setLoading(false);
            });
          setImageForUpload("");
          break;

        case "normal_map_texture_url":
          await axios
            .post(
              "https://supperapp-backend.chbk.run/upload/upload_texture",
              formData,
              {
                headers: TextureHeaders,
              }
            )
            .then((response) => {
              if (response.data.Done == true) {
                set_normal_map_texture_url(response.data.address);
                setAlert(true);
                setMessage(response.data.message);
                setActiveStep(3);
              } else {
                setErrorAlert(true);
                setMessage(response.data.message);
              }
            })
            .catch((error) => {
              console.log(error, "Error");
              setLoading(false);
            });
          setImageForUpload("");
          break;

        case "height_map_texture_url":
          await axios
            .post(
              "https://supperapp-backend.chbk.run/upload/upload_texture",
              formData,
              {
                headers: TextureHeaders,
              }
            )
            .then((response) => {
              if (response.data.Done == true) {
                set_height_map_texture_url(response.data.address);
                setAlert(true);
                setMessage(response.data.message);
                setActiveStep(4);
              } else {
                setErrorAlert(true);
                setMessage(response.data.message);
              }
            })
            .catch((error) => {
              console.log(error, "Error");
              setLoading(false);
            });
          setImageForUpload("");
          break;
      }
    } else {
      setMessage("ابتدا فایل را انتخاب کنید");
      setErrorAlert(true);
    }
    document.getElementById("getTextureFile").value = null;
  }

  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: " نام پیش محصول ",
        accessorKey: "name",
        id: "name",
      },
      {
        header: " نام دسته بندی ",
        accessorKey: "category_name",
        id: "category_name",
      },
    ],
    []
  );

  // open modal and set pre-product Id----------

  const GetRowId = (row) => {
    setPreProductId(row.original.pre_product_id);
    setPreProductName(row.original.name);
    setAddBundleModal(true);
  };

  // -----------------------------------------

  const table = useMaterialReactTable({
    columns,
    data,
    localization: mrtLocalizationFa,
    columnResizeMode: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableRowActions: true,
    muiTableBodyCellProps: {
      sx: {
        align: "right",
        textAlign: "right",
      },
    },
    muiTableHeadCellProps: {
      sx: {
        textAlign: "right",
        fontWeight: "600",
        fontSize: "14px",
        backgroundColor: "#ECEFF1",
        alignItems: "center",
        background: "#1D9BF0",
        borderRight: "1px solid rgba(224,224,224,1)",
        color: "white",
      },
    },
    muiTableContainerProps: { sx: { maxHeight: "500px" } },

    renderTopToolbar: ({ table }) => {
      return (
        <Box
          sx={() => ({
            display: "flex",
            gap: "0.5rem",
            p: "8px",
            justifyContent: "space-between",
          })}
        >
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {/* import MRT sub-components */}
            <MRT_GlobalFilterTextField table={table} />
            <MRT_ToggleFiltersButton table={table} />
          </Box>
          <Box>
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <button
                className="bg-khas text-white p-2 rounded-xl hover:bg-orange-500  "
                onClick={() => setBundleTypeModal(true)}
              >
                نوع باندل جدید <AddCircleOutline />
              </button>
            </Box>
          </Box>
        </Box>
      );
    },

    renderRowActions: ({ row, table }) => {
      return (
        <div className="w-auto">
          <Button
            onClick={() => GetRowId(row)}
            size="small"
            className="rounded-xl bg-khas hover:bg-orange-600 p-1 text-white font-semibold "
          >
            ایجاد باندل اضافی
          </Button>
        </div>
      );
    },
  });

  function handleCloseBundleModal() {
    setPreProductId("");
    set_albedo_texture_url("");
    set_metalic_texture_url("");
    set_normal_map_texture_url("");
    set_height_map_texture_url("");
    document.getElementById("getTextureFile").value = null;
    setAddBundleModal(false);
    setActiveStep(0);
  }

  return (
    <div className="flex flex-col gap-4">
      <MaterialReactTable table={table} />

      <Modal open={AddBundleModal}>
        <ModalDialog
          variant="outlined"
          role="definition"
          className="w-[50vw] h-[70vh] p-0"
        >
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
            ایجاد باندل برای{" "}
            <span className="text-khas mx-1">{preProductName}</span>
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-5">
            {/* <div className="w-full" >
            <MobileStepper
                variant="progress"
                steps={5}
                position="static"
                activeStep={activeStep}
                className="w-full"
              /> 
          </div> */}

            <div className="w-full justify-center flex flex-col gap-10 items-center">
              <input
                id="getTextureFile"
                type="file"
                accept="image/*"
                onChange={({ target: { files } }) => {
                  setImageForUpload(files[0]);
                }}
              />
            </div>

            <div className="w-[90%] grid grid-cols-2 gap-8 justify-center mx-auto items-center">
              <div className="w-full flex flex-row gap-8 justify-center items-center">
                <div className=" flex flex-row gap-2 justify-between items-center mt-1 p-1 text-sm">
                  <DeleteForeverOutlined
                    titleAccess="حذف عکس"
                    className="text-khas hover:text-orange-600 cursor-pointer"
                    onClick={() => DeleteImg(0)}
                  />
                  <Button
                    disabled={activeStep != 0}
                    onClick={() => handleImageUpload("albedo_texture_url")}
                    className="px-2 py-4 text-xs hover:bg-orange-500 bg-khas text-white rounded-xl"
                  >
                    {" "}
                    آپلود albedo_texture_url
                  </Button>
                </div>
              </div>

              <div className="w-full flex flex-row gap-8 justify-center items-center">
                <div className=" flex flex-row gap-2 justify-between items-center mt-1 p-1 text-sm">
                  <DeleteForeverOutlined
                    titleAccess="حذف عکس"
                    className="text-khas hover:text-orange-600 cursor-pointer"
                    onClick={() => DeleteImg(1)}
                  />
                  <Button
                    disabled={activeStep != 1}
                    onClick={() => handleImageUpload("metalic_texture_url")}
                    className="px-2 py-4 text-xs hover:bg-orange-500 bg-khas text-white rounded-xl"
                  >
                    {" "}
                    آپلود metalic_texture_url{" "}
                  </Button>
                </div>
              </div>

              <div className="w-full flex flex-row gap-8 justify-center items-center">
                <div className=" flex flex-row gap-2 justify-between items-center mt-1 p-1 text-sm">
                  <DeleteForeverOutlined
                    titleAccess="حذف عکس"
                    className="text-khas hover:text-orange-600 cursor-pointer"
                    onClick={() => DeleteImg(2)}
                  />
                  <Button
                    disabled={activeStep != 2}
                    onClick={() => handleImageUpload("normal_map_texture_url")}
                    className="px-2 py-4 text-xs hover:bg-orange-500 bg-khas text-white rounded-xl"
                  >
                    {" "}
                    آپلود metalic_texture_url{" "}
                  </Button>
                </div>
              </div>

              <div className="w-full flex flex-row gap-8 justify-center items-center">
                <div className=" flex flex-row gap-2 justify-between items-center mt-1 p-1 text-sm">
                  <DeleteForeverOutlined
                    titleAccess="حذف عکس"
                    className="text-khas hover:text-orange-600 cursor-pointer"
                    onClick={() => DeleteImg(3)}
                  />
                  <Button
                    disabled={activeStep != 3}
                    onClick={() => handleImageUpload("height_map_texture_url")}
                    className="px-2 py-4 text-xs hover:bg-orange-500 bg-khas text-white rounded-xl"
                  >
                    {" "}
                    آپلود metalic_texture_url{" "}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4">
            <Button
              onClick={() => AddProductApi()}
              className="text-white bg-khas hover:bg-orange-600 w-28"
            >
              ثبت
            </Button>
            <Button
              variant="soft"
              color="danger"
              onClick={() => handleCloseBundleModal()}
            >
              انصراف
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      <Dialog
        fullWidth
        className="w-full"
        scroll="paper"
        maxWidth="sm"
        open={bundleTypeModal}
        onClose={() => setBundleTypeModal(false)}
      >
        <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
          ایجاد سمپل جدید
        </DialogTitle>
        <Divider />
        <DialogContent className="flex flex-col items-center gap-10 mt-12 h-full ">
          <div className="flex flex-col justify-center items-center gap-10 w-full">
            <div className="w-full flex md:flex-row flex-col gap-7 justify-around items-center my-10 ">
              <TextField
                className="md:w-[50%] w-[90%]"
                id="input-with-icon-textfield"
                label=" نام تایپ  "
                placeholder=" نام تایپ   "
                value={typeName}
                onChange={(e) => setTypeName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <Category className="text-asliLight" />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions className="p-4 flex flex-row gap-4 mt-10">
          <Button
            className="text-white bg-khas hover:bg-orange-600 w-28"
            onClick={() => AddTypeApi()}
          >
            {loading ? <CircularProgress size="medium" /> : " ثبت "}
          </Button>

          <Button
            variant="soft"
            color="danger"
            onClick={() => setBundleTypeModal(false)}
          >
            انصراف
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        className="bg-green-700 text-white"
        open={alert}
        autoHideDuration={4000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="filled"
          severity="success"
          className="text-lg text-white font-semibold bg-green-700"
        >
          {" "}
          {message}{" "}
        </Alert>
      </Snackbar>

      <Snackbar
        className="bg-rose-700 text-white"
        open={errorAlert}
        autoHideDuration={4000}
        onClose={() => setErrorAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
};

export default BundleType;
