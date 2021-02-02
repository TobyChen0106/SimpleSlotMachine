const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, '../build')));

const bodyParser = require('body-parser')
const apiRoute = require('./api');
app.use('/api', apiRoute);
app.use(bodyParser.json());

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port);
console.log(`Server Ready on port ${port}!!`)