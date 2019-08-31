require('dotenv').config();

const express = require('express');
const PORT = process.env.PORT || 5000;

let server = express();

server.get('/hola', async (req, res) => {
  res.send('hey there');
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
