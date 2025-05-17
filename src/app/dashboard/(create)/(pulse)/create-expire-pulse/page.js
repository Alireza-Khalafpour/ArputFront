"use client";

import {
  AddCircleOutline,
  Category,
  DeleteRounded,
  RadioButtonChecked,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import {
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { MRT_Localization_FA as mrtLocalizationFa } from "material-react-table/locales/fa";
import { useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Checkbox } from "@mui/joy";

const ExpirePulse = () => {
  const cookie = new Cookies();

  const Auth = cookie.get("tokenDastResi");

  const route = useRouter();
  const url = process.env.NEXT_PUBLIC_URL;

  const [message, setMessage] = useState();
  const [alert, setAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [departmentName, setDepartmentName] = useState("");

  const [hours, setHours] = useState(0);
  const [expireName, setExpireName] = useState("");
  const [arPulse, setArPulse] = useState(false);

  const [addDepartmentModal, setAddDepartmentModal] = useState(false);

  // گرفتن لیست برنامه های تایم اکسپایر
  async function ListApi(Au) {
    await axios
      .get(`${url}/pulse/time/expire/admin/list`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${Au}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error, "Error");
      });
  }

  //------------------------------------------------------------

  useEffect(() => {
    const Auth = cookie.get("tokenDastResi");
    ListApi(Auth);
  }, []);

  // -------------------------------------------------------

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${Auth}`,
    "Content-Type": "application/json",
  };

  async function AddFactoryApi() {
    setLoading(true);
    await axios
      .post(
        `${url}/pulse/time/expire/admin/create`,
        {
          hours: hours,
          name: expireName,
          ar_pulse: arPulse,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.Done === true) {
          setAlert(true);
          setMessage(response.data.Message);
          setLoading(false);
          setAddDepartmentModal(false);
          ListApi(Auth);
          setHours(0);
          setExpireName("");
          setArPulse(false);
        } else {
          setMessage(response.data.Message);
          setErrorAlert(true);
          setLoading(false);
          setAddDepartmentModal(false);
          setHours(0);
          setExpireName("");
          setArPulse(false);
        }
      })
      .catch(function (error) {
        setMessage(" متاسفیم،خطایی رخ داده است ");
        setErrorAlert(true);
        setLoading(false);
        setAddDepartmentModal(false);
        setHours(0);
        setExpireName("");
        setArPulse(false);
      });
  }

  // Active and deActive ---------------------------------------
  async function GetRowIdForActivate(id) {
    setLoading(true);
    await axios
      .patch(
        `${url}/pulse/time/expire/admin/active?pulse_time_expire_id=${id}`,
        {
          headers: headers,
        }
      )
      .then((response) => {
        setAlert(true);
        if (response.data.Done == true) {
          setAlert(true);
          setMessage(" فعال شد ");
          setLoading(false);
          ListApi(Auth);
        } else {
          setLoading(false);
          setMessage(response.data.Message);
          setErrorAlert(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        setMessage(" متاسفیم،خطایی رخ داده است ");
        setErrorAlert(true);
        setLoading(false);
      });
  }

  // ---------------
  async function GetRowIdForDelete(id) {
    setLoading(true);
    await axios
      .patch(
        `${url}/pulse/time/expire/admin/deactive?pulse_time_expire_id=${id}`,
        {
          headers: headers,
        }
      )
      .then((response) => {
        setAlert(true);
        if (response.data.Done == true) {
          setAlert(true);
          setMessage(" غیرفعال شد");
          setLoading(false);
          ListApi(Auth);
        } else {
          setLoading(false);
          setMessage(response.data.Message);
          setErrorAlert(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        setMessage(" متاسفیم،خطایی رخ داده است ");
        setErrorAlert(true);
        setLoading(false);
      });
  }

  // columns and data =============================================
  const columns = useMemo(
    () => [
      {
        header: " نام  ",
        accessorKey: "name",
        id: "name",
      },
      {
        header: "  زمان انقضا(ساعت)  ",
        accessorKey: "hours",
        id: "hours",
      },
      {
        header: " پالس AR ",
        accessorKey: "ar_pulse",
        id: "ar_pulse",
        Cell: ({ cell }) => (
          <span>{cell.getValue() === true ? "دارد" : "ندارد"}</span>
        ),
      },
      {
        header: " وضعیت ",
        accessorKey: "active",
        id: "active",
        Cell: ({ cell }) => (
          <span>{cell.getValue() === true ? "فعال" : "غیرفعال"}</span>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    localization: mrtLocalizationFa,
    rowNumberDisplayMode: true,
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
                onClick={() => setAddDepartmentModal(true)}
              >
                ثبت زمان جدید <AddCircleOutline />
              </button>
            </Box>
          </Box>
        </Box>
      );
    },
    renderRowActions: ({ row, table }) => {
      return (
        <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
          {row.original.active == true ? (
            <IconButton color="error" onClick={() => GetRowIdForDelete(row)}>
              <DeleteRounded titleAccess="غیرفعال کردن" />
            </IconButton>
          ) : (
            <IconButton
              color="success"
              onClick={() => GetRowIdForActivate(row.original.id)}
            >
              <RadioButtonChecked titleAccess="فعال کردن" />
            </IconButton>
          )}
        </Box>
      );
    },
  });

  return (
    <div className="w-full">
      <MaterialReactTable table={table} />

      {/* <ContextMenu
            open={showContextMenu}
            position={contextMenuPosition}
            onClose={handleContextMenuClose}
            rowData={contextMenuRowData}
            options={contextMenuOptions}
        /> */}

      <Dialog
        fullWidth
        className="w-full"
        scroll="paper"
        maxWidth="sm"
        open={addDepartmentModal}
        onClose={() => setAddDepartmentModal(false)}
      >
        <DialogTitle className="flex justify-center items-center rounded-xl w-full h-[3rem] bg-asliDark text-paszamine1">
          ایجاد زمان جدید
        </DialogTitle>
        <Divider />
        <DialogContent className="flex flex-col items-center gap-10 mt-12 h-full ">
          <div className="flex flex-col justify-center items-center gap-10 w-full">
            <TextField
              className="md:w-[50%] w-[90%]"
              id="input-with-icon-textfield"
              label="  (ساعت)زمان  "
              placeholder="  (ساعت)زمان   "
              value={hours}
              onChange={(e) => setHours(e.target.value)}
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
              className="md:w-[50%] w-[90%]"
              id="input-with-icon-textfield"
              label=" نام زمان  "
              placeholder=" نام زمان   "
              value={expireName}
              onChange={(e) => setExpireName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <Category className="text-asliLight" />
                  </InputAdornment>
                ),
              }}
              variant="standard"
            />
            <FormControlLabel
              className="border border-asliLight rounded-xl md:w-[50%] w-[85%] p-2 "
              control={
                <Checkbox
                  checked={arPulse}
                  onChange={(e) => setArPulse(e.target.checked)}
                />
              }
              label=" AR دارد "
            />
          </div>
        </DialogContent>
        <DialogActions className="p-4 flex flex-row gap-4 mt-10">
          <Button
            className="text-white bg-khas hover:bg-orange-600 w-28"
            onClick={() => AddFactoryApi()}
          >
            {loading ? <CircularProgress size="medium" /> : " ثبت "}
          </Button>
          <Button
            variant="soft"
            color="danger"
            onClick={() => setAddDepartmentModal(false)}
          >
            انصراف
          </Button>
        </DialogActions>
      </Dialog>

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

export default ExpirePulse;
