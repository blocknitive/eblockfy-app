"use strict"
var express = require('express')
var app = express()

const IPFS = require('ipfs');
const node = new IPFS();
var bodyParser = require('body-parser');
var path = require('path');
var moment = require('moment');
var bs58 = require('bs58');

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
    var h = bs58.decode(ipfsResponse[0].path).toString('hex').replace(/^1220/, '');
    if (h.length != 64) {
      console.log('invalid ipfs format', ipfs_hash, h);
      return null;
    }
    res.send('0x' + h);
    //El hash es un base58 que pasamos a hexadecimal.
    //Nos cargamos los 4 primeros caracters que se corresponden a 0x12 para el tipo de hash y 0x20 a la longitud.
    //Estos valores para este tipo de ficheros en IPFS siempre son iguales.
  });
})

app.get('/certificated/:partialHashCertificated/:txId?', function (req, res) {
  //Añadimos los 4 caracteres que hemos quitado antes que siempre para este caso van a ser 1220 (explicado en el comentario donde se quitan)
  var buf = new Buffer(req.params.partialHashCertificated.replace(/^0x/, '1220'), 'hex')
  const address = bs58.encode(buf)

  node.files.cat(address, function (err, file) {
    if (err) {
      res.send('There is a no valid hash for get the Certificate', 500);
    }
    var data = JSON.parse(file.toString());
    data.txId = req.params.txId;
    res.render('certificate', data)
  })
});

app.get('/certificates/:alumnId', function (req, res) {
  let data = {};
  data.alumnId = req.params.alumnId;

  var Web3 = require("web3");

  var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/F2AHWokuuOyOwSLf7lfb"));
  console.log(web3.eth)

  var abiArray = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "dniUser",
          "type": "bytes32"
        },
        {
          "name": "certificateHash",
          "type": "bytes32"
        }
      ],
      "name": "addCertificate",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "dni",
          "type": "bytes32"
        }
      ],
      "name": "getCertifications",
      "outputs": [
        {
          "name": "",
          "type": "bytes32[]"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]

  var contractAddress = '0x01e38e411cd6af381b8851ef36c0103a7538a492';


  const contract = new web3.eth.Contract(abiArray, contractAddress);

  const transactionObject = {
    from: '0x3473Faf2bD7C9d52C5E146Cb6554b45D28BD2d89'
  };

  contract.methods.getCertifications(web3.utils.asciiToHex(data.alumnId)).call(transactionObject,
    function (error, response) {
      console.log(error, response)
      data.response = response;
      res.render('certificates', data)
    });

});



app.get('*', function (req, res) {
  res.send('what???', 404);
});

app.listen(3000, function () { console.log("Listen on http://localhost:3000") })

