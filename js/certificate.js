//Dirección del contrato (en Ropsten) donde se almacenan los certificdos
var certificatesContract = "0x8cdaf0cd259887258bc13a92c0a6da92698644c0";

//Dirección del contrato (en Ropsten) con las funciones a ejecutar 
var logicContract = "0xf25186b5081ff5ce73482ad761db0eb0d25abfbf";

//ABI del contrato con la lógica
var abiArray = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "idCertificate",
				"type": "bytes32"
			}
		],
		"name": "getSender",
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
		"constant": false,
		"inputs": [
			{
				"name": "_priceInWei",
				"type": "uint256"
			}
		],
		"name": "changeCost",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "idCertificate",
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
				"name": "idCertificate",
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
		"constant": true,
		"inputs": [],
		"name": "getPriceWei",
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
				"name": "idCertificate",
				"type": "bytes32"
			}
		],
		"name": "getCertificate",
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
				"name": "_priceInWei",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
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
    validateCertificate(data, function(res) {
        console.log("Estos son los datos: " + JSON.stringify(res)); //Aquí no entra
    }); 
})

//***********************************************************************************/
// Función para validar que el certificado está en la blockchain
//***********************************************************************************/
function validateCertificate(key) {
    certification.isMyCertificate("0x" + key,
    function (error, response) {
        if (error) {
            alert("No se ha podido establecer conexión con el contrato");
        }       
        else if (response) {
            alert("El certificado es válido!");
            console.log("Esta es la clave de tu certificado: " + document.URL.split("?")[1]);
            //Desencriptamos la información y la guardamos en las variables del html
            var data = decryptData(document.URL.split("?")[1]);
            data = JSON.parse(data);
            document.getElementById("alumnName").innerHTML = data["alumnName"];
            document.getElementById("courseName").innerHTML = data["courseName"];
            document.getElementById("courseDate").innerHTML = data["courseDate"];
            document.getElementById("courseCertificated").innerHTML = data["courseCertificated"];
            var time = new Date().getTime();
            var date = new Date(time);
            document.getElementById("certificationDate").innerHTML = date;
            //****************************FALTA AÑADIR EL ENLACE A LA TRANSACCIÓN DE ROPSTEIN***************************/
            return data;
        } 
        else {
            //Debería redirigir al la página inicial
            alert("El certificado no es válido");
            return "El certificado no es válido";
        }
    });
}

function decryptData(data){
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
//Como máximo podemos coger 64 letras de informacion (estamos usando un bytes32 en nuestro smart contract)
//Menos probabilidad de equivalencia cuanto mayor sea el byte del smart contract
//********************************************************************************************************* */

const keyLength = 64;
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


function submitSearchForm(key) {
    certification.isMyCertificate("0x" + key,
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