pragma solidity ^0.4.16;

contract UserCertificates {
	address private owner;
	mapping (string => address) public certificates;

	function addCertificate(string ipfsHash) public payable {
		certificates[ipfsHash] = msg.sender;
	}
}