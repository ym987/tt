import { useState, useEffect } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import axios from "axios";
import About from "./about";

const Input = styled("input")({
  display: "none",
});

async function getCodeMossad(ttID) {
  try {
    const apiUrl = "https://tt-s1kv.onrender.com/"; // For production on render
    // const apiUrl = "http://localhost:8080/"; // For local testing
    const response = await axios.post(apiUrl, {ttID});
    console.log(response.data);
    

    if (response.data?.Matching) {
      localStorage.setItem("MatchingType", response.data.Matching.split(":")[0]);
      return response.data.Matching.split(":")[1];
    }
    return null;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

function SetID({ ttID, setttID, setMatchingId }) {
  const [inputValue, setInputValue] = useState(ttID);
  const [file, setFile] = useState(null);

  // load data from localStorage
  useEffect(() => {
    const savedTTID = localStorage.getItem("ttID");
    const savedMatchingId = localStorage.getItem("matchingId");

    if (savedMatchingId) setMatchingId(savedMatchingId);
    if (savedTTID) setttID(savedTTID);
  }, [setMatchingId, setttID]);

  const handleSubmit = async () => {
    if (!inputValue) {
      alert("נא הכנס את קוד המוסד");
      return;
    }

    const Matching = await getCodeMossad(inputValue);
    if (Matching) {
      if (file) {
        const reader = new FileReader();
        const fileReadPromise = new Promise((resolve, reject) => {
          reader.onloadend = () => {
            localStorage.setItem("uploadedImage", reader.result); // Save image to localStorage
            resolve();
          };
          reader.onerror = reject;
        });
        reader.readAsDataURL(file);
        await fileReadPromise;
      }
      localStorage.setItem("ttID", inputValue); // Save to localStorage
      localStorage.setItem("matchingId", Matching); // Save to localStorage
      setMatchingId(Matching);
      setttID(inputValue);
    } else {
      alert(`
        לא נמצא מצ'ינג עבור קוד מוסד ${inputValue}
        ניתן לנסות שוב או לפנות לתמיכה`);
    }
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
