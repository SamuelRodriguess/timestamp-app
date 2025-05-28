const express = require('express');
const app = express();

// Endpoint GET que recebe parâmetro opcional "date"
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;

  if (!dateParam) {
    // Sem parâmetro, data atual
    date = new Date();
  } else {
    // Verifica se o parâmetro é um número (timestamp)
    if (/^\d+$/.test(dateParam)) {
      // Converte para número inteiro
      date = new Date(parseInt(dateParam));
    } else {
      // Tenta criar data a partir da string
      date = new Date(dateParam);
    }
  }

  // Verifica se a data é válida
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Retorna JSON com unix e utc
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Define porta e inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
