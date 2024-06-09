import {expect} from "chai";
import {ethers} from "hardhat";

/**
 * deploy HelloWorld & SampleForwarder contract method
 * @returns
 */
async function deployHelloWorld() {
  const [owner] = await ethers.getSigners();
  const SampleForwarder = await ethers.getContractFactory("SampleForwarder");
  const sampleForwarder = await SampleForwarder.deploy();
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const helloWorld = await HelloWorld.deploy(sampleForwarder.target);
  return {
    helloWorld,
    sampleForwarder,
    owner,
  };
}

describe("HelloWorld contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const {helloWorld} = await deployHelloWorld();

    const initialText = await helloWorld.text();
    expect(initialText).to.equal("");

    const newText = "Hello, Hardhat!";
    await helloWorld.setNewText(newText);

    const updatedText = await helloWorld.text();
    expect(updatedText).to.equal(newText);
  });

  it("Check SampleForwarder Address", async function () {
    const {helloWorld, sampleForwarder} = await deployHelloWorld();

    // get SampleForwarder address
    const sampleForwarderAddress = await helloWorld.trustedForwarder();
    // chek SampleForwarder address
    expect(sampleForwarderAddress).to.equal(sampleForwarder.target);
  });
});
