// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { BigNumber, Signer } from "ethers";
import { solidityKeccak256 } from "ethers/lib/utils";
import { ethers, network } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
    //   const Greeter = await ethers.getContractFactory("Greeter");
    //   const greeter = await Greeter.deploy("Hello, Hardhat!");

    //   await greeter.deployed();

    //   console.log("Greeter deployed to:", greeter.address);

    //view address balance

    //owners EOA Contract
    const addr = "0xf53b2965d13404e5d13Ce40c7448F8E13F04034B" 
    //get Contract account with Interface name and Contract address
    const demoInt =await ethers.getContractAt(
        "Idemo",
        "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E"
    )
    //balance of owner EOA 
    const balance = await(await demoInt).balanceOf(addr)
    console.log(balance);

    //Account impersonation method
    //@ts-ignore
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addr],
      });

    //get signer from owner EOA address
    const signer: Signer = await ethers.getSigner(addr);
    // const status = await demoInt.connect(signer).transfer(
    //     "0xcd3b766ccdd6ae721141f452c550ca635964ce71",
    //     "10"
    // )
    // console.log(status);

    //get storage value

    //concatenate mapping key and contract slot 
    const byteValue = await new ethers.utils.AbiCoder().encode(["address", "uint"],[addr,2]);

    //hash concatenated value to bytes
    const hashValue = await ethers.utils.solidityKeccak256(["bytes"],[byteValue]);

    //convert bytes to decimal 
    const toDec = await BigNumber.from(hashValue);

    //decimal decimal value of mapping slot position
    const getStorage = await ethers.provider.getStorageAt(demoInt.address,toDec);
    console.log(getStorage);
    
    // set storage value
    //setStorage method takes 3 arguments, Contract address, hashValue of storage slot in bytes, and value to be set
    await network.provider.send("hardhat_setStorageAt", [
      demoInt.address,
      hashValue,
      "0x00000000000000000000000000000000000000000000000000000000000f4240",
    ]);

    const showBal = await demoInt.balanceOf(addr);
    console.log(`Balance after transaction is ${showBal}`);
    

    

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
