const express = require("express");
const axios = require("axios");
const { Pool } = require("pg");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);

async function createLogsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS logs (
          id SERIAL PRIMARY KEY,
          ttID TEXT NOT NULL UNIQUE
      );
    `);
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

async function saveLog(ttID) {
  await pool.query("INSERT INTO logs (ttID) VALUES ($1)", [ttID]);
}

app.use(cors());
app.use(express.static(__dirname + "/build"));
app.use(express.json());

app.get("/logs", async (req, res) => {
  try {
    await createLogsTable();
  } catch (error) {
    console.error("Error creating table:", error);
    return res.status(500).send("Error creating table");
  }
  try {
    const result = await pool.query("SELECT * FROM logs");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).send("Error fetching logs");
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);

  //write to PostgreSQL
  const ttID = req.body.ttID;
  try {
    await createLogsTable();
    await saveLog(ttID);
  } catch (error) {
    console.error("Error saving log:", error);
    return res.status(500).send("Error saving log");
  }

  axios
    .get("https://www.matara.pro/nedarimplus/online/Files/Manage.aspx", {
      params: {
        Action: "GetMosad",
        MosadId: req.body.ttID,
        S: "",
        _: Date.now(),
      },
      headers: {
        Accept: "*/*",
        "Accept-Language": "he,en;q=0.9",
        Cookie:
          "_ga_1JFFGY2ZRC=GS1.1.1710014050.1.1.1710014121.0.0.0; _ga=GA1.2.1351829300.1710013894; ASP.NET_SessionId=; _gid=GA1.2.1267194143.1739033075; _ga_2F1P7K9X2N=GS1.2.1739033075.13.0.1739033075.0.0.0",
        Priority: "u=1, i",
        Referer: `https://www.matara.pro/nedarimplus/online/?mosad=${req.query.MosadId}`,
        "Sec-CH-UA":
          '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
        "Sec-CH-UA-Mobile": "?0",
        "Sec-CH-UA-Platform": '"Windows"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest",
      },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error fetching data from external API");
    });
});

app.get("/", (req, res) => {
  // send react build files
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});