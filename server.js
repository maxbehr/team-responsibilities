var express = require('express');
var app = express();

const fs = require('fs');
const toml = require('toml');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

app.get('/config', function(req, res) {
  const config = toml.parse(fs.readFileSync(__dirname + '/dist/config.toml', 'utf-8'));
  console.log(config);
  res.send(config);
});

app.use(express.static(__dirname + '/dist'));

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});