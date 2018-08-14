pragma solidity ^0.4.20;

import "./UserCertificates.sol";

contract LogicCertificate {
    
    address private owner;
    uint private priceInWei;
    UserCertificates userCertificates;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Sender not authorized.");
        _;
    }
    
    constructor(address _userCertificatesAddress, uint  _priceInWei) public {
        owner = msg.sender;
        userCertificates = UserCertificates(_userCertificatesAddress);
        priceInWei = _priceInWei;
    }
    
    function setOwner(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }
    
    function getOwner() public view returns(address) {
        return owner;
    }
    
    function setPrice(uint _priceInWei) public onlyOwner {
        priceInWei = _priceInWei;
    }
    
    function getPriceInWei() public view returns (uint) {
        return priceInWei;
    }
    
    function addCertificate(bytes32 _idCertificate) public payable {
        require(msg.value == priceInWei, "This action requires a correct value");
        userCertificates.getOwner().transfer(msg.value);
        userCertificates.addCertificate(_idCertificate, msg.sender);
    }
    
    function getCertificateSender(bytes32 _idCertificate) public view returns(address) {
        return userCertificates.getCertificateSender(_idCertificate);
    }
    
    function isMyCertificate(bytes32 _idCertificate) public view returns(bool) {
        return (userCertificates.getCertificateSender(_idCertificate) != address(0x0));
    }
    
    function deleteCertificate(bytes32 _idCertificate) public { //Debería haber seguridad para eliminar el certificado?
        userCertificates.addCertificate(_idCertificate, address(0x0));
    }
}
