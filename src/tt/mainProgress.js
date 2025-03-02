import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";
import FittedText from "yarft";
import "./mainProgress.css";

const getProgress = async (mtchingId) => {
  let url;
  const matchingType = localStorage.getItem("MatchingType");
  if (matchingType === "Nedarim") {
    url = `https://www.matara.pro/nedarimplus/V6/MatchPlus.aspx?Action=ShowGoal&MatchingId=${mtchingId}`;
  } else if (matchingType === "Metchy") {
    url = `https://metchy.com/api/campaign/${mtchingId}/total`;
  } else {
    url = `https://www.matara.pro/nedarimplus/V6/MatchPlus.aspx?Action=ShowGoal&MatchingId=${mtchingId}`;
  }
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching progress data:", error);
    return null;
  }
};

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

  const fetchProgress = useCallback(async () => {
    const data = await getProgress(mtchingId);
    if (data) {
      setList(data);
    }
  }, [mtchingId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  useEffect(() => {
    const interval = setInterval(fetchProgress, 30000);
    return () => clearInterval(interval);
  }, [fetchProgress]);

  const { Donated, Goal } = list;
  const progress = Donated && Goal ? Math.floor((Donated / Goal) * 100) : 0;
  const goal = Goal ? Number(Goal).toLocaleString() : "0";
  const donated = Donated ? Number(Donated).toLocaleString() : "0";

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
        <div style={{ color: "gray" }}>{donated}</div>
        <div dir="rtl">מתוך:</div>
        <div style={{ color: "gray" }}>
          <FittedText defaultFontSize={100}>{goal}</FittedText>
        </div>
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