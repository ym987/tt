const express = require('express');
const axios = require('axios');
const app = express();
const port = 8080;
const cors = require('cors');

app.use(cors());
app.use(express.static(__dirname + '/build'));
app.use(express.json());



app.post('/', (req, res) => {
  console.log(req.body);
  axios.get('https://www.matara.pro/nedarimplus/online/Files/Manage.aspx', {
    params: {
      Action: 'GetMosad',
      MosadId: req.body.ttID,
      S: '',
      _: Date.now()
    },
    headers: {
      Accept: '*/*',
      'Accept-Language': 'he,en;q=0.9',
      Cookie: '_ga_1JFFGY2ZRC=GS1.1.1710014050.1.1.1710014121.0.0.0; _ga=GA1.2.1351829300.1710013894; ASP.NET_SessionId=; _gid=GA1.2.1267194143.1739033075; _ga_2F1P7K9X2N=GS1.2.1739033075.13.0.1739033075.0.0.0',
      Priority: 'u=1, i',
      Referer: `https://www.matara.pro/nedarimplus/online/?mosad=${req.query.MosadId}`,
      'Sec-CH-UA': '"Not A(Brand";v="8", "Chromium";v="132", "Google Chrome";v="132"',
      'Sec-CH-UA-Mobile': '?0',
      'Sec-CH-UA-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest'
    }
  })
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.error(error);
    });

});

app.get('/', (req, res) => {
    // send react build files
    res.sendFile(__dirname + '/build/index.html');
});



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});