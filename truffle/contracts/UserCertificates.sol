pragma solidity ^0.4.20;

//Este contrato hace de almacenamiento de certificados
//Hay que añadir una funcion para ver el coste, y que el owner sea el creador.
//Falta añadir función borrar
contract UserCertificates {
    
    //bytes32 acepta 64 digitos en hexadecimal
    mapping (bytes32 => address) certificates;
    
    address owner;
    
    uint public priceInWei;
    
    constructor(uint _priceInWei) public {
        owner = msg.sender;
        priceInWei = _priceInWei;
    }

    function addCertificate(bytes32 idCertificate) public payable {
        if(msg.value != priceInWei){ 
            revert();
        }
        owner.transfer(msg.value);
        certificates[idCertificate] = msg.sender;
    }
    
    function changeCost(uint _priceInWei) public{
        require(owner == msg.sender);
        priceInWei = _priceInWei;
    }

    function getCertificate(bytes32 idCertificate) public view returns (bool) {
        if(certificates[idCertificate] != 0x0000000000000000000000000000000000000000)//modificar
            return true;
        return false;
    }

    function getSender(bytes32 idCertificate) public view returns (address) {
        return certificates[idCertificate];
    }
}


