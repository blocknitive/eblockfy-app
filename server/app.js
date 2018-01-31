var express = require('express')
var app = express()

const IPFS = require('ipfs');
const node = new IPFS();

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000, function () { console.log("Listen on http://localhost:3000")})

