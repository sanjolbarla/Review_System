import React from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import { useSnackbar } from "material-ui-snackbar-provider";
import { connect } from "react-redux";
import AspectRatioIcon from '@material-ui/icons/AspectRatio';

function Note(props) {
  const snackbar = useSnackbar();
  const history = useHistory();
  function handleClick() {
    //props.onDelete(props.id);
    if (props.isAuthenticated === true) {
      history.push({
        pathname: "/sub",
        search: props.title,
      });
    } else {
      snackbar.showMessage("Log in to see all reviews", "LOGIN", () => {
        history.push("/login");
      });
    }
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p align="left" style={{minHeight: "50px"}}>{props.content}</p>
      <p align="right" style={{fontSize: 15,fontWeight: "bold", fontStyle: "italic"}}>- {props.username}</p>
      <div style={{ paddingBottom: "10px"}}>
        <IconButton aria-label="expand" onClick={handleClick}>
          <AspectRatioIcon />
        </IconButton>
        <p align="left" style={{fontSize: 12,fontWeight: "bold", fontStyle: "italic"}}>{props.date}</p>
      </div>
    </div>
  );
}

const mapStatetoProps = (state) => ({
  isAuthenticated: state.isAuthenticated,
});

export default connect(mapStatetoProps)(Note);
