import { useState, useEffect } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

async function getCodeMossad(ttID) {
  try {
    const apiUrl = "https://tt-s1kv.onrender.com/api";
    const response = await axios.get(apiUrl, { params: { MosadId: ttID } });

    if (response.data?.Matching) {
      return response.data.Matching.split(":")[1];
    }
    return null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function SetID({ ttID, setttID, mtchingId, setMatchingId }) {
  const [inputValue, setInputValue] = useState(ttID);
  // const [inputValue1, setInputValue1] = useState(mtchingId);

  useEffect(() => {
    const savedTTID = localStorage.getItem("ttID");
    const savedMatchingId = localStorage.getItem("matchingId");

    if (savedMatchingId) setMatchingId(savedMatchingId);
    if (savedTTID) setttID(savedTTID);

  }, []);

  const handleSubmit = async () => {
    if (!inputValue) {
      alert("נא הכנס את כל המידע");
      return;
    }


    const Matching = await getCodeMossad(inputValue);
    if (Matching) {
      localStorage.setItem("ttID", inputValue); // Save to localStorage
      localStorage.setItem("matchingId", Matching); // Save to localStorage
      setMatchingId(Matching);
      setttID(inputValue);

    } else {
      alert("שגיאה בקבלת הנתונים");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        onChange={(e) => setInputValue(e.target.value)}
        label="הכנס את הקוד מוסד"
        value={inputValue}
      />
      <br />
      {/* <TextField
        onChange={(e) => setInputValue1(e.target.value)}
        label="הכנס את הקוד של המצ'ינג"
        value={inputValue1}
      />
      <br /> */}
      <Button variant="contained" onClick={handleSubmit}>
        שלח
      </Button>
    </div>
  );
}

export default SetID;
