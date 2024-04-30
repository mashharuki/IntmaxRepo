import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";

task("verify", "verify contract").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    console.log(
      ` ============================================== [start] ================================================ `
    );

    // get Contract Address
    const {
      contracts: {SampleForwarder, HelloWorld},
    } = loadDeployedContractAddresses(hre.network.name);

    await hre.run(`verify:verify`, {
      contract: "contracts/SampleForwarder.sol:SampleForwarder",
      address: SampleForwarder,
      constructorArguments: [],
    });

    await hre.run(`verify:verify`, {
      contract: "contracts/HelloWorld.sol:HelloWorld",
      address: HelloWorld,
      constructorArguments: [SampleForwarder],
    });

    console.log(
      ` =============================================== [end]  =============================================== `
    );
  }
);
