import { useState, useEffect } from "react";
// import axios from "axios";
import ColorChangingComponent from "./ColorChangingComponent";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";

function ProgressDisplay({ ttID }) {
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const refreshTime = 10 * 1000; // Refresh every 10 seconds

  const url = `https://www.matara.pro/nedarimplus/V6/MatchPlus.aspx?Action=SearchMatrim&Name=&MosadId=${ttID}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call your API here and update the list
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    };

    fetchData(); // Initial fetch

    const fetchInterval = setInterval(fetchData, 60000); // Fetch data every minute

    return () => clearInterval(fetchInterval); // Cleanup interval on component unmount
  }, [ttID, url]);

  useEffect(() => {
    const displayInterval = setInterval(() => {
      setCount(
        (prevCount) =>
          (prevCount + 1) % Math.ceil(list.length / amountToDisplay)
      );
    }, refreshTime);

    return () => clearInterval(displayInterval); // Cleanup interval on component unmount
  }, [list, refreshTime]);

  const amountToDisplay = 20;

  let numOfDifferent = Math.floor(list.length / amountToDisplay);
  if (numOfDifferent !== list.length / amountToDisplay) {
    numOfDifferent++;
  }
  let myCount = count % numOfDifferent;

  const listToDisplay = list.slice(
    myCount * amountToDisplay,
    myCount * amountToDisplay + amountToDisplay
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
