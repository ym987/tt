import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import ProgressBar from "@ramonak/react-progress-bar";

function MainProgress({ ttID, mtchingId }) {
  const [list, setList] = useState({});
  console.log("====================================");
  console.log(mtchingId);
  console.log("====================================");

  useEffect(() => {
    axios
      .get(
        `https://www.matara.pro/nedarimplus/V6/MatchPlus.aspx?Action=ShowGoal&MatchingId=${mtchingId}`
      )
      .then((response) => {
        setList(response.data);
        console.log(response.data);
        console.log(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [mtchingId]);

  useEffect(() => {
    const interval =  setInterval(() => {
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

  //   const number = 1000000;
  // const numberWithCommas = number.toLocaleString();
  // console.log(numberWithCommas); // Output: 1,000,000

  const progress = Math.floor((list.Donated / list.Goal) * 100);
  const goal = list.Goal && Number(list.Goal).toLocaleString();
  const donated = list.Donated && Number(list.Donated).toLocaleString();
  return (
    <div style={{ margin: "10px" }}>
      <br />
      <br />

      <img
        style={{
          margin: "auto",
          display: "block",
          width: "100%",
          height: "100%",
        }}
        src={`https://images.matara.pro/ClientsImages/${ttID}.jpg?7`}
        alt=""
      />
      <br />

      <Typography fontFamily={'CustomFont'} variant="h2" textAlign={"center"}>
       <span dir="rtl">עד כה נתרם:</span><br/> <span style={{ color: "gray" }}>{donated}</span>  <br/> <span dir="rtl">מתוך יעד:</span> <br/> <span style={{ color: "gray" }}>{goal}</span>  <br/> {Math.floor(progress)}%
      </Typography>
      <br />

      <ProgressBar
        completed={progress}
        bgColor="green"
        height="100"
        margin="1px"
        isLabelVisible={true}
      />
    </div>
  );
}

export default MainProgress;
