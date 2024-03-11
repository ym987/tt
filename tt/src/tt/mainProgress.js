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
        // "https://www.matara.pro/nedarimplus/V6/MatchPlus.aspx?Action=ShowGoal&MatchingId=500"
      )
      .then((response) => {
        setList(response.data);
        console.log(response.data);
        console.log(list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setInterval(() => {
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
    }, 10000);
  }, []);

  const progress = Math.floor((list.Donated / list.Goal) * 100);

  return (
    <div style={{ margin: "10px"}}>
      <img
        style={{ margin: "auto",  display: "block"    }}
        src={`https://images.matara.pro/ClientsImages/${ttID}.jpg?7`}
        alt=""
      />
     
        <Typography variant="h3" textAlign={'center'}>
          עד כה נתרם:{list.Donated} מתוך יעד:{list.Goal} {Math.floor(progress)}%
        </Typography>
  
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
