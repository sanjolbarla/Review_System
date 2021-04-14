import axios from "axios";
import React, { useEffect, useState } from "react";
import NavigationBar from "../NavigationBar";
import './AllReview.css';

export default function SubjectTitle(props) {
  const [subjectTitle, setSubjectTitle] = useState("");
  const [reviews, setReviews] = useState([]);
  // let title;
  // title = props.location.search.slice(1);
  // const subject = {
  //   subjectTitle: title,
  // };

  useEffect(() => {
    const title = props.location.search.slice(1);
    setSubjectTitle(decodeURI(title));
    const subject = {
      subjectTitle: subjectTitle,
    };

    axios({
      method: "post",
      url: "http://localhost:8000/getFullReview",
      data: subject,
      headers: { "Content-Type": "application/json" },
    })
      .then(function (res) {
        //handle success
        let reviewAll = res.data.review[0];
        console.log(reviewAll);
        setReviews(reviewAll);
        // if (res.data.status === "Success") {
        //   setReview(res.data.review);
        // } else {
        //   alert("Invalid email-id or password");
        // }
      })
      .catch(function (err) {
        //handle error
        // console.log(err);
      });
  }, [props.location.search, subjectTitle]);

  return (
    <div>
      <NavigationBar />
      <h1 style={{marginTop: "30px", marginBottom: "10px", marginLeft: "100px"}}>{subjectTitle}</h1>
      {reviews.map((reviewItem, index) => {
        return (
          <div className="note1" key={index}>
            <h1 align="middle">{reviewItem.reviewTitle}</h1>
            <p align="left" style={{marginTop: 13}}>{reviewItem.review}</p>
            <p align="right" style={{fontSize: 15,fontWeight: "bold", fontStyle: "italic"}}>- {reviewItem.username}</p>
            <p align="left" style={{fontSize: 12,fontWeight: "bold", fontStyle: "italic"}}>{reviewItem.timeStamp}</p>
          </div>
          /*<div key={index}>
            <h6>{reviewItem.reviewTitle}</h6>
            <h6>{reviewItem.review}</h6>
            <h6>{reviewItem.username}</h6>
          </div>*/
        );
      })}
    </div>
  );
}

// axios({
//   method: "post",
//   url: "http://localhost:8000/getFullReview",
//   data: subject,
//   headers: { "Content-Type": "application/json" },
// })
//   .then(function (res) {
//     //handle success
//     let reviewAll = res.data.review[0][0];
//     console.log(reviewAll);
//     // if (res.data.status === "Success") {
//     //   setReview(res.data.review);
//     // } else {
//     //   alert("Invalid email-id or password");
//     // }
//   })
//   .catch(function (err) {
//     //handle error
//     console.log(err);
//   });
