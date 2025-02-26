import { useState, useEffect } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import About from "./about";

const Input = styled("input")({
  display: "none",
});



function SetID({ ttID, setttID, mtchingId, setMatchingId }) {
  const [inputValue, setInputValue] = useState(ttID);
  const [inputValue1, setInputValue1] = useState(ttID);
  const [file, setFile] = useState(null);

  // load data from localStorage
  useEffect(() => {
    const savedTTID = localStorage.getItem("ttID");
    const savedMatchingId = localStorage.getItem("matchingId");

    if (savedMatchingId) setMatchingId(savedMatchingId);
    if (savedTTID) setttID(savedTTID);
  }, [setMatchingId, setttID]);

  const handleSubmit = async () => {
    if(!inputValue && !inputValue1){
      setttID("50728");
      setMatchingId("2176");
      return;
    }
    if (!inputValue) {
      alert("נא הכנס את קוד המוסד");
      return;
    }

    if (!inputValue1) {
      alert("נא הכנס את קוד המגבית");
      return;
    }
    // save data to localStorage
    localStorage.setItem("ttID", inputValue);
    localStorage.setItem("matchingId", inputValue1);

    setttID(inputValue);
    setMatchingId(inputValue1);   
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <TextField
        onChange={(e) => setInputValue(e.target.value)}
        label="הכנס את הקוד מוסד"
        value={inputValue}
      />
      <br />
      <TextField
        onChange={(e) => setInputValue1(e.target.value)}
        label="הכנס את הקוד מגבית"
        value={inputValue1}
      />
      <br />
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <Button variant="contained" component="span">
          העלה תמונה
        </Button>
      </label>
      {file && <div dir="rtl">תמונה נבחרה בהצלחה.</div>}
      <br />
      <Button variant="contained" onClick={handleSubmit}>
        הכנס
      </Button>
      <About />
    </div>
  );
}

export default SetID;
