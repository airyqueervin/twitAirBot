const express = require('express');
const app = express();
const port = process.env.port || 8300;

app.get('/*', (req, res) => {
  res.send('Hello World');
});

const server = app.listen(port, () => {
  console.log('TwitAirBot is listening on port' + port);
});