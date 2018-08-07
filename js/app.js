
//Dirección donde se almacenan los contratos
var certificatesContract = "0x8cdaf0cd259887258bc13a92c0a6da92698644c0";

//ABI del contrato
var abiArray = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_idCertificate",
				"type": "bytes32"
			}
		],
		"name": "regCertificate",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_userCertificatesAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_idCertificate",
				"type": "bytes32"
			}
		],
		"name": "giveSender",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_idCertificate",
				"type": "bytes32"
			}
		],
		"name": "isMyCertificate",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

//Address del contracto en la blockchain
var logicContract = '0xf25186b5081ff5ce73482ad761db0eb0d25abfbf'

// Longitud del ID del certificado que se registrará en Ethereum
const keyLength = 64;

// Funciones a ejecutar cuando se carue el documento
$(document).ready(function () {
    // if (typeof web3 === "undefined" || !web3.currentProvider.isMetaMask) {
    //     $('#login-disabled-text').append('NNNNNo se ha detectado la extensión MetaMask activa. Por favor instala la extensión <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">aquí</a> y refresca la página.')
    //     $('#login-disabled-text').show();
    //     $('#login-button').attr('disabled', 'disabled');
    // }

    // if (web3.eth.coinbase == null) {
    //      $('#login-disabled-text').append('No se ha detectado una cuenta registrada en la extensión MetaMask. Por favor entra o crea una cuenta en MetaMask sobre la red en la que desees realizar las operaciones y refresca la página.')
    //      $('#login-disabled-text').show();
    //      $('#login-button').attr('disabled', 'disabled');
    // }

     $('#form-login').on('submit', function (e) {
         e.preventDefault();
         $("#login-panel").hide();
         $("#tabs").tabs();
         $("#main-panel").show();
     });

    $('#form-certification').on('submit', function (e) {
        if (typeof web3 === "undefined" || !web3.currentProvider.isMetaMask) {
            alert('No se ha detectado la extensión MetaMask activa. Por favor instala la extensión <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">aquí</a> y refresca la página.');
        }
        else if(web3.eth.coinbase == null){
            alert('No se ha detectado una cuenta registrada en la extensión MetaMask. Por favor entra o crea una cuenta en MetaMask sobre la red en la que desees realizar las operaciones y refresca la página.');
        }
        else{
            e.preventDefault()

            var unindexed_array = $(this).serializeArray();
            var indexed_array = {};

            $.map(unindexed_array, function (n, i) {
                indexed_array[n['name']] = n['value'];
            });
            makeCertification(indexed_array);
        }
    });

    $('#search-input').on('keyup', function (event) {
        if (event.keyCode === 13) {
            submitSearchForm();
        }
    });

    $('#search-button').on('click', function (event) {
        submitSearchForm();
    })


    // Generating instances from our Smart Contract for listen events and call methods.
    CertificationContract = web3.eth.contract(abiArray);
    certification = CertificationContract.at(logicContract);

    if (typeof certificationList !== 'undefined') {
        submitSearchForm();
    }
})

function setSubmitingStatus() {
    $("#spinner").show();
    $("#submit-certificate").prop( "disabled", true );
}

function setInitialStatus() {
    $("#spinner").hide();
    $("#submit-certificate").prop( "disabled", false );
}


// Funcion que registra el certificado
function makeCertification(formDataJson) {
    setSubmitingStatus();
    var callback = function (response) {
        encrypted = response;//Borrar
    }
    // Encriptamos los datos del certificado
    encrypted = encryptData(formDataJson, callback);
    // Las 30 primeras letras del AES (8c7ff6b8d251ca98d81a9915903b12) coiniciden siempre con lo que no cogeremos esos datos.
    key = renderKey(encrypted.slice(30));
    // Creamos la transaccion 
    makeTransaction(key, encrypted, callback);
    console.log("El id del certificado es: " + key);
    console.log("La clave de tu certificado es: " + encrypted);
}

function makeTransaction(key, encrypted) {
    // Le añadimos el 0 delante porque Remix lo hace automaticamente cuando le metemos un churro de 64 caracteres
    // (no sé por qué) y así podemos testearlo.
    certification.regCertificate("0x0"+key,
        { gas: 10000000, value: 100000000000000000 },
        function (error, txId) {
            if (error) { alert("No se ha podido realizar la transacción contra la blockchain") }
            waitForReceipt(txId, function () {
                console.log("Transactikeyon succeeded.");
                $("#certificate-link-container").show();
                $("#certificate-link").attr("href", "/certificate.html?" + encrypted);
                setInitialStatus()
            });
        });
}

function waitForReceipt(hash, cb) {
    web3.eth.getTransactionReceipt(hash, function (err, receipt) {
        if (err) {
            alert("No se ha podido realizar la transacción contra la blockchain")
            console.log(err);
        }
        if (receipt !== null) {
            // Transaction went through
            if (cb) {
                cb(receipt);
            }
        } else {
            // Try again in 1 second
            window.setTimeout(function () {
                waitForReceipt(hash, cb);
            }, 1000);
        }
    });
}

// Funcion para encriptar con AES
function encryptData(data){
    data = JSON.stringify(data);
    // Se puede generar la key con https://www.npmjs.com/package/scrypt-js
    // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
    var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
    // Convert text to bytes
    var textBytes = aesjs.utils.utf8.toBytes(data);
    // The counter is optional, and if omitted will begin at 1
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
  }

  // Funcion para desencriptar con AES
function decryptData(data){
    // When ready to decrypt the hex string, convert it back to bytes
    var encryptedBytes = aesjs.utils.hex.toBytes(data);
    // The key
    var key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
    // The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
    // "Text may be any length you wish, no padding is required."
}

// Como máximo podemos coger 64 letras de informacion (estamos usando el type bytes32 en nuestro smart contract)
// Algoritmo para crear el ID del certificado (es bastante mejorable, por ejemplo, generando un ID del nombre de 
// usuario y otro ID del nombre del curso y unirlos sería más eficaz)
function renderKey(encrypted) {
    var key = "";
    var jump = Math.floor(encrypted.length / keyLength);
    var selected;

    for (counter = 1; counter < keyLength;counter++){
        selected = jump*counter;
        key = key.concat(encrypted.slice(selected, selected+1));
    }
    return key;
}

function submitSearchForm() {
    let searchParam;
    searchParam = $('#search-input').val();
    drecrypted = decryptData(searchParam);
    $('#certificates-result > tbody').empty();
    key = renderKey(searchParam);
    certification.isMyCertificate(key,
        function (error, response) {
            if (error) {
                $('#certificates-result > tbody').append(`
                <tr>
                <th>No se ha podido establecer conexión con el contrato</th>
                </tr>
                `);
            }
            $("#search-result").show();
            decrypted = decryptData(searchParam); 
            if (response) {
                $('#certificates-result > tbody').append(`
                    <tr>
                    <th>
                        <div><h4>${decrypted}</h4>
                        </div>
                    </th>
                    </tr>
                    `)
                $('#certificates-result').show();
            } else {

                $('#certificates-result > tbody').append(`
                        <tr>
                        <th>No se han encontrado resultado para esa clave de certificado</th>
                        </tr>
                        `);
                $('#certificates-result').show();
            }
        });
}