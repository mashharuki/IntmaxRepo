import {task} from "hardhat/config";
import {HardhatRuntimeEnvironment} from "hardhat/types";
import {loadDeployedContractAddresses} from "../helper/contractsJsonHelper";

task("getText", "get current text").setAction(
  async (taskArgs: any, hre: HardhatRuntimeEnvironment) => {
    console.log(
      ` ============================================== [start] ================================================ `
    );

    // get Contract Address
    const {
      contracts: {HelloWorld},
    } = loadDeployedContractAddresses(hre.network.name);

    // HelloWorldコントラクトをインスタンス化する。
    const helloWorld = await hre.ethers.getContractAt("HelloWorld", HelloWorld);

    // getText
    const text = await helloWorld.getText();

    console.log("text:", text);

    console.log(
      ` =============================================== [end]  =============================================== `
    );
  }
);
