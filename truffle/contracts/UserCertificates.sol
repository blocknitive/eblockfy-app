pragma solidity ^0.4.4;

contract UserCertificates {

	address private owner;
	mapping (address => string) private certificates;

	//Adds a certificate (sender + hash) to a user
	function addCertificate(string ipfsHash) public	payable {
		certificates[msg.sender] = ipfsHash;
	}
}