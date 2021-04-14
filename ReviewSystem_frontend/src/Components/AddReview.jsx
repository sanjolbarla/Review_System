import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import NavigationBar from "./NavigationBar";
import { useSnackbar } from "material-ui-snackbar-provider";
import { useHistory } from "react-router-dom";
import "./login.css";

function AddReview(props) {
  const history = useHistory();
  const snackbar = useSnackbar();
  const initialValues = {
    subjectTitle: "",
    reviewTitle: "",
    reviewBody: "",
  };
  const validationSchema = Yup.object({
    subjectTitle: Yup.string().required("Title is Required"),
    reviewTitle: Yup.string().required("Review Title is Required"),
    reviewBody: Yup.string().required("Review Body is Required"),
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
      const newReview = {
        username: props.username,
        subjectTitle: values.subjectTitle,
        reviewTitle: values.reviewTitle,
        reviewBody: values.reviewBody,
      };
      console.log(newReview);

      axios({
        method: "post",
        url: "http://localhost:8000/postReview",
        data: newReview,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          //handle success
          console.log(response.data);
          if (response.data.status === "Success") {
            snackbar.showMessage(response.data.message, "Home", () => {
              history.push("/");
            });
          } else {
            snackbar.showMessage(response.data.message, "Try Again", () => {
              window.location.reload();
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
        <form onSubmit={formik.handleSubmit} style={{ width: "30%" }}>
          <h1 style={{ textAlign: "center" }}>Create Review</h1>
          <TextField
            fullWidth
            margin="normal"
            id="subjectTitle"
            name="subjectTitle"
            label="Subject Title"
            variant="outlined"
            value={formik.values.subjectTitle}
            onChange={formik.handleChange}
            error={
              formik.touched.subjectTitle && Boolean(formik.errors.subjectTitle)
            }
            helperText={
              formik.touched.subjectTitle && formik.errors.subjectTitle
            }
          />
          <TextField
            fullWidth
            margin="normal"
            id="reviewTitle"
            name="reviewTitle"
            label="Review Title"
            variant="outlined"
            value={formik.values.reviewTitle}
            onChange={formik.handleChange}
            error={
              formik.touched.reviewTitle && Boolean(formik.errors.reviewTitle)
            }
            helperText={formik.touched.reviewTitle && formik.errors.reviewTitle}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            rowsMax={10}
            margin="normal"
            id="reviewBody"
            name="reviewBody"
            label="Review Body"
            variant="outlined"
            value={formik.values.reviewBody}
            onChange={formik.handleChange}
            error={
              formik.touched.reviewBody && Boolean(formik.errors.reviewBody)
            }
            helperText={formik.touched.reviewBody && formik.errors.reviewBody}
          />

          <br />
          <div style={{ marginTop: "10px" }}>
            <center>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                className="button"
              >
                Add Review
              </Button>
            </center>
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  username: state.user.username,
  email: state.user.email,
});

export default connect(mapStatetoProps)(AddReview);
