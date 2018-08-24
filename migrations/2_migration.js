var UserCertificates = artifacts.require("./UserCertificates.sol");
//var LogicCertificate = artifacts.require("./LogicCertificate.sol");

module.exports = function(deployer) {

  deployer.deploy(UserCertificates);
  //deployer.deploy(LogicCertificate);
};
