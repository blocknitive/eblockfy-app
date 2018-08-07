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

const keyLength = 64;

$(document).ready(function () {
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/")); //EL contrato tiene que estar guardado en Ropsten
    CertificationContract = web3.eth.contract(abiArray);
    certification = CertificationContract.at(logicContract);
    var url = document.URL.split("?");
    var data = renderKey(url[1].slice(30));
    validateCertificate(data, function(res){
        console.log("Estos son los datos: " + JSON.stringify(res));
    }); 
})

function validateCertificate(key){
    console.log("key es: " + key);
    certification.isMyCertificate("0x0" + key,
    function (error, response) {
        console.log("Response es: " + response);
        if (error) {
            alert("No se ha podido establecer conexión con el contrato");
        }       
        if (response) {
            alert("El certificado es válido!");
            console.log("esta es la clave de tu certificado: " + document.URL.split("?")[1]);
            //document.getElementById("encryptedHex").innerHTML = document.URL.split("?")[1];
            var data = decryptData(document.URL.split("?")[1]);
            console.log("el dato desencriptado es: " + data);
            data = JSON.parse(data);
            document.getElementById("alumnName").innerHTML = data["alumnName"];
            document.getElementById("courseName").innerHTML = data["courseName"];
            document.getElementById("courseDate").innerHTML = data["courseDate"];
            document.getElementById("courseCertificated").innerHTML = data["courseCertificated"];
            var d = new Date();
            var n = d.getTime();
            document.getElementById("certificationDate").innerHTML = n;
            return data;
        } else {
            // Debería redirigir al la página inicial
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

//Como máximo podemos coger 64 letras de informacion (estamos usando un bytes32 en nuestro smart contract)
//Menos probabilidad de equivalencia cuanto mayor sea el byte del smart contract
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