import { useState } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function SetID({ ttID, setttID, mtchingId, setMatchingId }) {
  const [inputValue, setInputValue] = useState(ttID);
  const [inputValue1, setInputValue1] = useState(mtchingId);
  const handleSubmit = () => {
    if (inputValue && inputValue1) {
      setttID(inputValue);
      setMatchingId(inputValue1);
    }
    else{
        alert("נא הכנס את כל המידע")
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        onChange={(e) => setInputValue(e.target.value)}
        label="הכנס את הקוד מוסד"
        value={inputValue}
      />
      <br/>
      <TextField
        onChange={(e) => setInputValue1(e.target.value)}
        label="הכנס את הקוד של המצ'ינג"
        value={inputValue1}
      />
      <br/>
      <Button variant="contained" onClick={handleSubmit}>
        שלח
      </Button>
    </div>
  );
}

export default SetID;
