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

var contractAddress = '0x01e38e411cd6af381b8851ef36c0103a7538a492'

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
        $("#tabs").tabs();
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

    $('#search-input').on('keyup', function (event) {
        if (event.keyCode === 13) {
            submitSearchForm();
        }
    });

    $('#search-button').on('click', function (event) {
        submitSearchForm();
    })

    //Generating instances from our Smart Contract for listen events and call methods.
    CertificationContract = web3.eth.contract(abiArray);
    certification = CertificationContract.at(contractAddress);
})

var txId = "";
var ipfsHash = "";

function makeCertification(formDataJson) {
    var dniUser = $("#alumnId").val();
    var callback = function (response) {
        ipfsHash = response;
        makeTransaction(dniUser, ipfsHash)
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

function makeTransaction(dniUser, fileHash) {
    console.log(fileHash)
    certification.addCertificate(dniUser, fileHash,
        { gas: 1000000 },
        function (error, txId) {
            if (error) { alert("No se ha podido realizar la transacción contra la blockchain") }

            waitForReceipt(txId, function () {
                console.log("Transaction succeeded.");
                $("#certificate-link-container").show();
                $("#certificate-link").attr("href", "/certificated/" + fileHash + "/" + txId)
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

function submitSearchForm() {
    let searchParam = $('#search-input').val();
    $('#certificates-result > tbody').empty();
    certification.getCertifications(searchParam,
        function (error, response) {
            if (error) {
                $('#certificates-result > tbody').append(`
                <tr>
                <th>No se ha podido establecer conexión con el contrato</th>
                </tr>
                `);
            }
            $("#search-result").show();
            if (response.length > 0) {
                let cont = 0
                response.forEach(element => {
                    cont++;
                    $('#certificates-result > tbody').append(`
                        <tr>
                        <th><a target="_blank" href="/certificated/${element}">Certificado ${cont}</a></th>
                        </tr>
                        `)
                    $('#certificates-result').show();
                });
            } else {
                $('#certificates-result > tbody').append(`
                        <tr>
                        <th>No se han encontrado resultado para ese DNI</th>
                        </tr>
                        `);
                $('#certificates-result').show();
            }
        });

}