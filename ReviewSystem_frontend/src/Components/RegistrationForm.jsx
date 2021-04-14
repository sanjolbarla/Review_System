import React from "react";
import NavigationBar from "./NavigationBar";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import "./login.css";
import { useSnackbar } from "material-ui-snackbar-provider";
import { useHistory } from "react-router-dom";

export default function RegistrationForm() {
  const snackbar = useSnackbar();
  const history = useHistory();

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),

    password: Yup.string()
      .required("Required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
    confirmPassword: Yup.string()
      .required("Re-enter Password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  //   const onSubmit = (values) => {
  //     // console.log(values);

  // axios({
  //   method: "post",
  //   url: "http://localhost:5000/registeruser",
  //   data: values,
  //   headers: { "Content-Type": "application/json" },
  // })
  //   .then(function (response) {
  //     //handle success
  //     console.log(response);
  //     alert("Successfully Registered!!");
  //   })
  //   .catch(function (err) {
  //     //handle error
  //     console.log(err);
  //   });
  //     // axios({
  //     //   method: "GET",
  //     //   url: "http://localhost:5000/",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     // }).then((res) => {
  //     //   console.log(res.data.message);
  //     // });
  //   };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      // console.log(values);

      axios({
        method: "post",
        url: "http://localhost:5000/createUser",
        data: values,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          //handle success
          console.log(response);
          if (response.data.status === "error") {
            // alert(response.data.error);
            snackbar.showMessage(response.data.error, "Try Again", () => {
              history.push("/register");
            });
          } else if (response.data.status === "ok") {
            snackbar.showMessage("Succesfully Registered", "LOGIN", () => {
              history.push("/login");
            });
          }
        })
        .catch(function (err) {
          //handle error
          console.log(err);
          alert(err);
        });
    },
  });

  return (
    <div>
      <NavigationBar />
      <div className="root">
        <form onSubmit={formik.handleSubmit} className="form">
          <h1 style={{ textAlign: "center" }}>Register</h1>
          <TextField
            fullWidth
            margin="normal"
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            autoComplete="on"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            margin="normal"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            variant="outlined"
            autoComplete="on"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <br />
          <center>
            <Button
              color="primary"
              variant="contained"
              type="submit"
              className="button"
            >
              Register
            </Button>
          </center>
        </form>
      </div>
    </div>
  );
}
