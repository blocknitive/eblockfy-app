pragma solidity ^0.4.19;

contract UserCertificates {
	address private owner;

	mapping (bytes32 => bytes32[]) certificates;

	function addCertificate(bytes32 dniUser, bytes32 certificateHash) public {
		certificates[dniUser].push(certificateHash);
	}

	function getCertifications(bytes32 dni) public constant returns (bytes32[]) {
		return certificates[dni];
	}
}