pragma solidity ^0.4.20;

import "./UserCertificates.sol";

contract LogicCertificates {
    UserCertificates userCertificates;
    
    constructor(address _userCertificatesAddress) public {
        userCertificates = UserCertificates(_userCertificatesAddress);
    }
    
    function isMyCertificate(bytes32 _idCertificate) public view returns(bool) {
        return userCertificates.getCertificate(_idCertificate);
    }
    
    function giveSender(bytes32 _idCertificate) public view returns(address) {
        return userCertificates.getSender(_idCertificate);
    }
    
    function regCertificate(bytes32 _idCertificate) public payable{
        userCertificates.addCertificate.value(msg.value)(_idCertificate);
        
    }
}