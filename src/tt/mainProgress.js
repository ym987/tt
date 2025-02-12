import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";
import FittedText from "yarft";
import "./mainProgress.css";

function MainProgress({ ttID, mtchingId }) {
  const [list, setList] = useState({});
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("uploadedImage");
    if (savedImage) {
      setUploadedImage(savedImage);
    } else {
      setUploadedImage(`https://images.matara.pro/ClientsImages/${ttID}.jpg?7`);
    }
  }, [ttID]);

  useEffect(() => {
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

  const progress = list.Donated && list.Goal ? Math.floor((list.Donated / list.Goal) * 100) : 0;
  const goal = list.Goal ? Number(list.Goal * 10000).toLocaleString() : "0";
  const donated = list.Donated ? Number(list.Donated).toLocaleString() : "0";

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
        <div dir="rtl">מתוך:</div> {" "}
        <div style={{ color: "gray" }}>
          <FittedText defaultFontSize={100}>{goal}</FittedText>
        </div>{""}
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