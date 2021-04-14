import React from "react";
import SearchBar from "material-ui-search-bar";

export default function SearchBox() {
  return (
    <div>
      <h1>Search for a Review :</h1>
      <SearchBar
        onChange={(newvalue) => console.log(newvalue)}
        onRequestSearch={(value) =>
          console.log("The requested value : ", value)
        }
        style={{
          margin: "0 auto",
          maxWidth: 800,
          marginTop: "50px",
        }}
      />
    </div>
  );
}
