"use client";

import axios from "axios";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import {
  AddCircleOutline,
  AddRounded,
  Category,
  CloudUpload,
  CurrencyExchangeRounded,
  Delete,
  DeleteForeverOutlined,
  DeleteRounded,
  DetailsOutlined,
  EditRounded,
  FireTruckOutlined,
  FireTruckRounded,
  History,
  Payment,
  PostAddRounded,
  RadioButtonChecked,
  RefreshOutlined,
  TableRowsRounded,
} from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputAdornment,
  Modal,
  Snackbar,
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
import { CircularProgress, ModalDialog } from "@mui/joy";


export const BranchListAdmin = () => {
  const cookie = new Cookies();

  const Auth = cookie.get("tokenDastResi");

  const url = process.env.NEXT_PUBLIC_URL;

  const [message, setMessage] = useState();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [representationName, setRepresentationName] = useState();
  const [repNumber, setRepNumber] = useState();
  const [repCode, setRepCode] = useState();
  const [factoryId, setFactoryId] = useState();

  const [factoryList, setFactoryList] = useState([]);

  const handleOpen = () => {
    setAddCategoryModal(true);
  };

  const RepresentationListHeaders = {
    accept: "application/json",
    Authorization: `Bearer ${Auth}`,
  };

  async function ListApi() {
    await axios
      .get(`${url}/branch/admin/list`, {
        headers: RepresentationListHeaders,
      })
      .then((response) => {
        console.log(response.data.data);
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  }

  // گرفتن لیست کارخانه ها ----------------
  async function GetFactories() {
    await axios
      .get(`${url}/factory/list`, {
        headers: RepresentationListHeaders,
      })
      .then((response) => {
        setFactoryList(response.data.data);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  }

  useEffect(() => {
    ListApi();
    GetFactories();
  }, []);

  // Admin add branch--------------------------------------
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${Auth}`,
  };

  const addBranchData = {
    factory_id: factoryId,
    name: representationName,
    mobile: repNumber,
    branch_code: repCode,
  };

  async function AddBranchApi() {
    // setLoading(true);
    console.log(addBranchData);
    await axios
      .post(`${url}/branch/create`, addBranchData, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.Done === true) {
          setAlert(true);
          setMessage(" نمایندگی جدید با موفقیت افزوده شد ");
          setLoading(false);
          setAddCategoryModal(false);
          ListApi();
          GetFactories();
        } else if (response.data.Done === false) {
          setMessage(response.data.Message);
          setErrorAlert(true);
          setLoading(false);
        }
      })
      .catch(function (error) {
        console.log(error, "Error");
        setMessage(" متاسفیم،خطایی رخ داده است ");
        setErrorAlert(true);
        setLoading(false);
      });
  }

  // Activate Branch Admin -----------------------------------------

  async function GetRowIdForActivate(id) {
    setLoading(true);

    const ActiveMethod = {
      method: "PATCH",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    };

    fetch(`${url}/branch/active`, ActiveMethod)
      .then((response) => {
        response.json();
      })
      .then((data) => {
        setAlert(true);
        setMessage(" نمایندگی فعال شد ");
        setLoading(false);
        ListApi(Auth);
      })
      .catch((err) => console.log(err));
  }

  // Deactive Branch Admin -----------------------------------------

  const GetRowIdForDelete = (id) => {
    setLoading(true);

    const deleteMethod = {
      method: "PATCH",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${Auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    };

    fetch(`${url}/branch/deactive`, deleteMethod)
      .then((response) => {
        response.json();
      })
      .then((data) => {
        setAlert(true);
        setMessage(" نمایندگی غیرفعال شد ");
        setLoading(false);
        ListApi(Auth);
      })
      .catch((err) => console.log(err));
  };

  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: " کارخانه ",
        accessorKey: "factory_name",
        id: "factory_name",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    localization: mrtLocalizationFa,
    columnResizeMode: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableGrouping: true,
    muiTableBodyCellProps: {
      sx: {
        align: "right",
        textAlign: "right",
      },
    },
    displayColumnDefOptions: {
      "mrt-row-expand": {
        size: 70,
      },
    },
    muiTableContainerProps: {
      sx: {
        maxHeight: "500px",
        borderRadius: "30px",
      },
    },
    muiTablePaperProps: {
      sx: {
        borderRadius: "30px",
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
                onClick={() => handleOpen()}
              >
                نمایندگی جدید <AddCircleOutline />
              </button>
            </Box>
          </Box>
        </Box>
      );
    },

    renderDetailPanel: ({ row }) => (
      <div className="bg-paszamine1 p-2">
        <h3 className="w-full text-start font-extrabold mb-2">
          {" "}
          <span className=" p-1 text-base"> لیست نمایندگی ها </span>{" "}
        </h3>
        <Divider />
        <Box
          sx={{
            width: "100%",
            textAlign: "justify",
          }}
        >
          {row?.original?.branch_data.map((item) => (
            <div className="grid grid-cols-5 gap-1">
              {item?.active == true ? (
                <IconButton
                  color="error"
                  className="max-w-fit"
                  onClick={() => GetRowIdForDelete(item?.branch_id)}
                >
                  <DeleteRounded
                    className="text-red-600"
                    titleAccess="غیرفعال کردن"
                  />
                </IconButton>
              ) : (
                <IconButton
                  color="success"
                  className="max-w-fit"
                  onClick={() => GetRowIdForActivate(item?.branch_id)}
                >
                  <RadioButtonChecked titleAccess="فعال کردن" />
                </IconButton>
              )}
              <p className="text-lg p-2"> {item.branch_name} </p>
              <p className="text-lg p-2"> {item.branch_code} </p>
              <p className="text-lg p-2"> {item.telephone} </p>
              <p className="text-lg p-2"> {item.address[0]} </p>
            </div>
          ))}
        </Box>
      </div>
    ),
    renderRowActions: ({ row }) => {
      return (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          <IconButton
            className=" hover:bg-slate-300 p-1 rounded-xl"
            onClick={() => GetRowIdForPatchAddress(row)}
          >
            <LocationOnRounded />
            آدرس
          </IconButton>
          <IconButton
            className=" hover:bg-slate-300 p-1 rounded-xl "
            onClick={() => GetRowIdForUpdateFactory(row)}
          >
            <Edit />
            ویرایش
          </IconButton>
        </Box>
      );
    },
  });

  // modal part -------------------------------------------------------------
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [image, setImage] = useState([]);
  const [fileName, setFileName] = useState("فایلی انتخاب نشده...");

  const DeleteImg = () => {
    setFileName("فایلی انتخاب نشده...");
    setImage([]);
  };

  return (
    <div>
      <MaterialReactTable table={table} />

      <Modal open={addCategoryModal} onClose={() => setAddCategoryModal(false)}>
        <ModalDialog
          variant="outlined"
          role="definition"
          className="w-[40vw] h-[65vh] p-0"
        >
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
            ایجاد نمایندگی جدید
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-10">
            <div className="w-full flex flex-row justify-around items-center">
              <TextField
                id="input-with-icon-textfield"
                label=" نام نمایندگی "
                placeholder=" نام نمایندگی  "
                value={representationName}
                onChange={(e) => setRepresentationName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <Category className="text-asliLight" />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />

              <TextField
                id="input-with-icon-textfield"
                label=" شماره تماس "
                placeholder=" شماره تماس "
                value={repNumber}
                onChange={(e) => setRepNumber(e.target.value)}
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

            <div className="w-full flex flex-row justify-around items-center">
              <TextField
                className="w-1/3"
                id="input-with-icon-textfield"
                label=" کد نمایندگی "
                placeholder=" کد نمایندگی  "
                value={repCode}
                onChange={(e) => setRepCode(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <Category className="text-asliLight" />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
              />

              <Autocomplete
                className="w-1/3"
                noOptionsText=" داده ای موجود نیست "
                options={factoryList}
                getOptionLabel={(i) => i.name}
                onChange={(event, val) => {
                  setFactoryId(val.id);
                }}
                // sx={{ width:"190px"}}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" label=" کارخانه " />
                )}
              />
            </div>
          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4">
            <Button
              className="text-white bg-khas hover:bg-orange-600 w-28"
              onClick={() => AddBranchApi()}
            >
              {loading ? <CircularProgress size="medium" /> : " ثبت "}
            </Button>
            <Button
              variant="soft"
              color="danger"
              onClick={() => setAddCategoryModal(false)}
            >
              انصراف
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      <Modal open={deleteCategoryModal} onClose={() => OmitRowIdForDelete()}>
        <ModalDialog variant="outlined" role="definition" className="p-0">
          <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
            حذف دسته بندی
          </DialogTitle>
          <Divider />
          <DialogContent className="flex flex-col justify-center items-center gap-10">
            <div className="w-full flex flex-row justify-around items-center">
              <h2>
                {" "}
                آیااز حذف{" "}
                <span className="font-semibold text-khas ">
                  {" "}
                  DeleteCategName{" "}
                </span>{" "}
                اطمینان دارید؟{" "}
              </h2>
            </div>
          </DialogContent>
          <DialogActions className="p-4 flex flex-row gap-4">
            <Button
              className="text-white bg-red-500 hover:bg-red-600 w-28"
              onClick={() => DeleteCategoryApi()}
            >
              {loading ? <CircularProgress size="medium" /> : " حذف "}
            </Button>
            <Button
              variant="soft"
              color="danger"
              onClick={() => OmitRowIdForDelete()}
            >
              انصراف
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>

      <Snackbar
        open={alert}
        autoHideDuration={4000}
        onClose={() => setAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
  );
};

export default BranchListAdmin;
