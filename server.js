const express = require("express");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");

app.use(cors());
app.use(express.static(__dirname + "/build"));
app.use(express.json());

app.post("/getMainProgress", (req, res) => {
  const url =
    `https://www.kesherhk.info/kehilot/Default.aspx/get_internal_labels?projectId=%27${req.body.projectId}%27`;
  
  console.log(req.body);
  axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});
app.post("/getPersonalProgress", (req, res) => {
  
  const url =
    `https://www.kesherhk.info/kehilot/Default.aspx/get_teams_of_campaign?campaignId=%27$({req.body.campaignId})%27&teamId=%27%27`;

  console.log(req.body);
  axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        
      },
    })
    .then((response) => {
      
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
});
app.get("/", (req, res) => {
  // send react build files
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
