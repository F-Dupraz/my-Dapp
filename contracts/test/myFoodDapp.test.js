const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyFoodDapp", () => {
  it("Should add a new food", async () => {
    const [ owner, addr1 ] = await ethers.getSigners();
    const MyFood = await ethers.getContractFactory("MyFoodDapp");
    const my_food = await MyFood.deploy();
    await my_food.deployed();

    var new_food = await my_food.addFood(
      "https://eatyourworld.com/images/content_images/images/gallo-pinto.jpg",
      "Gallo Pinto",
      "Costa Rica"
    );
    await new_food.wait();

    var new_food2 = await my_food
    .connect(addr1)
    .addFood(
      "https://eatyourworld.com/images/content_images/images/gallo-pinto.jpg",
      "Gallo Pintoa",
      "Costa Rica"
    );
    await new_food2.wait();

    const all_foods = await my_food.getAllFoods();
    expect(all_foods.length).to.equal(2);
  });
});