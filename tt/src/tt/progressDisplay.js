import { useState, useEffect } from "react";
import axios from "axios";
import ColorChangingComponent from "./ColorChangingComponent";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function ProgressDisplay({ ttID }) {
  const [list, setList] = useState([]);

    useEffect(() => {
      axios
        .get(
          `https://www.matara.pro/nedarimplus/V6/MatchPlus.aspx?Action=SearchMatrim&Name=&MosadId=${ttID}`
        )
        .then((response) => {
          setList(response.data);
          console.log(response.data);
          console.log(list);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [ttID]);
  useEffect(() => {
    setInterval(() => {
      console.log("====================================");
      console.log(1654);
      console.log("====================================");
      axios
        .get(
          `https://www.matara.pro/nedarimplus/V6/MatchPlus.aspx?Action=SearchMatrim&Name=&MosadId=${ttID}`
        )
        .then((response) => {
          setList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 10000);
  },[]);

  return (
    <div>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {/* {list[0].Name} */}

        {list.map((info, i) => (
          <Grid item key={i} xs={3}>
            <Item>
              <ColorChangingComponent info={info} />
            </Item>
          </Grid>
        ))}
        {/* <ColorChangingComponent info={90} /> */}
      </Grid>
    </div>
  );
}

export default ProgressDisplay;
