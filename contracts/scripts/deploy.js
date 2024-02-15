const hre = require("hardhat");
const fs = require("fs");

async function main(){

  const MyFoodDapp = await hre.ethers.getContractFactory("MyFoodDapp");
  const my_food_dapp = await MyFoodDapp.deploy();

  await my_food_dapp.deployed();

  console.log("MyFoodDapp deployed to:", my_food_dapp.address)

  let config = `export const abiMyFoodAddress = "${my_food_dapp.address}"`;
  let data = JSON.stringify(config);
  fs.writeFileSync("../web/config.js", JSON.parse(data)); 

  fs.copyFile("./artifacts/contracts/myFoodDapp.sol/MyFoodDapp.json", "../web/utils/abi/MyFoodDapp.json", (err) => {
    if(err) {
      console.log("Error Ocurred: ", err);
    }
  });
}

main().then(()=>
  process.exit(0)
  ).catch((error)=>{
    console.error(error);
    process.exit(1);
  });