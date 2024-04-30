import {ethers, network} from "hardhat";
import {writeContractAddress} from "../helper/contractsJsonHelper";

/**
 * deploy MockVerifier contract script
 */
async function main() {
  console.log(
    ` ============================================== [start] ================================================ `
  );

  // SampleForwarder deploy
  const SampleForwarder = await ethers.getContractFactory("SampleForwarder");
  const sampleForwarder = await SampleForwarder.deploy();
  console.log(` SampleForwarder deployed to ${sampleForwarder.target}`);

  // HelloWorld deploy
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const helloWorld = await HelloWorld.deploy(sampleForwarder.target);
  console.log(` HelloWorld deployed to ${helloWorld.target}`);

  // write Contract Address
  writeContractAddress({
    group: "contracts",
    name: "SampleForwarder",
    value: sampleForwarder.target as any,
    network: network.name,
  });

  writeContractAddress({
    group: "contracts",
    name: "HelloWorld",
    value: helloWorld.target as any,
    network: network.name,
  });

  console.log(
    ` =============================================== [end]  =============================================== `
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
