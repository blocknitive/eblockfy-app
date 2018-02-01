$(document).ready( function (){
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $("#login-panel").hide();
        $("#main-panel").show();
    });
    
    $('#form-certification').on('submit', function (e) {
        e.preventDefault()

        var unindexed_array = $(this).serializeArray();
        var indexed_array = {};
    
        $.map(unindexed_array, function(n, i){
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
    web3.eth.sendTransaction({
        from: web3.eth.defaultAccount,
        to: '0x6fa9079dae203da0a891fd0fb197e306f2260679',
        value: '0',
        data: web3.toHex(fileHash),
        gas: '210000'
    }, function (error, hash) {
        if (error) { alert("No se ha podido realizar la transacción contra la blockchain")}
        txId = hash;

        $("#certificate-link-container").show();
        $("#certificate-link").attr("href", "/certificated/"+ ipfsHash + "/" + txId)
    });
}