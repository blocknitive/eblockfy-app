//Dirección del contrato (en Ropsten) donde se almacenan los certificdos.
var certificatesContract = "0x1d736755a085aa087660e7769b87d2a0929555f1";

//Dirección del contrato (en Ropsten) con las funciones a ejecutar.
var logicContract = "0xf89a94d1020519996f11f38062f39ded3e2feb8c";

//ABI del contrato con la lógica.
var abiArray = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_idCertificate",
				"type": "bytes32"
			}
		],
		"name": "addCertificate",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_idCertificate",
				"type": "bytes32"
			}
		],
		"name": "deleteCertificate",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newOwner",
				"type": "address"
			}
		],
		"name": "setOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_priceInWei",
				"type": "uint256"
			}
		],
		"name": "setPrice",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_userCertificatesAddress",
				"type": "address"
			},
			{
				"name": "_priceInWei",
				"type": "uint256"
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
		"name": "getCertificateSender",
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
		"inputs": [],
		"name": "getOwner",
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
		"inputs": [],
		"name": "getPriceInWei",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
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





//***********************************************************************************/
//Se ejecuta al acceder a la aplicación.
//***********************************************************************************/

$(document).ready(function () {
     $('#form-login').on('submit', function (response) {
         response.preventDefault();
         $("#login-panel").hide();
         $("#tabs").tabs();
         $("#main-panel").show();
     });

    $('#form-certification').on('submit', function (response) {
        if (typeof web3 === "undefined" || !web3.currentProvider.isMetaMask) {
            alert('No se ha detectado la extensión MetaMask activa. Por favor instala la extensión <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">aquí</a> y refresca la página.');
        }
        else if(web3.eth.coinbase == null){
            alert('No se ha detectado una cuenta registrada en la extensión MetaMask. Por favor entra o crea una cuenta en MetaMask sobre la red en la que desees realizar las operaciones y refresca la página.');
        }
        else{
            response.preventDefault()
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





//***********************************************************************************/
// Función que crea el certificado
//***********************************************************************************/

// Funcion que registra el certificado
function makeCertification(formDataJson) {
    setSubmitingStatus();
    // Encriptamos los datos del certificado
    encrypted = encryptData(formDataJson);
    // Las 30 primeras letras del AES (8c7ff6b8d251ca98d81a9915903b12) coiniciden por la info del JSON con lo que no cogeremos esos datos.
    key = renderKey(encrypted.slice(30));
    // Creamos la transaccion 
    makeTransaction(key, encrypted);
}





//***********************************************************************************/
// Se ejecuta cuando se quiere realizar la transacción
//***********************************************************************************/

function makeTransaction(key, encrypted) {
    certification.getPriceInWei(
        function(error, response) {
            certification.addCertificate("0x"+key,
            { gas: 3000000, value: response },
            function (error, txId) {
                if (error) { alert("No se ha podido realizar la transacción contra la blockchain") }
                else {
                    waitForReceipt(txId, function () {
                        window.location.href = "mailto:destinatario@correo.com?subject=Certificado&body=La clave de tu certificado es la siguiente: " + encrypted + " No pierdas la clave o perderás el certificado!%0D%0APuedes verificar tu certificado aquí: " + "http://localhost:80" + "/certificate.html?" + encrypted;
                        $("#certificate-link-container").show();
                        $("#certificate-link").attr("href", "/certificate.html?" + encrypted);
                        setInitialStatus()
                    });
                }
            });
        });
}





//***********************************************************************************/
// ????????????????????????????
//***********************************************************************************/

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





//***********************************************************************************/
// Función para encriptar la información del certificado.
//***********************************************************************************/

function encryptData(data) {
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





//***********************************************************************************/
// Función para desencriptar la información del certificado.
//***********************************************************************************/

function decryptData(data) {
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





//********************************************************************************************************* */
//Función para obtener la clave del certificado.
//Como máximo podemos coger 64 letras de informacion (estamos usando el tipo bytes32 en nuestro smart contract)
//Menos probabilidad de coincidencia con otro ctificado cuanto mayor sea el byte del smart contract.
//********************************************************************************************************* */

// Longitud del ID del certificado que se registrará en Ethereum
const keyLength = 64;

function renderKey(encrypted) {
    var key = "";
    var jump = Math.floor(encrypted.length / keyLength);
    var selected;

    for (counter = 1; counter < keyLength;counter++) {
        selected = jump*counter;
        key = key.concat(encrypted.slice(selected, selected+1));
    }
    return key;
}





//***********************************************************************************/
// Esta función se ejecuta cuando se solicita una búsqueda
//***********************************************************************************/

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