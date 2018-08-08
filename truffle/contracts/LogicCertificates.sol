pragma solidity ^0.4.18;

import "github.com/jdiegosierra/eblockfy-app/truffle/contracts/UserCertificates.sol";

contract LogicCertificates {
    UserCertificates userCertificates;
    
    constructor(address _userCertificatesAddress) public {
        userCertificates = UserCertificates(_userCertificatesAddress);
    }
    
    function isMyCertificate(bytes32 _idCertificate) public view returns(address) {
        return userCertificates.getCertificate(_idCertificate);
    }
    
    function giveSender(bytes32 _idCertificate) public view returns(address) {
        return userCertificates.getSender(_idCertificate);
    }
    
    function regCertificate(bytes32 _idCertificate) public payable{
        userCertificates.addCertificate.value(msg.value)(_idCertificate);    
    }
}