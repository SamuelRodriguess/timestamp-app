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

app.get("/api/:date", (req, res) => {
  let dateString = req.params.date_string;

  // Caso não tenha parâmetro, retorna data atual
  if (!dateString) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // Se for timestamp numérico (5 ou mais dígitos)
  if (/^\d{5,}$/.test(dateString)) {
    let dateInt = parseInt(dateString);

    let date = new Date(dateInt);

    if (date.toString() === "Invalid Date") {
      return res.json({ error: "Invalid Date" });
    }

    return res.json({ unix: date.getTime(), utc: date.toUTCString() });
  }

  // Caso seja string de data
  let dateObject = new Date(dateString);

  if (dateObject.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
