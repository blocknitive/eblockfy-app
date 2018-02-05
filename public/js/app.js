var abiArray = [
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "certificates",
        "outputs": [
            {
                "name": "",
                "type": "string"
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
                "name": "ipfsHash",
                "type": "string"
            }
        ],
        "name": "addCertificate",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    }
]
var contractAddress = '0x5133015b67a664cc526b59c8b6b735a10e16cedd'

$(document).ready(function () {

    if (typeof web3 === "undefined" || !web3.currentProvider.isMetaMask) {
        $('#login-disabled-text').append('No se ha detectado la extensión MetaMask activa. Por favor instala la extensión <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">aquí</a> y refresca la página.')
        $('#login-disabled-text').show();
        $('#login-button').attr('disabled', 'disabled');
    }

    if (web3.eth.coinbase == null) {
        $('#login-disabled-text').append('No se ha detectado una cuenta registrada en la extensión MetaMask. Por favor entra o crea una cuenta en MetaMask sobre la red en la que desees realizar las operaciones y refresca la página.')
        $('#login-disabled-text').show();
        $('#login-button').attr('disabled', 'disabled');
    }

    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $("#login-panel").hide();
        $("#main-panel").show();
    });

    $('#form-certification').on('submit', function (e) {
        e.preventDefault()

        var unindexed_array = $(this).serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function (n, i) {
            indexed_array[n['name']] = n['value'];
        });
        makeCertification(indexed_array);
    });
})

var txId = "";
var ipfsHash = "";

function makeCertification(formDataJson) {
    var callback = function (response) {
        ipfsHash = response[0].hash;
        makeTransaction(response[0].hash)
    }
    sendFileToIPFS(formDataJson, callback);
}

function sendFileToIPFS(data, callback) {
    $.post({
        url: '/uploadJson',
        data: { json: JSON.stringify(data) },
        success: function (response) {
            callback(response);
        }
    });
}

function makeTransaction(fileHash) {
    web3.eth.contract(abiArray).at(contractAddress).addCertificate(fileHash,
        function (error, hash) {
            if (error) { alert("No se ha podido realizar la transacción contra la blockchain") }
            txId = hash;

            $("#certificate-link-container").show();
            $("#certificate-link").attr("href", "/certificated/" + ipfsHash + "/" + txId)
        });
}