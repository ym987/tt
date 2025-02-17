import React, { useState, useEffect } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import FittedText from "yarft";
import "./mainProgress.css";
import axiosInstance from "./axiosConfig";

function MainProgress({ ttID, mtchingId }) {
  const [list, setList] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setUploadedImage(savedImage);
    } else {
      setUploadedImage(
        `https://ftp.kesherhk.co.il:3380/ftp/kehilot/${ttID}.png`
      );
    }
  }, [ttID]);

  useEffect(() => {
    axiosInstance
      .post("/getMainProgress", { projectId: ttID })
      .then((response) => {
        const arr = response.data?.d;
        for (let i = 0; i < arr.length; i++) {
          if (arr[i]?.CampaignId === mtchingId) {
            setIndex(i);
            setList(arr[i].CampaignSettings);
            break;
          }
        }
        console.log(arr);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ttID, mtchingId]);

  useEffect(() => {
    const interval = setInterval(() => {
      axiosInstance
        .post("/getMainProgress", { projectId: ttID })
        .then((response) => {
          setList(response.data?.d[index].CampaignSettings);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 600000);
    return () => clearInterval(interval);
  }, [ttID, index]);

  const progress =
    list.Total && list.TargetAmount
      ? Math.floor((list.Total / list.TargetAmount) * 100)
      : 0;
  const goal = list.TargetAmount
    ? Number(list.TargetAmount).toLocaleString()
    : "0";
  const donated = list.Total ? Number(list.Total).toLocaleString() : "0";

  return (
    <div className="main-progress">
      {/* logo */}
      <img
        className="main-progress-image"
        src={uploadedImage}
        alt="charity logo"
        style={{ maxWidth: "25vw", maxHeight: "40vh", margin: "0 auto" }}
      />

      {/* stats */}
      <div className="stats">
        <div dir="rtl">עד כה נתרם:</div>
        <div style={{ color: "gray" }}>{donated}</div>{" "}
        <div dir="rtl">מתוך:</div>{" "}
        <div style={{ color: "gray" }}>
          <FittedText defaultFontSize={100}>{goal}</FittedText>
        </div>
        {""}
        {progress}%
      </div>

      {/* progress bar */}
      <div className="progress-bar">
        <ProgressBar
          completed={progress}
          bgColor="green"
          height="35px"
          isLabelVisible={true}
        />
      </div>
    </div>
  );
}

export default MainProgress;
