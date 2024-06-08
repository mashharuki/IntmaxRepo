import {expect} from "chai";
import {ethers} from "hardhat";

/**
 * deploy HelloWorld contract method
 * @returns
 */
async function deployHelloWorld() {
  const [owner] = await ethers.getSigners();
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const helloWorld = await HelloWorld.deploy(owner.address);
  return helloWorld;
}

describe("HelloWorld contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const helloWorld = await deployHelloWorld();

    const initialText = await helloWorld.text();
    expect(initialText).to.equal("");

    const newText = "Hello, Hardhat!";
    await helloWorld.setNewText(newText);

    const updatedText = await helloWorld.text();
    expect(updatedText).to.equal(newText);
  });
});
