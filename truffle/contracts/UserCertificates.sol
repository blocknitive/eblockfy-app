pragma solidity ^0.4.20;

//Almacenamiento de certificados
contract UserCertificates {
    
    mapping (bytes32 => address) certificates;
    address private owner;
    address private logicContract;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Sender not authorized.");
        _;
    }

    modifier onlyLogicContract() {
        require(msg.sender == logicContract, "Logic contract not authorized");
        _;
    }
    
    constructor() public {
        owner = msg.sender;
    }
    
    function setOwner(address _newOwner) public onlyOwner { // debería haber seguridad para modificar el owner?
        owner = _newOwner;
    }
    
    function getOwner() public view returns(address) {
        return owner;
    }
    
    function setLogicContract(address _logicContract) public onlyOwner {
        logicContract = _logicContract;
    }
    
    function getLogicContract() public view returns(address) {
        return logicContract;
    }
    
    function addCertificate(bytes32 _idCertificate, address _sender) public onlyLogicContract {
        certificates[_idCertificate] = _sender;
    }
    
    function getCertificateSender(bytes32 _idCertificate) public view onlyLogicContract returns(address) {
        return certificates[_idCertificate];
    }
}


