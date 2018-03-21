pragma solidity ^0.4.16;

contract UserCertificates {
	address private owner;

	struct Person {
		address direction;
	}

	mapping (string => Person) certificates;

	function addCertificate(string ipfsHash) public payable {
		certificates[ipfsHash] = Person({direction:msg.sender});
	}

	function getCertificate(string certificate) constant returns (address) {
		return certificates[certificate].direction;
	}
}