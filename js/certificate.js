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
//Se ejecuta al acceder a certificates.html
//Ejemplo: certificates.html?a4516018d6b0313a03a69130356f23a168c0ab10
//***********************************************************************************/

$(document).ready(function() {
    //Conectamos con el nodo de Ropsten para obtener información (no hace falta wallet)
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/"));
    CertificationContract = web3.eth.contract(abiArray);
    certification = CertificationContract.at(logicContract);
    //Cortamos la URL para obtener la clave
    var url = document.URL.split("?");
	var data = renderKey(url[1].slice(30));
	var base_url = window.location.origin;
    validateCertificate(data, function(res) {
        console.log("Estos son los datos: " + JSON.stringify(res)); //Aquí no entra
    }); 
})





//***********************************************************************************/
// Función para validar que el certificado está en la blockchain.
//***********************************************************************************/

function validateCertificate(key, cb) {
    certification.getCertificateSender("0x" + key,
    function (error, response) {
        if (error) {
            cb("No se ha podido establecer conexión con el contrato");
        }       
        else if (response != 0x0000000000000000000000000000000000000000) {
			// Get the modal
			var modal = document.getElementById('myModalVerified');
			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];
			modal.style.display = "block";
			// When the user clicks on <span> (x), close the modal
			span.onclick = function() {
				modal.style.display = "none";
			}	
			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
				if (event.target == modal) {
					modal.style.display = "none"; 
				}
			}
			document.getElementById('server').innerHTML = window.location.origin;
            //Desencriptamos la información y la guardamos en las variables del html
            var data = decryptData(document.URL.split("?")[1]);
            data = JSON.parse(data);
            document.getElementById("alumnName").innerHTML = data["alumnName"];
            document.getElementById("courseName").innerHTML = data["courseName"];
            document.getElementById("courseDate").innerHTML = data["courseDate"];
            document.getElementById("courseCertificated").innerHTML = data["courseCertificated"];
			var certificado = document.getElementById('certificado');
			certificado.style.display = "block";
			cb(data);
        } 
        else {
            // Get the modal
			var modal = document.getElementById('myModalNotVerified');
			// Get the <span> element that closes the modal
			var span = document.getElementsByClassName("close")[0];
			modal.style.display = "block";
			// When the user clicks on <span> (x), close the modal
			span.onclick = function() {
				modal.style.display = "none";
				window.location.href = window.location.origin + "/index.html";
			}	
			// When the user clicks anywhere outside of the modal, close it
			window.onclick = function(event) {
				if (event.target == modal) {
					modal.style.display = "none";
					window.location.href = window.location.origin + "/index.html";
				}
			}
            cb("El certificado no es válido");
        }
    });
}





//***********************************************************************************/
// Función para desencriptar la información.
//***********************************************************************************/

function decryptData(data) {
    // When ready to decrypt the hex string, convert it back to bytes
    var encryptedBytes = aesjs.utils.hex.toBytes(data);
    // Clave de encriptación
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