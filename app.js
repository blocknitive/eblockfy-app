"use strict"
var express = require('express')
var app = express()

const IPFS = require('ipfs');
const node = new IPFS();
var bodyParser = require('body-parser');
var path = require('path');
var moment = require('moment');;

// support json encoded bodies
app.use(bodyParser.json()); 

// support encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 

// static files
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

node.on('ready', () => {
  console.log("IPFS Node is READY");
})

app.get('/', function (req, res) {
  res.render('index');
})

app.post('/uploadJson', function (req, res) {
  var data = JSON.parse(req.body.json);
  data.certificationDate = moment(new Date()).format("DD/MM/YYYY").toString();
  node.files.add([new Buffer(JSON.stringify(data))], (err, ipfsResponse) => {
    res.send(ipfsResponse)
  });
})

app.get('/certificated/:hashCertificated/:txId?', function (req, res) {
  
  node.files.cat(req.params.hashCertificated, function (err, file) {
    if (err) {
      res.send('There is a no valid hash for get the Certificate', 500);
    }
    var data = JSON.parse(file.toString());
    data.txId = req.params.txId;
    res.render('certificate', data)
  })
});

app.get('*', function(req, res){
  res.send('what???', 404);
});

app.listen(3000, function () { console.log("Listen on http://localhost:3000")})

