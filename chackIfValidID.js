const logs = require("./logs.json");
const axios = require("axios");

async function main() {
  const validtt = [];
  await Promise.all(logs.allLogs.map(async (log) => {
    const ttID = log.ttid;
    if (await checkValidTT(ttID)) {
      validtt.push(ttID);
    }
  }));
  
  console.log(validtt);
  
}

main();

async function checkValidTT(ttID) {
  const apiUrl = "https://tt-s1kv.onrender.com/"; // For production on render
  const response = await axios.post(apiUrl, { ttID });
  // console.log("matching: ", response.data?.Matching);
  return response.data?.Matching || false;
}
