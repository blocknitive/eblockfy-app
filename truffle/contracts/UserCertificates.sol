pragma solidity ^0.4.20;

//Este contrato hace de almacenamiento de certificados
contract UserCertificates {
    
    //bytes32 acepta 64 digitos en hexadecimal
    mapping (bytes32 => address) certificates;
    
    address owner;
    
    uint private priceInWei;
    
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

    function getCertificate(bytes32 idCertificate) public view returns (address) {
        return certificates[idCertificate];
    }

    function getSender(bytes32 idCertificate) public view returns (address) {
        return certificates[idCertificate];
    }

    function deleteCertificate(bytes32 idCertificate)public {
        if(certificates[idCertificate] != address(0x0)){ 
            revert();
        }
        certificates[idCertificate] = address(0x0);
    }

    function getPriceWei() public view returns (uint) {
        return priceInWei;
    }
}


