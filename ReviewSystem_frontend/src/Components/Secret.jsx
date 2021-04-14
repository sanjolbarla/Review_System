import React from "react";

import { connect, useDispatch } from "react-redux";
import { logoutUser } from "../redux/users/userActions";

function Secret(props) {
  const dispatch = useDispatch();
  let message;
  if (props.location.state.detail) {
    message = props.location.state.detail;
  }
  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h1>Successfully Logged In</h1>
        <p>{message}</p>
        <p>Full Name: {props.username}</p>
        <p>Email ID: {props.email}</p>
        <button
          onClick={() => {
            dispatch(logoutUser());
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  username: state.user.username,
  email: state.user.email,
});

export default connect(mapStatetoProps)(Secret);
