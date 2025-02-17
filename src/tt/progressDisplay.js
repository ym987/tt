import { useState, useEffect } from "react";
// import axios from "axios";
import axiosInstance from "./axiosConfig";
import ColorChangingComponent from "./ColorChangingComponent";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";

function ProgressDisplay({ mtchingId, ttID }) {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const amountToDisplay = 20;


  // fetches data at first render, and again every minute
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call your API here and update the list
        const response = await axiosInstance.post("/getPersonalProgress", {
          campaignId: mtchingId,
        });
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        const data = await response.data;
        console.log(data?.d);
        
        setList(data?.d);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchData(); // Initial fetch

    const fetchInterval = setInterval(fetchData, 600000); // Fetch data every 10 minutes

    return () => clearInterval(fetchInterval); // Cleanup interval on component unmount
  }, [ttID]);

  // refresh the grid with new donors every 10 seconds
  useEffect(() => {
    const incrementCount = function() {
      setCount(
        (prevCount) =>
          (prevCount + 1) % Math.ceil(list.length / amountToDisplay)
      );
    }

    const refreshTime = 10000; // Refresh every 10 seconds
    const displayInterval = setInterval(incrementCount, refreshTime);

    return () => clearInterval(displayInterval); // Cleanup interval on component unmount
  }, [list]);

  const listToDisplay = list.slice(
    count * amountToDisplay,
    count * amountToDisplay + amountToDisplay
  );

  return (
    <div
      style={{
        width: "100%", // Ensure the parent container takes full width
        height: "100%", // Allow height to adjust based on content
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
      }}
    >
      {listToDisplay.map((info, i) => (
        <ColorChangingComponent key={i} info={info} />
      ))}
    </div>
  );
}

export default ProgressDisplay;
