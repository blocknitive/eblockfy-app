pragma solidity ^0.4.16;

contract UserCertificates {
	address private owner;
	mapping (address => string) public certificates;

	function addCertificate(string ipfsHash) public payable {
		certificates[msg.sender] = ipfsHash;
	}
}