const SoilCompliance = artifacts.require("SoilCompliance");

module.exports = function (deployer) {
  deployer.deploy(SoilCompliance);
};