const { BigNumber, utils } = require("ethers");
const hardhat = require("hardhat");
async function main() {
  const OKToken = await hardhat.ethers.getContractFactory("OKToken");
  const oktoken = await OKToken.deploy();
  await oktoken.deployed();
  console.log("[📥] OKToken deployed to address: " + oktoken.address);
  const OKVendor = await hardhat.ethers.getContractFactory("OKVendor");
  const okvendor = await OKVendor.deploy(oktoken.address);
  console.log("[📥] OKVendor deployed to address: " + okvendor.address);
  await oktoken.deployed();
  // Transfer oktokens to vendor
  await oktoken.functions.transfer(okvendor.address, utils.parseEther("10000"));
  console.log("[🚀] Tokens transferred to OKVendor");
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});


// Compiled 7 Solidity files successfully
// [📥] OKToken deployed to address: 0x5E243De1A068E8C0F368E62B965319345599Faea
// [📥] OKVendor deployed to address: 0x956Ea303fb3EA898C779151218751A152A65FB2b
// [🚀] Tokens transferred to OKVendor