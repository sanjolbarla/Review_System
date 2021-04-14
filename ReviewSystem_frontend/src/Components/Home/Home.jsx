import React, { useState } from "react";
import Note from "./Note";
import NavigationBar from "../NavigationBar";
import SearchBar from "material-ui-search-bar";
import axios from "axios";
import { useSnackbar } from "material-ui-snackbar-provider";
import "./note.css";
import logo from './rating.png';

export default function Home() {
  const snackbar = useSnackbar();
  const [notes, setNotes] = useState([
    // {
    //   title: "harsh",
    //   content: "harshvardhan review",
    // },
    // {
    //   title: "Smriti",
    //   content: "Smriti review",
    // },
    // {
    //   title: "Sanjol",
    //   content: "Sanjol review",
    // },
    // {
    //   title: "Nikunj",
    //   content: "Nikunj review",
    // },
  ]);

  const onSearch = (value) => {
    console.log("The value is :", value);
    const values = {
      subjectTitle: value,
    };
    axios({
      method: "post",
      url: "http://localhost:8000/getReview",
      data: values,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (res) {
        //handle success
        console.log(res.data);
        if (res.data.status === "Success") {
          setNotes(res.data.snippets);
        } else {
          snackbar.showMessage(
            "No items found",
            "Try something different",
            () => {
              // history.push("/home");
              window.location.reload();
            }
          );
        }
      })
      .catch(function (err) {
        //handle error
        console.log(err);
      });
  };

  return (
    <div>
      <NavigationBar />
      <img height="10%" width="10%" className="d-block mx-auto img-fluid w-40" src={logo} alt="Logo" style={{paddingTop: "7%"}}/>
      <SearchBar
        // onChange={(newvalue) => console.log(newvalue)}
        onRequestSearch={(value) => onSearch(value)}
        style={{
          backgroundColor: '#CFCFCF',
          borderRadius: "10px",
          margin: "0 auto",
          maxWidth: 800,
          marginTop: "50px",
          marginBottom: "30px",
        }}
      />
      <div align="center">
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.subjectTitle}
            content={noteItem.desc}
            username={noteItem.username}
            date={noteItem.date}
          />
        );
      })}</div>
    </div>
  );
}
