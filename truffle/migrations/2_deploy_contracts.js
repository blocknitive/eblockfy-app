var UserCertificates = artifacts.require("./UserCertificates.sol");
var LogicCertificates = artifacts.require("./LogicCertificates.sol");

module.exports = function(deployer) {
  deployer.deploy(UserCertificates);
  deployer.deploy(LogicCertificates);
};
