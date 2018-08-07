//Dirección del contrato (en Ropsten) donde se almacenan los certificdos.
var certificatesContract = "0x8cdaf0cd259887258bc13a92c0a6da92698644c0";

//Dirección del contrato (en Ropsten) con las funciones a ejecutar.
var logicContract = "0xf12b5dd4ead5f743c6baa640b0216200e89b60da";

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
		"name": "regCertificate",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
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
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
    console.log("La clave de tu certificado es: " + encrypted);
}





//***********************************************************************************/
// Se ejecuta cuando se quiere realizar la transacción
//***********************************************************************************/

function makeTransaction(key, encrypted) {
    certification.regCertificate("0x"+key,
        { gas: 10000000, value: 100000000000000000 }, //***********Hay que meter el precio del certificado*********** */
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