import React, { useState, useEffect } from "react";
import axios from "axios";
// import Typography from "@mui/material/Typography";
import ProgressBar from "@ramonak/react-progress-bar";
import "./mainProgress.css";

function MainProgress({ ttID, mtchingId }) {
  const [list, setList] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://www.matara.pro/nedarimplus/V6/MatchPlus.aspx?Action=ShowGoal&MatchingId=${mtchingId}`
      )
      .then((response) => {
        setList(response.data);
        // console.log(response.data);
        // console.log(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [mtchingId]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(
          `https://www.matara.pro/nedarimplus/V6/MatchPlus.aspx?Action=ShowGoal&MatchingId=${mtchingId}`
        )
        .then((response) => {
          setList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 30000);
    return () => clearInterval(interval);
  }, [mtchingId]);

  const progress = Math.floor((list.Donated / list.Goal) * 100);
  const goal = list.Goal && Number(list.Goal).toLocaleString();
  const donated = list.Donated && Number(list.Donated).toLocaleString();
  return (
    <div >
      
      <img
        className="main-progress-image"
        src={`https://images.matara.pro/ClientsImages/${ttID}.jpg?7`}
        alt="charity logo"
      />

      <div style={{ fontFamily: "CustomFont", textAlign: "center", fontSize: "5vw", marginTop: "3vh" }}>
        <span dir="rtl">עד כה נתרם:</span>
        <br /> <span style={{ color: "gray" }}>{donated}</span> <br />{" "}
        <span dir="rtl">מתוך:</span> {" "}
        <span style={{ color: "gray", fontSize: "8vw" }}>{goal}</span>{""}<br />
        {Math.floor(progress)}%
      </div>

      <div style={{ position: "absolute", bottom: "5vh", width: "100%" }}>
        <ProgressBar
          completed={progress}
          bgColor="green"
          height="100"
          // margin="1px"
          isLabelVisible={true}
        />
      </div>
    </div>
  );
}

export default MainProgress;
