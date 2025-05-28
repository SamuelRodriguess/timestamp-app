const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;

  if (!dateParam) {
    // Sem parâmetro: data atual
    date = new Date();
  } else {
    // Se o parâmetro for um número inteiro (timestamp em milissegundos)
    if (/^\d+$/.test(dateParam)) {
      // Criar data a partir do timestamp numérico
      date = new Date(parseInt(dateParam));
    } else {
      // Tenta criar data a partir da string
      date = new Date(dateParam);
    }
  }

  // Verifica se a data é inválida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }


  console.log("🚀 ~ app.get ~ date:", date)

  // Resposta JSON com unix e utc
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
