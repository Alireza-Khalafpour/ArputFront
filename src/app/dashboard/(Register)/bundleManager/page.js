"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";

const defaultTheme = createTheme();

const RegisterBundleManager = () => {
  const cookie = new Cookies();
  const Auth = cookie.get("tokenDastResi");

  const [message, setMessage] = React.useState();
  const [alert, setAlert] = React.useState(false);
  const [errorAlert, setErrorAlert] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  //-------------------------------------------------------------
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setPhoneNumber("");
    setPassword("");
    setCode("");
    setOpen(false);
  };

  const handleGetOtp = () => {
    if (phoneNumber.length === 11 && phoneNumber !== "") {
      setLoading(true);
      axios
        .post(
          "https://supperapp-backend.chbk.run/register/otp",
          { phone: phoneNumber },
          {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          }
        )
        .then((response) => {
          if (response.data.Done === true) {
            setMessage(" کد با موفقیت ارسال شد ");
            setAlert(true);
            setLoading(false);
            setOpen(true);
          }
        })
        .catch(function (error) {
          console.log(error, "Error");
          setMessage(" مشکلی پیش آمده است! ");
        });
    } else {
      setMessage(" شماره همراه خود را وارد کنید ");
      setErrorAlert(true);
    }
  };

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${Auth}`,
    "Content-Type": "application/json",
  };

  function handleRegister() {
    axios
      .post(
        "https://supperapp-backend.chbk.run/register/bundle_manager",
        {
          phone: phoneNumber,
          password: password,
          code: code,
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        if (response.data.Done === true) {
          setMessage(response?.data?.Error_text);
          setAlert(true);
          setLoading(false);
        } else {
          setMessage(response?.data?.Error_text);
          setErrorAlert(true);
        }
      });
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar className="bg-khas" sx={{ m: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ثبت باندل منجر
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="شماره تلفن"
              autoFocus
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              fullWidth
              label="رمز"
            />

            <button
              type="button"
              className="w-full rounded-2xl p-3 bg-khas text-white mx-auto opacity-70 hover:opacity-100"
              onClick={() => handleGetOtp()}
            >
              ارسال کد
            </button>
          </Box>
        </Box>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"کد ارسالی را وارد کنید"}
        </DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => setCode(e.target.value)}
            margin="normal"
            required
            fullWidth
            label="کد"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>انصراف</Button>
          <Button onClick={() => handleRegister()} autoFocus>
            ثبت نام
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={alert}
        autoHideDuration={2500}
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
        autoHideDuration={2500}
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
    </ThemeProvider>
  );
};

export default RegisterBundleManager;
